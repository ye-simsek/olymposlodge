# Olympos Lodge — Website

Offizielle Website des **Olympos Lodge Boutique-Hotels** in Çıralı, Antalya.  
Dreisprachig (Türkisch · Englisch · Deutsch), mit KI-Chatassistent, Kontaktformular, Newsletter und Filament-Adminbereich.

---

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Frontend | React 19, TypeScript 5.5, Vite 5, react-router-dom 7, i18next |
| Backend | Laravel 13, PHP 8.3 |
| Admin | Filament 3.3 |
| Datenbank | MySQL 8.4 (Produktion), SQLite (lokal möglich) |
| KI-Chat | Google Gemini 2.5 Flash (`/api/v1/chat`) |
| Dev-Umgebung | Laravel Sail (Docker) |

---

## Projektstruktur

```
Website/
├── backend/      # Laravel API + Filament Admin
├── frontend/     # React SPA (Vite)
└── README.md
```

---

## Lokale Installation

### Voraussetzungen

- **Docker Desktop** (für Laravel Sail)
- **Node.js** ≥ 20 + npm
- **PHP** 8.3 + **Composer** (nur wenn ohne Docker)

---

### 1. Repository klonen

```bash
git clone <repo-url> olympos-website
cd olympos-website
```

---

### 2. Backend (Laravel Sail)

```bash
cd backend

# Abhängigkeiten installieren (einmalig ohne Docker möglich)
composer install

# .env anlegen
cp .env.example .env

# App-Key generieren
php artisan key:generate
```

**.env anpassen** — mindestens diese Werte setzen:

```env
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=olympos
DB_USERNAME=sail
DB_PASSWORD=password

MAIL_MAILER=smtp
MAIL_HOST=...
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS="info@olymposlodge.com.tr"
MAIL_FROM_NAME="Olympos Lodge"

GEMINI_API_KEY=         # Google AI Studio → API-Key
```

**Sail starten:**

```bash
# Sail-Alias einrichten (einmalig)
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'

# Container starten
sail up -d

# Datenbank migrieren + befüllen
sail artisan migrate --seed

# Filament-Admin-User anlegen
sail artisan make:filament-user
```

Admin erreichbar unter: **http://localhost/admin**  
API erreichbar unter: **http://localhost/api/v1/**  
Sitemap: **http://localhost/sitemap.xml**

---

### 3. Frontend (Vite)

In einem neuen Terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend läuft auf: **http://localhost:5173**

Der Vite Dev-Server leitet `/api/*`-Anfragen automatisch an `http://localhost:80` weiter (konfiguriert in `vite.config.ts`).

---

### 4. Übersetzungen neu einspielen

Nach Änderungen am `TranslationSeeder`:

```bash
sail artisan db:seed --class=TranslationSeeder
```

---

## Analytics & Tracking einrichten

Das Projekt ist vorbereitet für **GTM, GA4, Meta Pixel und Google Search Console**. Aktuell sind Platzhalter eingetragen — die IDs müssen in `frontend/index.html` eingesetzt werden.

### Schritt 1 — Google Tag Manager

