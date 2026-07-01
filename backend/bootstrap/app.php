<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetLocale;
use App\Support\Locale;
use App\Support\PageProps;
use App\Support\Seo;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Damit das IP-basierte Rate-Limiting (throttle:chat) hinter nginx die echte
        // Client-IP aus X-Forwarded-For nutzt statt der Proxy-IP.
        // TODO(prod): '*' durch die konkrete nginx/Load-Balancer-IP bzw. -CIDR ersetzen.
        // '*' ist nur sicher, wenn der App-Server AUSSCHLIESSLICH über den Proxy erreichbar
        // ist — sonst kann X-Forwarded-For gespooft werden. Siehe specs/006-chat-rate-limit.md §4.4.
        $middleware->trustProxies(at: '*');

        $middleware->alias([
            'setlocale' => SetLocale::class,
        ]);

        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );

        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            // Filament-Admin und API behalten ihr eigenes 404/Redirect-Verhalten.
            if ($request->is('api/*') || $request->is('admin', 'admin/*') || $request->expectsJson()) {
                return null;
            }

            $segments = explode('/', trim($request->path(), '/'));
            $locale = in_array($segments[0] ?? '', SetLocale::SUPPORTED, true)
                ? $segments[0]
                : Locale::DEFAULT;
            app()->setLocale($locale);

            // Unmatched 404-Routen durchlaufen die web-Middleware NICHT, daher
            // fehlen die von HandleInertiaRequests::share() gelieferten Shared-Props
            // (locale/seo/name/flash), die der Layout-Baum (Header/Footer/SeoHead)
            // beim SSR liest. Hier explizit in derselben Shape nachreichen.
            return Inertia::render('NotFound', [
                'name' => config('app.name'),
                'locale' => $locale,
                'seo' => Seo::forRequest($request),
                'flash' => ['success' => null, 'error' => null],
                'translations' => PageProps::translations(['meta']),
            ])->toResponse($request)->setStatusCode(404);
        });
    })->create();
