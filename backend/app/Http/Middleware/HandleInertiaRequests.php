<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function handle(Request $request, Closure $next)
    {
        $response = parent::handle($request, $next);

        // Language-negotiated redirects (see routes/web.php) differ per visitor.
        if ($request->attributes->get('locale_negotiated')) {
            $response->headers->set('Vary', 'X-Inertia, Accept-Language, Cookie');
        }

        return $response;
    }

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'locale' => fn () => app()->getLocale(),
            'translations' => fn () => (new \App\Support\TranslationRepository())
                ->forLocale(app()->getLocale(), \App\Support\PageProps::GLOBAL),
            'seo' => fn () => \App\Support\Seo::forRequest($request),
            'flash' => fn () => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}
