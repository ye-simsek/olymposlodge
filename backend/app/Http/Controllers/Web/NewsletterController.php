<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
            'consent' => 'required|accepted',
        ]);

        $subscriber = NewsletterSubscriber::firstOrCreate(
            ['email' => $validated['email']],
            [
                'name' => $validated['name'] ?? null,
                'language' => app()->getLocale(),
                'consent_at' => now(),
                'ip_address' => $request->ip(),
                'is_active' => true,
            ]
        );

        if (! $subscriber->wasRecentlyCreated) {
            $subscriber->update(['is_active' => true, 'consent_at' => now()]);
        }

        return back()->with('success', __('newsletter.success'));
    }
}
