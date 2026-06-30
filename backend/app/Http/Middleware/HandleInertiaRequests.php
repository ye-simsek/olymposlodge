<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    private const GLOBAL_NAMESPACES = ['common', 'nav', 'footer', 'cookie'];

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
                ->forLocale(app()->getLocale(), self::GLOBAL_NAMESPACES),
        ];
    }
}
