# Spec: Rate-Limiting für den Chat-Endpoint

**Issue:** [#6](https://github.com/ye-simsek/olymposlodge/issues/6)
**Status:** Entwurf
**Scope:** Backend-Härtung

## 1. Ziel
`POST /api/v1/chat` gegen Missbrauch absichern, sodass ein einzelner Client den
kostenpflichtigen Gemini-Endpoint nicht in einer Schleife auslösen kann. Das Limit
muss **konfigurierbar** sein und im Überschreitungsfall eine **saubere, zum
bestehenden Fehlerschema passende** `429`-Antwort liefern.

## 2. Ist-Zustand
- **Route:** `routes/api.php:6` — `Route::post('/chat', [ChatController::class, 'send'])`, ohne Middleware.
- **Bootstrap:** `bootstrap/app.php` registriert `api`-Routen via `withRouting(api: …)`.
  Es ist **kein** `RateLimiter::for(...)` definiert und **kein** `throttle:api` aktiv → derzeit **keinerlei** Drossel.
- **Fehlerschema:** `ChatController::send()` antwortet bei Fehlern mit
  `{ "error": string, "unavailable": bool }` (503 bei fehlendem Key, 502 bei Gemini-Fehler).
  API-Requests werden dank `shouldRenderJsonWhen(api/*)` als JSON gerendert.
- **Kosten pro Request:** bis zu 1024 Output-Tokens, `contents` bis zu 40 Nachrichten × 2000 Zeichen.
- **Tests:** kein Feature-Test für den Chat-Endpoint vorhanden.

## 3. Scope

**In Scope**
- Benannter Rate-Limiter `chat`, IP-basiert, Limit aus Config/ENV.
- `429`-Antwort im bestehenden `{ error, unavailable, retry_after }`-Schema.
- Feature-Test (unter Limit ok, über Limit `429`).
- ENV-Doku (`.env.example`) — überschneidet sich mit #4.

**Out of Scope**
- Auth/Token für den Endpoint (bewusst öffentlich; nur Drosselung).
- Frontend-Feinschliff im `ChatWidget` → nur als Folgehinweis (siehe §7).
- Globale API-Throttle-Strategie für künftige Endpoints (später).

## 4. Technischer Entwurf

### 4.1 Config + ENV
`config/services.php` erweitern:
```php
'gemini' => [
    'key'        => env('GEMINI_API_KEY'),
    'rate_limit' => (int) env('GEMINI_RATE_LIMIT', 20), // Requests/Minute/IP
],
```
`.env.example` ergänzen:
```env
GEMINI_API_KEY=
GEMINI_RATE_LIMIT=20
```

### 4.2 Benannter Limiter in `AppServiceProvider::boot()`
Bewusst ein **named limiter** statt inline `throttle:20,1` — wegen Konfigurierbarkeit
und einer eigenen 429-Response, die zum ChatController-Schema passt.

> **Imports:** `AppServiceProvider` importiert aktuell nur `Illuminate\Support\ServiceProvider`.
> Für den Closure-Typehint und die Facades müssen am Dateikopf **alle drei** ergänzt werden:
> ```php
> use Illuminate\Http\Request;
> use Illuminate\Cache\RateLimiting\Limit;
> use Illuminate\Support\Facades\RateLimiter;
> ```

```php
public function boot(): void
{
    RateLimiter::for('chat', function (Request $request) {
        return Limit::perMinute((int) config('services.gemini.rate_limit', 20))
            ->by($request->ip())
            ->response(fn (Request $request, array $headers) => response()->json([
                'error'       => 'Too many requests. Please wait a moment.',
                'unavailable' => false,
                'retry_after' => $headers['Retry-After'] ?? 60,
            ], 429, $headers));
    });
}
```

### 4.3 Route
`routes/api.php`:
```php
Route::post('/chat', [ChatController::class, 'send'])->middleware('throttle:chat');
```

### 4.4 ⚠️ Kritische Randbedingung: Trusted Proxies
In Produktion läuft die App hinter nginx. `TrustProxies` ist in `bootstrap/app.php`
**nicht** konfiguriert → `$request->ip()` liefert dann die Proxy-IP, nicht die des
Clients. Folge: **alle** Nutzer teilen sich einen Zähler und das Limit sperrt global.
Deshalb ist Teil dieser Spec, die Proxies explizit zu vertrauen:
```php
// bootstrap/app.php → withMiddleware(...)
$middleware->trustProxies(at: '10.0.0.0/8'); // konkrete Proxy-IP/CIDR des Servers
```

**Bevorzugtes Kriterium: konkrete Proxy-IP/CIDR.** `at: '*'` (allen Proxies vertrauen)
ist **kein** akzeptabler Default:
- Ist der App-Server **nur** über nginx erreichbar, ist `'*'` funktional in Ordnung —
  aber ausschließlich als bewusst dokumentierter Deployment-Fallback.
- Ist PHP/Laravel **direkt** (unter Umgehung von nginx) erreichbar, kann ein Client mit
  `'*'` per gefälschtem `X-Forwarded-For`-Header seine scheinbare IP beliebig rotieren
  und damit das IP-Limit **umgehen**. Dann ist `'*'` ein Sicherheitsloch.

Daher: die tatsächliche nginx/Load-Balancer-Adresse eintragen; `'*'` nur, wenn der
App-Server nachweislich nicht direkt erreichbar ist. Ohne korrekt gesetzte Trusted
Proxies ist das Feature in Prod fehlerhaft — nicht optional.

## 5. Verhalten & Fehlerschema

| Fall | Status | Body |
|---|---|---|
| unter Limit | 200 | `{ "text": … }` (unverändert) |
| Limit überschritten | 429 | `{ "error": …, "unavailable": false, "retry_after": <sek> }` + `Retry-After`, `X-RateLimit-*` Header |
| kein API-Key | 503 | `{ "error": …, "unavailable": true }` (unverändert) — *sofern nicht bereits rate-limited* |

> **Reihenfolge:** `throttle:chat` ist Route-Middleware und läuft **vor** dem Controller.
> Ein überlimitierter Request erhält daher `429` **auch dann**, wenn kein API-Key gesetzt
> ist — die `503`-Antwort greift nur, solange das Limit nicht überschritten ist.

`unavailable: false` signalisiert dem Frontend bewusst „temporär, erneut versuchbar"
(im Gegensatz zu `true` = Chat gar nicht verfügbar).

## 6. Tests (`tests/Feature/ChatRateLimitTest.php`)
- **Setup:** `config(['services.gemini.key' => 'test-key', 'services.gemini.rate_limit' => 3])`,
  `Http::fake([... => Http::response(<gültige Gemini-Struktur>)])`.
- **Cache-Isolation:** `phpunit.xml` setzt `CACHE_STORE=array`. Der Array-Store lebt nur für
  die jeweilige App-Instanz, die Laravel **pro Testmethode** neu aufbaut → die Zähler sind
  automatisch isoliert, ein manuelles `clear` ist **nicht** nötig.
  Wichtig: **nicht** `RateLimiter::clear($ip)` verwenden — der named limiter hasht den
  Cache-Key als `md5($limiterName.$limit->key)` (siehe `ThrottleRequests.php:134`), der Key
  ist also `md5('chat'.$ip)`, **nicht** `127.0.0.1`. Muss innerhalb einer Testmethode doch
  zurückgesetzt werden, dann exakt `RateLimiter::clear(md5('chat'.$ip))`.
- **`test_allows_requests_under_the_limit`:** 3 Requests → alle `200`.
- **`test_blocks_requests_over_the_limit`:** 4. Request → `429`, Body enthält `unavailable=false` und `retry_after`.
- **`test_limit_is_per_ip`:** zwei verschiedene `REMOTE_ADDR` teilen den Zähler nicht.
- **`test_rate_limit_is_configurable`:** Limit=1 → 2. Request `429`.

Damit wird auch der bislang völlig ungetestete Chat-Pfad grundlegend abgedeckt.

## 7. Folgehinweis Frontend (separat, nicht Teil von #6)
`ChatWidget.tsx` behandelt aktuell nur `unavailable`. Für die neue `429`-Antwort sollte
es eine kurze, lokalisierte „bitte einen Moment warten"-Meldung zeigen und den Retry nach
`retry_after` erlauben (statt generischem Fehler). → als eigenes kleines Frontend-Issue
oder Checkbox in #6 ergänzen.

## 8. Akzeptanzkriterien
- [ ] > N Requests/Minute derselben IP liefern `429` mit `Retry-After`.
- [ ] Limit über `GEMINI_RATE_LIMIT` steuerbar; Default 20.
- [ ] `429`-Body folgt dem `{ error, unavailable, retry_after }`-Schema.
- [ ] Unter dem Limit ist die Chat-Funktion unverändert.
- [ ] `trustProxies` ist auf die **konkrete** Proxy-IP/CIDR gesetzt (nicht `'*'`, außer als
      dokumentierter Fallback bei ausschließlich über nginx erreichbarem App-Server), sodass
      in Prod pro echter Client-IP gedrosselt wird und `X-Forwarded-For` nicht spoofbar ist.
- [ ] Feature-Test deckt Unter-/Über-Limit, IP-Trennung und Konfigurierbarkeit ab; Suite grün.

## 9. Umsetzungsschritte
1. `config/services.php` + `.env.example` erweitern.
2. `trustProxies` in `bootstrap/app.php` setzen.
3. Limiter `chat` in `AppServiceProvider::boot()` registrieren.
4. `throttle:chat` an die Route hängen.
5. `ChatRateLimitTest` schreiben, `php artisan test` grün.
6. `vendor/bin/pint` laufen lassen.

## 10. Offene Frage
- Konkrete Proxy-IP/CIDR des Prod-Servers für `trustProxies(at: …)` — `'*'` ist
  funktional, aber restriktiver ist sicherer. **Wer kennt die nginx/Load-Balancer-Adresse?**
