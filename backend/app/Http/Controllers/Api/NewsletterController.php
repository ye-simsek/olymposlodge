<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
            'language' => 'nullable|in:tr,en,de',
            'consent' => 'required|accepted',
        ]);

        $subscriber = NewsletterSubscriber::firstOrCreate(
            ['email' => $validated['email']],
            [
                'name' => $validated['name'] ?? null,
                'language' => $validated['language'] ?? 'tr',
                'consent_at' => now(),
                'ip_address' => $request->ip(),
                'is_active' => true,
            ]
        );

        if (!$subscriber->wasRecentlyCreated) {
            $subscriber->update(['is_active' => true, 'consent_at' => now()]);
        }

        return response()->json(['message' => 'Subscribed successfully.'], 201);
    }
}
