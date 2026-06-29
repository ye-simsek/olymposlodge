<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'setlocale' => \App\Http\Middleware\SetLocale::class,
        ]);

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );

        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, \Illuminate\Http\Request $request) {
            // Filament-Admin und API behalten ihr eigenes 404/Redirect-Verhalten.
            if ($request->is('api/*') || $request->is('admin', 'admin/*') || $request->expectsJson()) {
                return null;
            }

            $segments = explode('/', trim($request->path(), '/'));
            $locale = in_array($segments[0] ?? '', \App\Http\Middleware\SetLocale::SUPPORTED, true)
                ? $segments[0]
                : \App\Support\Locale::DEFAULT;
            app()->setLocale($locale);

            // Unmatched 404-Routen durchlaufen die web-Middleware NICHT, daher
            // fehlen die von HandleInertiaRequests::share() gelieferten Shared-Props
            // (locale/seo/name/flash), die der Layout-Baum (Header/Footer/SeoHead)
            // beim SSR liest. Hier explizit in derselben Shape nachreichen.
            return \Inertia\Inertia::render('NotFound', [
                'name' => config('app.name'),
                'locale' => $locale,
                'seo' => \App\Support\Seo::forRequest($request),
                'flash' => ['success' => null, 'error' => null],
                'translations' => \App\Support\PageProps::translations(['meta']),
            ])->toResponse($request)->setStatusCode(404);
        });
    })->create();
