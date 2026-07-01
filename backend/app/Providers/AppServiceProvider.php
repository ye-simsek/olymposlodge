<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Rate-Limit für den öffentlichen, kostenpflichtigen Gemini-Chat-Endpoint.
        // Eigene 429-Response im ChatController-Schema { error, unavailable, retry_after }.
        RateLimiter::for('chat', function (Request $request) {
            return Limit::perMinute((int) config('services.gemini.rate_limit', 20))
                ->by($request->ip())
                ->response(fn (Request $request, array $headers) => response()->json([
                    'error' => 'Too many requests. Please wait a moment.',
                    'unavailable' => false,
                    'retry_after' => $headers['Retry-After'] ?? 60,
                ], 429, $headers));
        });
    }
}
