# Olympos Lodge — Website

Official website of **Olympos Lodge Boutique Hotel** in Çıralı, Antalya.  
Trilingual (Turkish · English · German), with AI chat assistant, contact form, newsletter, and Filament admin panel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript 5.5, Vite 5, react-router-dom 7, i18next |
| Backend | Laravel 13, PHP 8.3 |
| Admin | Filament 3.3 |
| Database | MySQL 8.4 (production), SQLite (local option) |
| AI Chat | Google Gemini 2.5 Flash (`/api/v1/chat`) |
| Dev Environment | Laravel Sail (Docker) |

---

## Project Structure

```
Website/
├── backend/      # Laravel API + Filament Admin
├── frontend/     # React SPA (Vite)
└── README.md
```

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

---

### 3. Frontend (Vite)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

The Vite dev server automatically proxies `/api/*` requests to `http://localhost:80` (configured in `vite.config.ts`).

---

### 4. Re-seed Translations

After changes to the `TranslationSeeder`:

```bash
sail artisan db:seed --class=TranslationSeeder
```

---

## Analytics & Tracking Setup

The project is prepared for **GTM, GA4, Meta Pixel, and Google Search Console**. Placeholders are currently in place — IDs need to be filled in `frontend/index.html`.

### Step 1 — Google Tag Manager

1. [tagmanager.google.com](https://tagmanager.google.com) → Create account & container
2. Copy the container ID (format: `GTM-XXXXXXX`)
3. Replace **both** occurrences of `REPLACE_WITH_GTM_ID` in `frontend/index.html`:
   ```html
   <!-- Line ~24: -->
   j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
   if (i !== 'GTM-XXXXXXX') ...    ← Remove condition once real ID is set

   <!-- Line ~28: -->
   })(window,document,'script','dataLayer','GTM-XXXXXXX');

   <!-- Line ~38 (noscript): -->
   <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
   ```
4. Also remove the guard condition `if (i !== 'REPLACE_WITH_GTM_ID')` from the script — it prevents loading the placeholder and is no longer needed once a real ID is set.

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

> **Note:** The History Change trigger is required because the site is a React SPA and navigates between pages without a full reload. The frontend also pushes page views manually via `gtag('event', 'page_view', ...)` on each route change (in `App.tsx`).

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
3. In `frontend/index.html`, uncomment the relevant line and insert the value:
   ```html
   <meta name="google-site-verification" content="REPLACE_WITH_GSC_VERIFICATION_CODE" />
   ```
4. After go-live, submit the sitemap at:
   `https://www.olymposlodge.com.tr/sitemap.xml`

### Cookie Consent & Consent Mode v2

The cookie banner (`src/components/CookieConsent.tsx`) is fully integrated with **GTM Consent Mode v2**:

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
php artisan db:seed --class=TranslationSeeder --force
```

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
```

**Web server (nginx) — important for SPA routing:**

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

### Frontend

```bash
cd frontend
npm ci
npm run build
```

Deploy the contents of `frontend/dist/` to the web server's document root (or serve as a separate static file server).

---

### Full Deployment Checklist

#### Before First Go-Live

- [ ] `APP_KEY` set in production (`php artisan key:generate`)
- [ ] `APP_DEBUG=false` in `.env`
- [ ] Database migrated and seeded
- [ ] Filament admin user created (`php artisan make:filament-user`)
- [ ] SMTP delivery tested (contact form, newsletter)
- [ ] `GEMINI_API_KEY` set and chat tested
- [ ] SSL certificate active (Let's Encrypt or provider)
- [ ] nginx/Apache configured for SPA routing

#### Analytics (once IDs are available)

- [ ] GTM container ID added to `frontend/index.html` (2× + guard removed)
- [ ] GA4 Measurement ID configured in GTM
- [ ] Meta Pixel ID configured in GTM
- [ ] GTM published (not just saved)
- [ ] Google Search Console: property verified
- [ ] Search Console meta tag added to `frontend/index.html` (line uncommented)
- [ ] Sitemap submitted in Search Console: `https://www.olymposlodge.com.tr/sitemap.xml`
- [ ] GA4 linked to Search Console (Search Console → Settings → Links)

#### SEO & Performance

- [ ] `robots.txt` reviewed — admin panel excluded
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

# Frontend
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # Run linter
```
