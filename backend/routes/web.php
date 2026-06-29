<?php

use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('{locale}')
    ->whereIn('locale', \App\Http\Middleware\SetLocale::SUPPORTED)
    ->middleware('setlocale')
    ->group(function () {
        Route::get('/_smoke', fn () => Inertia::render('Smoke', ['message' => 'inertia-ok']))
            ->name('smoke');
    });

Route::get('/', function () {
    return view('welcome');
});

Route::get('/sitemap.xml', [SitemapController::class, 'index']);
