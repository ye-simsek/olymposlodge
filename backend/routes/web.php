<?php

use App\Http\Controllers\SitemapController;
use App\Support\Locale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('{locale}')
    ->whereIn('locale', \App\Http\Middleware\SetLocale::SUPPORTED)
    ->middleware('setlocale')
    ->group(function () {
        Route::get('/', \App\Http\Controllers\Web\HomeController::class)->name('home');

        // Rendering self-check for development and the test suite; not a public page.
        Route::get('/_smoke', function () {
            abort_unless(app()->environment('local', 'testing'), 404);

            return Inertia::render('Smoke', ['message' => 'inertia-ok']);
        })
            ->name('smoke');

        Route::get('/rooms', [\App\Http\Controllers\Web\RoomsController::class, 'index'])->name('rooms.index');

        Route::get('/rooms/{slug}', [\App\Http\Controllers\Web\RoomController::class, 'show'])->name('rooms.show');

        // Public write endpoints: 5 submissions per minute per IP.
        Route::post('/newsletter', [\App\Http\Controllers\Web\NewsletterController::class, 'store'])
            ->middleware('throttle:5,1')
            ->name('newsletter.store');

        Route::get('/terms', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Terms', 'namespaces' => ['meta']])
            ->name('terms');
        Route::get('/privacy', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Privacy', 'namespaces' => ['meta']])
            ->name('privacy');

        Route::get('/experiences', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Experiences', 'namespaces' => ['experiences', 'meta', 'nav']])
            ->name('experiences');

        Route::get('/activities', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Activities', 'namespaces' => ['activities', 'meta']])
            ->name('activities');
        Route::get('/lodge', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Lodge', 'namespaces' => ['lodge', 'meta', 'nav']])
            ->name('lodge');

        Route::get('/spa', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Spa', 'namespaces' => ['spa', 'meta', 'nav']])
            ->name('spa');
        Route::get('/gallery', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Gallery', 'namespaces' => ['meta', 'nav']])
            ->name('gallery');
        // The Offers page is switched off, as on the legacy site since June 2026. The page
        // component (resources/js/pages/Offers.tsx) and its translations are kept; to bring it
        // back, restore the route here, the nav item in Header.tsx and the sitemap entry.
        Route::get('/location', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Location', 'namespaces' => ['location', 'meta', 'nav']])
            ->name('location');

        Route::get('/contact', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Contact', 'namespaces' => ['contact', 'meta']])
            ->name('contact');
        Route::post('/contact', [\App\Http\Controllers\Web\ContactController::class, 'store'])
            ->middleware('throttle:5,1')
            ->name('contact.store');

        Route::get('/booking', \App\Http\Controllers\Web\BookingController::class)
            ->name('booking');
        Route::post('/booking', [\App\Http\Controllers\Web\BookingController::class, 'store'])
            ->middleware('throttle:5,1')
            ->name('booking.store');
    });

Route::get('/sitemap.xml', [SitemapController::class, 'index']);

// 301-Redirect aller präfixlosen Alt-URLs auf die kanonische Sprache (Pilot-Ziele existieren).
// Ausgenommen: admin, api, sitemap.xml, robots.txt, up, build, storage, favicon.
//
// 302, not 301: the target depends on the visitor (language cookie, Accept-Language).
// A permanent redirect is cached by browsers and proxies and would pin everyone
// behind them to the first visitor's language. The query string is carried over
// so campaign links (utm_*) and ?room= keep working.
$toLocale = function (Request $request, string $path = '') {
    $target = '/'.trim(Locale::best($request).'/'.(Locale::LEGACY_PATHS[$path] ?? $path), '/');
    $query = (string) $request->server('QUERY_STRING'); // raw, in the order it was sent

    // HandleInertiaRequests adds the Vary header for these (it would overwrite one set here).
    $request->attributes->set('locale_negotiated', true);

    return redirect($target.($query !== '' ? '?'.$query : ''), 302);
};

Route::get('/', fn (Request $request) => $toLocale($request));

Route::get('/{path}', fn (string $path, Request $request) => $toLocale($request, $path))->where('path', '^(?!(?:tr|en|de)(?:/|$)|(?:admin|api|build|storage)(?:/|$)|sitemap\.xml|robots\.txt|up(?:/|$)|favicon).+$');
