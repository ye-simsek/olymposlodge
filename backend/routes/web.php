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
        Route::get('/_smoke', fn () => Inertia::render('Smoke', ['message' => 'inertia-ok']))
            ->name('smoke');
    });

Route::get('/sitemap.xml', [SitemapController::class, 'index']);

// 301-Redirect aller präfixlosen Alt-URLs auf die kanonische Sprache.
// Ausgenommen: admin, api, sitemap.xml, robots.txt, up, build, storage, favicon.
Route::get('/', fn (Request $request) => redirect('/'.Locale::best($request), 301));

Route::get('/{path}', function (string $path, Request $request) {
    return redirect('/'.Locale::best($request).'/'.$path, 301);
})->where('path', '^(?!admin|api|sitemap\.xml|robots\.txt|up|build|storage|favicon).+$');
