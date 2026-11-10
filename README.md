# Olympos Lodge — Website

Official website of **Olympos Lodge Boutique Hotel** in Çıralı, Antalya.  
Trilingual (Turkish · English · German), with AI chat assistant, contact form, newsletter, and Filament admin panel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Inertia.js (React 19 + TypeScript) with server-side rendering (SSR), Vite |
| Backend | Laravel 13, PHP 8.3 |
| Admin | Filament 3.3 |
| Database | MySQL 8.4 (production), SQLite (local option) |
| AI Chat | Google Gemini 2.5 Flash (`/api/v1/chat`) |
| Dev Environment | Laravel Sail (Docker) |

---

## Project Structure

```
Website/
├── backend/      # Laravel + Inertia (React/SSR) monolith + Filament Admin
│   ├── resources/js/   # Inertia React pages & components
│   └── resources/css/  # Stylesheets
└── README.md
```

The site is a single Laravel + Inertia.js monolith: pages are server-rendered
React components (SSR via Node), served and routed entirely by Laravel. There is
no separate decoupled SPA.

---

## Local Setup

### Prerequisites

- **Docker Desktop** (for Laravel Sail)
- **Node.js** ≥ 20 + npm
- **PHP** 8.3 + **Composer** (only needed without Docker)

---

### 1. Clone the Repository

```bash
git clone <repo-url> olympos-website
cd olympos-website
```

---

### 2. Backend (Laravel Sail)

```bash
cd backend

# Install dependencies (can be done once without Docker)
composer install

# Create .env file
cp .env.example .env

# Generate app key
php artisan key:generate
```

**Edit `.env`** — at minimum set these values:

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

GEMINI_API_KEY=         # Google AI Studio → API key

ADMIN_EMAIL=admin@olymposlodge.com.tr
ADMIN_PASSWORD=         # first admin's password (leave empty locally for a generated one)
CONTACT_NOTIFY_TO=      # inbox that receives contact form messages (empty = store only)
```

**Start Sail:**

```bash
# Set up Sail alias (once)
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'

# Start containers
sail up -d

# Run migrations and seeders
sail artisan migrate --seed

# Create Filament admin user
sail artisan make:filament-user
```

Admin panel: **http://localhost/admin**  
API: **http://localhost/api/v1/**  
Sitemap: **http://localhost/sitemap.xml**

**Admin login:** the seeder creates the first admin from `ADMIN_EMAIL` /
`ADMIN_PASSWORD` in `.env`. Locally, if `ADMIN_PASSWORD` is empty, a random
password is generated and printed once in the seeder output. An existing admin
is never modified, so re-seeding does not reset a password.

---

### 3. Frontend assets (Vite, inside the monolith)

The frontend lives inside `backend/` (Inertia React under `resources/js`). In a new
terminal:

```bash
cd backend
npm install

# Dev: Vite dev server with HMR (assets only — pages are served by Laravel on :8002)
npm run dev

