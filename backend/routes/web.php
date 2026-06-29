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

        Route::get('/_smoke', fn () => Inertia::render('Smoke', ['message' => 'inertia-ok']))
            ->name('smoke');

        Route::get('/rooms', [\App\Http\Controllers\Web\RoomsController::class, 'index'])->name('rooms.index');

        Route::get('/rooms/{slug}', [\App\Http\Controllers\Web\RoomController::class, 'show'])->name('rooms.show');

        Route::post('/newsletter', [\App\Http\Controllers\Web\NewsletterController::class, 'store'])
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
        Route::get('/offers', \App\Http\Controllers\Web\StaticPageController::class)
            ->defaults('page', ['component' => 'Offers', 'namespaces' => ['offers', 'meta']])
            ->name('offers');
    });

Route::get('/sitemap.xml', [SitemapController::class, 'index']);

// 301-Redirect aller präfixlosen Alt-URLs auf die kanonische Sprache (Pilot-Ziele existieren).
// Ausgenommen: admin, api, sitemap.xml, robots.txt, up, build, storage, favicon.
Route::get('/', fn (Request $request) => redirect('/'.Locale::best($request), 301));

Route::get('/{path}', function (string $path, Request $request) {
    return redirect('/'.Locale::best($request).'/'.$path, 301);
})->where('path', '^(?!(?:tr|en|de)(?:/|$)|(?:admin|api|build|storage)(?:/|$)|sitemap\.xml|robots\.txt|up(?:/|$)|favicon).+$');
