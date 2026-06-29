<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        ContactMessage::create([
            'name' => trim($validated['firstname'].' '.$validated['lastname']),
            'email' => $validated['email'],
            'phone' => ($validated['phone'] ?? null) ?: null,
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'language' => app()->getLocale(),
            'ip_address' => $request->ip(),
            'status' => 'new',
        ]);

        // i18n liegt in der DB (nicht in Laravel-lang-Files), daher KEIN __():
        // der Flash ist nur ein Präsenz-Signal; die sichtbare Erfolgsmeldung
        // rendert die React-Page über DB-i18n (t('contact.success')).
        return back()->with('success', 'contact.success');
    }
}