# Production-style build incl. the SSR bundle
npm run build:ssr
```

Open the site at the backend URL (e.g. **http://localhost:8002/en**). After every
`npm run build:ssr`, restart the SSR Node process so it picks up the new bundle.

---

### 4. Re-seed Translations

After changes to the `TranslationSeeder`:

```bash
sail artisan db:seed --class=TranslationSeeder
```

---

## Analytics & Tracking Setup

> **Note:** This section describes the analytics integration as it was wired into the
> former decoupled SPA (`frontend/index.html`, `src/components/CookieConsent.tsx`,
> `App.tsx`). That SPA has been removed. The GTM/GA4/Meta Pixel/GSC tags still need
> to be re-wired into the Inertia monolith's root template
> (`backend/resources/views/app.blade.php`) and React components. The conceptual
> steps below (account/container/ID setup, Consent Mode v2) remain valid; only the
> file locations have changed.

The project is prepared for **GTM, GA4, Meta Pixel, and Google Search Console**. Placeholders need to be filled in the Inertia root template (`backend/resources/views/app.blade.php`).

### Step 1 — Google Tag Manager

1. [tagmanager.google.com](https://tagmanager.google.com) → Create account & container
2. Copy the container ID (format: `GTM-XXXXXXX`)
3. Add the GTM container snippet to the Inertia root template
   `backend/resources/views/app.blade.php` (this needs to be wired in — see the note
   above): the `<head>` loader script with your `GTM-XXXXXXX` ID plus the `<noscript>`
   `<iframe>` fallback right after `<body>`.

   ```html
   <!-- in <head>: -->
   })(window,document,'script','dataLayer','GTM-XXXXXXX');

   <!-- right after <body> (noscript fallback): -->
   <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"></iframe>
   ```

### Step 2 — Google Analytics 4 (configure in GTM)

1. [analytics.google.com](https://analytics.google.com) → Create property → Set up web data stream
2. Copy the Measurement ID (format: `G-XXXXXXXXXX`)
3. In **GTM → Tags → New:**
   - Tag type: *Google Analytics: GA4 Configuration*
   - Measurement ID: `G-XXXXXXXXXX`
   - Trigger: *Consent Initialization – All Pages*
4. Create a second tag for SPA page views:
   - Tag type: *GA4 Event* · Event name: `page_view`
   - Trigger: *History Change* (create a new trigger of type "History Change")

> **Note:** The History Change trigger is required because Inertia navigates between pages client-side (via `pushState`) without a full reload. The app also pushes page views manually via `gtag('event', 'page_view', ...)` on each Inertia navigation, in `backend/resources/js/app.tsx` (`router.on('navigate', …)`).

### Step 3 — Meta Pixel (configure in GTM)

1. [business.facebook.com](https://business.facebook.com) → Events Manager → Connect data source → Web → Facebook Pixel
2. Copy the Pixel ID
3. In **GTM → Tags → New:**
   - Tag type: *Custom HTML*
   - Paste the Pixel base code (copied from Facebook Events Manager), insert Pixel ID
   - Trigger: *Consent Initialization – All Pages*
   - Advanced settings → Consent settings: `ad_storage` = Required

### Step 4 — Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → Add property → URL prefix: `https://www.olymposlodge.com.tr`
2. Copy the verification meta tag (the `content` value only)
3. In the Inertia root template `backend/resources/views/app.blade.php`, add the
   verification meta tag inside `<head>`:
   ```html
   <meta name="google-site-verification" content="REPLACE_WITH_GSC_VERIFICATION_CODE" />
   ```
4. After go-live, submit the sitemap at:
   `https://www.olymposlodge.com.tr/sitemap.xml`

### Cookie Consent & Consent Mode v2

The cookie banner (`backend/resources/js/components/CookieConsent.tsx`) is fully integrated with **GTM Consent Mode v2**:

- New visitors start with `denied` for all categories
- Returning visitors: previously saved choices (`localStorage` key: `ol_cookie_consent`) are read **before** GTM loads and applied immediately — no tracking flicker
- Banner decisions call `gtag('consent', 'update', ...)`:
  - Analytics toggle → `analytics_storage`
  - Marketing toggle → `ad_storage`, `ad_user_data`, `ad_personalization`

---

## Production Checklist

### Backend

```bash
# On the server / in CI pipeline:
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan db:seed --class=TranslationSeeder --force   # adds new keys; text edited in the admin panel is kept
```

Run the full `php artisan db:seed` only once, for the first go-live. After that the
rooms, media and chat prompt are managed in the admin panel, and a full re-seed would
reset them to the defaults in the seeders.

**`.env` for production:**

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://www.olymposlodge.com.tr

DB_CONNECTION=mysql
DB_HOST=...
DB_DATABASE=olympos
DB_USERNAME=...
DB_PASSWORD=...         # Strong password

SESSION_DRIVER=database
CACHE_STORE=database

MAIL_MAILER=smtp        # Use a real SMTP provider (e.g. Mailgun, Postmark)
MAIL_HOST=...
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...

GEMINI_API_KEY=...      # Google AI Studio API key
GEMINI_RATE_LIMIT=20    # chat requests per minute per IP