1. [tagmanager.google.com](https://tagmanager.google.com) → Konto & Container erstellen
2. Container-ID kopieren (Format: `GTM-XXXXXXX`)
3. In `frontend/index.html` **beide** Vorkommen von `REPLACE_WITH_GTM_ID` ersetzen:
   ```html
   <!-- Zeile ~24: -->
   j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
   if (i !== 'GTM-XXXXXXX') ...    ← Bedingung entfernen sobald echte ID

   <!-- Zeile ~28: -->
   })(window,document,'script','dataLayer','GTM-XXXXXXX');

   <!-- Zeile ~38 (noscript): -->
   <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
   ```
4. Ebenfalls die Guard-Bedingung `if (i !== 'REPLACE_WITH_GTM_ID')` aus dem Script entfernen — sie verhindert das Laden des Platzhalters und wird bei echter ID nicht mehr benötigt.

### Schritt 2 — Google Analytics 4 (in GTM konfigurieren)

1. [analytics.google.com](https://analytics.google.com) → Property erstellen → Web-Datenstream anlegen
2. Measurement-ID kopieren (Format: `G-XXXXXXXXXX`)
3. In **GTM → Tags → Neu:**
   - Tag-Typ: *Google Analytics: GA4-Konfiguration*
   - Mess-ID: `G-XXXXXXXXXX`
   - Trigger: *Consent Initialization – All Pages*
4. Zweiten Tag für SPA-Seitenaufrufe anlegen:
   - Tag-Typ: *GA4-Ereignis* · Ereignisname: `page_view`
   - Trigger: *History Change* (neuen Trigger vom Typ „Verlaufsänderung" erstellen)

> **Wichtig:** Den History-Change-Trigger anlegen, da die Seite eine React SPA ist und Seiten ohne Reload wechselt. Das Frontend pusht zusätzlich manuell via `gtag('event', 'page_view', ...)` bei jedem Routenwechsel (in `App.tsx`).

### Schritt 3 — Meta Pixel (in GTM konfigurieren)

1. [business.facebook.com](https://business.facebook.com) → Events Manager → Datenquellen verbinden → Web → Facebook Pixel
2. Pixel-ID kopieren
3. In **GTM → Tags → Neu:**
   - Tag-Typ: *Benutzerdefiniertes HTML*
   - Pixel-Basis-Code einfügen (aus Facebook Events Manager kopieren), Pixel-ID einsetzen
   - Trigger: *Consent Initialization – All Pages*
   - Erweiterte Einstellungen → Einwilligungseinstellungen: `ad_storage` = Erforderlich

### Schritt 4 — Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → Property hinzufügen → URL-Präfix: `https://www.olymposlodge.com.tr`
2. Verifizierungs-Meta-Tag kopieren (nur den `content`-Wert)
3. In `frontend/index.html` die auskommentierte Zeile einkommentieren und Wert einsetzen:
   ```html
   <meta name="google-site-verification" content="REPLACE_WITH_GSC_VERIFICATION_CODE" />
   ```
4. Nach Go-Live: Sitemap einreichen unter:
   `https://www.olymposlodge.com.tr/sitemap.xml`

### Cookie Consent & Consent Mode v2

Der Cookie-Banner (`src/components/CookieConsent.tsx`) ist bereits vollständig mit **GTM Consent Mode v2** verknüpft:

- Neue Besucher starten mit `denied` für alle Kategorien
- Returning Visitors: gespeicherte Entscheidung (`localStorage` Key: `ol_cookie_consent`) wird **vor** GTM-Load eingelesen und sofort gesetzt — kein Tracking-Flackern
- Banner-Entscheidung ruft `gtag('consent', 'update', ...)` auf:
  - Analytics-Toggle → `analytics_storage`
  - Marketing-Toggle → `ad_storage`, `ad_user_data`, `ad_personalization`

---

## Production Checklist

### Backend

```bash
# Auf dem Server / in der CI-Pipeline:
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan db:seed --class=TranslationSeeder --force
```

**`.env` für Produktion:**

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://www.olymposlodge.com.tr

DB_CONNECTION=mysql
DB_HOST=...
DB_DATABASE=olympos
DB_USERNAME=...
DB_PASSWORD=...         # Starkes Passwort

SESSION_DRIVER=database
CACHE_STORE=database

MAIL_MAILER=smtp        # Echten SMTP-Provider eintragen (z.B. Mailgun, Postmark)
MAIL_HOST=...
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...

GEMINI_API_KEY=...      # Google AI Studio API-Key
```

**Webserver (nginx) — wichtig für SPA-Routing:**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location /api/ {
    try_files $uri $uri/ /index.php?$query_string;
}

location /admin {
    try_files $uri $uri/ /index.php?$query_string;
}
```

**Storage-Link anlegen:**

```bash
php artisan storage:link
```

**Dateiberechtigungen:**

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

### Frontend

```bash
cd frontend
npm ci
npm run build
```

Den Inhalt von `frontend/dist/` in das Document-Root des Webservers deployen (oder als separaten Static-File-Server bereitstellen).

---

### Vollständige Deployment-Checkliste

#### Vor dem ersten Go-Live

- [ ] `APP_KEY` in Produktion gesetzt (`php artisan key:generate`)
- [ ] `APP_DEBUG=false` in `.env`
- [ ] Datenbank migriert und geseeded
- [ ] Filament-Admin-User angelegt (`php artisan make:filament-user`)
- [ ] SMTP-Versand getestet (Kontaktformular, Newsletter)
- [ ] `GEMINI_API_KEY` gesetzt und Chat-Funktion getestet
- [ ] SSL-Zertifikat aktiv (Let's Encrypt oder Provider)
- [ ] nginx/Apache für SPA-Routing konfiguriert

#### Analytics (sobald IDs vorliegen)

- [ ] GTM Container-ID in `frontend/index.html` eingetragen (2× + Guard entfernt)
- [ ] GA4 Measurement-ID in GTM konfiguriert
- [ ] Meta Pixel-ID in GTM konfiguriert
- [ ] GTM veröffentlicht (nicht nur gespeichert)
- [ ] Google Search Console: Property verifiziert
- [ ] Search Console Meta-Tag in `frontend/index.html` eingetragen (Zeile einkommentiert)
- [ ] Sitemap in Search Console eingereicht: `https://www.olymposlodge.com.tr/sitemap.xml`
- [ ] GA4 mit Search Console verknüpft (Search Console → Einstellungen → Verknüpfungen)

#### SEO & Performance

- [ ] `robots.txt` prüfen — Adminbereich ausgeschlossen
- [ ] Core Web Vitals im GTM Vorschau-Modus geprüft
- [ ] Lighthouse-Audit durchgeführt

---

## Wichtige URLs (Produktion)

| URL | Beschreibung |
|---|---|
| `https://www.olymposlodge.com.tr` | Website |
| `https://www.olymposlodge.com.tr/admin` | Filament Admin |
| `https://www.olymposlodge.com.tr/api/v1/` | REST API |
| `https://www.olymposlodge.com.tr/sitemap.xml` | Sitemap |

---

## Lokale Shortcuts

```bash
# Backend
sail up -d                          # Container starten
sail artisan migrate:fresh --seed   # DB komplett neu aufsetzen
sail artisan db:seed --class=TranslationSeeder  # Nur Übersetzungen
sail artisan make:filament-user     # Admin-User anlegen
sail down                           # Container stoppen

# Frontend
npm run dev     # Dev-Server starten
npm run build   # Produktions-Build
npm run lint    # Linter
```
