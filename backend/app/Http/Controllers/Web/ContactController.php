<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Mail\ContactMessageReceived;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        // Honeypot: the "website" field is invisible to people. A bot that fills
        // it gets the normal success response, but nothing is stored or sent.
        if ($request->filled('website')) {
            return back()->with('success', 'contact.success');
        }

        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $message = ContactMessage::create([
            'name' => trim($validated['firstname'].' '.$validated['lastname']),
            'email' => $validated['email'],
            'phone' => ($validated['phone'] ?? null) ?: null,
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'language' => app()->getLocale(),
            'ip_address' => $request->ip(),
            'status' => 'new',
        ]);

        $this->notifyLodge($message);

        // i18n liegt in der DB (nicht in Laravel-lang-Files), daher KEIN __():
        // der Flash ist nur ein Präsenz-Signal; die sichtbare Erfolgsmeldung
        // rendert die React-Page über DB-i18n (t('contact.success')).
        return back()->with('success', 'contact.success');
    }

    /**
     * The message is already saved, so a mail outage must never turn the
     * guest's submission into an error page.
     */
    private function notifyLodge(ContactMessage $message): void
    {
        $recipient = config('contact.notify_to');

        if (! $recipient) {
            return;
        }

        try {
            Mail::to($recipient)->send(new ContactMessageReceived($message));
        } catch (\Throwable $e) {
            report($e);
        }
    }
}
