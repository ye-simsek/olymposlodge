# SSR Browser-API-Audit (vor Pilot-Migration je Komponente abarbeiten)

Suchlauf: `grep -rnE 'window\.|document\.|localStorage|sessionStorage|navigator' resources/js`

Bekannte Altlasten (aus frontend/src):
- i18n/index.ts: localStorage/navigator beim Modul-Import → entfällt durch serverseitige i18n; Restzugriffe via isBrowser-Guard.
- CookieConsent.tsx: loadPrefs() im Render → in useState-Init/useEffect; Komponente in <ClientOnly> mounten.
- lib/lenis: window/scroll → in useEffect, an Inertia-router-Events koppeln (nicht react-router).
- GTM window.gtag page_view: an router.on('navigate') hängen.

Regel pro Fund: (a) isBrowser-Guard, (b) in useEffect verschieben, oder (c) in <ClientOnly>.