ADMIN_EMAIL=...         # first admin (created once by the seeder, never reset)
ADMIN_PASSWORD=...      # strong and unique; or leave unset and use make:filament-user
CONTACT_NOTIFY_TO=info@olymposlodge.com.tr   # receives contact form messages and reservation requests
GTM_ID=GTM-XXXXXXX      # Google Tag Manager; leave empty for no tracking code at all
```

**Web server (nginx):** the monolith is a standard Laravel app — all routes
(pages, `/api/*`, `/admin`) are handled by `index.php`. No SPA `index.html`
fallback is needed.

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

A Node process must run the SSR bundle (`php artisan inertia:start-ssr` or a
supervisor entry for `bootstrap/ssr/ssr.js`).

**Create storage symlink:**

```bash
php artisan storage:link
```

**File permissions:**

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

### Frontend assets (built inside the monolith)

```bash
cd backend
npm ci
npm run build:ssr   # builds the client bundle + the SSR bundle
```

Vite emits the client assets into `backend/public/build/`; the SSR bundle lands in
`backend/bootstrap/ssr/`. Both are served by Laravel — there is no separate static
deploy. Ensure the SSR Node process (`bootstrap/ssr/ssr.js`) is running and is
restarted after each build.

---

### Full Deployment Checklist

#### Before First Go-Live

- [ ] `APP_KEY` set in production (`php artisan key:generate`)
- [ ] `APP_DEBUG=false` in `.env`
- [ ] Database migrated and seeded
- [ ] Filament admin user created (`php artisan make:filament-user`)
- [ ] SMTP delivery tested (contact form and reservation request, with `CONTACT_NOTIFY_TO` set)
- [ ] `GEMINI_API_KEY` set and chat tested
- [ ] SSL certificate active (Let's Encrypt or provider)
- [ ] nginx/Apache configured for the Laravel monolith (all routes via `index.php`)
- [ ] SSR Node process running (`bootstrap/ssr/ssr.js`) and restarted after each build

#### Analytics (once IDs are available)

- [ ] `GTM_ID` set in `.env` (the consent default and the loader are already in `app.blade.php`)
- [ ] GA4 Measurement ID configured in GTM
- [ ] Meta Pixel ID configured in GTM
- [ ] GTM published (not just saved)
- [ ] Google Search Console: property verified
- [ ] Search Console meta tag added to `backend/resources/views/app.blade.php`
- [ ] Sitemap submitted in Search Console: `https://www.olymposlodge.com.tr/sitemap.xml`
- [ ] GA4 linked to Search Console (Search Console → Settings → Links)

#### SEO & Performance

- [x] `robots.txt` names the sitemap and excludes the admin panel
- [ ] Core Web Vitals checked in GTM Preview mode
- [ ] Lighthouse audit completed

---

## Production URLs

| URL | Description |
|---|---|
| `https://www.olymposlodge.com.tr` | Website |
| `https://www.olymposlodge.com.tr/admin` | Filament Admin |
| `https://www.olymposlodge.com.tr/api/v1/` | REST API |
| `https://www.olymposlodge.com.tr/sitemap.xml` | Sitemap |

---

## Local Shortcuts

```bash
# Backend
sail up -d                          # Start containers
sail artisan migrate:fresh --seed   # Reset DB completely
sail artisan db:seed --class=TranslationSeeder  # Re-seed translations only
sail artisan make:filament-user     # Create admin user
sail down                           # Stop containers

# Frontend assets (run inside backend/)
npm run dev        # Vite dev server (HMR)
npm run build:ssr  # Client + SSR production build
npm run test:unit  # Vitest component tests
```

---

## Checks

```bash
cd backend
npm run typecheck                  # TypeScript, no emit
npm run test:unit                  # Vitest (use Node 22; Node 25 needs NODE_OPTIONS=--no-experimental-webstorage)
npm run build:ssr                  # the PHP tests need the Vite manifest this writes
php artisan test                   # runs on in-memory SQLite
```

The same four steps run in GitHub Actions on every push to `main` and on pull requests
(`.github/workflows/ci.yml`).

## Booking

The booking wizard sends a reservation **request**. It is stored under Reservations in the
admin panel with status `pending` and emailed to `CONTACT_NOTIFY_TO`; the lodge answers the
guest with availability and the rate. No price is shown on the site, and nothing is checked
against the booking system.

## Images

Photos live in `backend/public/images` as WebP, named `<slug>-<width>.webp` with a 1200px
variant next to the full-size one. Nothing is loaded from the old WordPress site;
`tests/Feature/LocalAssetsTest.php` fails if a `wp-content` URL or a missing image is referenced.
