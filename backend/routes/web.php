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
    });

Route::get('/sitemap.xml', [SitemapController::class, 'index']);

// Temporärer 302-Redirect aller präfixlosen Alt-URLs auf die kanonische Sprache.
// 302 (nicht 301), solange die Locale-Zielseiten noch fehlen (Plan 1 = Fundament):
// verhindert, dass Root/Legacy-URLs dauerhaft auf (noch) 404-Ziele kanonisiert werden.
// In Plan 2, sobald die Pilot-Seiten unter /{locale} existieren, auf 301 umstellen.
// Ausgenommen: admin, api, sitemap.xml, robots.txt, up, build, storage, favicon.
Route::get('/', fn (Request $request) => redirect('/'.Locale::best($request), 302));

Route::get('/{path}', function (string $path, Request $request) {
    return redirect('/'.Locale::best($request).'/'.$path, 302);
})->where('path', '^(?!(?:tr|en|de)(?:/|$)|(?:admin|api|build|storage)(?:/|$)|sitemap\.xml|robots\.txt|up(?:/|$)|favicon).+$');
