<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Mail\BookingRequestReceived;
use App\Models\Reservation;
use App\Models\Room;
use App\Support\PageProps;
use App\Support\RoomPresenter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $locale = app()->getLocale();

        $rooms = Room::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Room $room) => [
                'id' => $room->id,
                ...RoomPresenter::localize($room, $locale),
            ])
            ->values();

        return Inertia::render('Booking', [
            'rooms' => $rooms,
            'preselectRoom' => $request->query('room'),
            'translations' => PageProps::translations(['meta', 'booking', 'nav']),
        ]);
    }

    /**
     * A reservation *request*: availability and rates live in the lodge's
     * booking system, so nothing is confirmed or priced here. The request is
     * stored as a pending reservation and the lodge answers the guest by email.
     */
    public function store(Request $request): RedirectResponse
    {
        // Honeypot: see ContactController.
        if ($request->filled('website')) {
            return back()->with('success', 'booking.confirm_title');
        }

        $data = $request->validate([
            'room_id' => ['required', Rule::exists('rooms', 'id')->where('is_active', true)],
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'rooms' => 'required|integer|min:1|max:4',
            'adults' => 'required|integer|min:1|max:8',
            'children' => 'required|integer|min:0|max:6',
            'title' => 'nullable|string|max:20',
            'first_name' => 'required|string|max:120',
            'last_name' => 'required|string|max:120',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'country' => 'nullable|string|max:100',
            'arrival_time' => 'nullable|string|max:20',
            'notes' => 'nullable|string|max:2000',
        ]);

        $reservation = Reservation::create([
            'room_id' => $data['room_id'],
            'confirmation_number' => Reservation::nextConfirmationNumber(),
            'guest_name' => trim(implode(' ', array_filter([$data['title'] ?? null, $data['first_name'], $data['last_name']]))),
            'guest_email' => $data['email'],
            'guest_phone' => ($data['phone'] ?? null) ?: null,
            'guest_country' => ($data['country'] ?? null) ?: null,
            'check_in' => $data['check_in'],
            'check_out' => $data['check_out'],
            'adults' => $data['adults'],
            'children' => $data['children'],
            'price_per_night' => 0,
            'total_price' => 0,
            'status' => 'pending',
            'channel' => 'direct',
            'guest_notes' => ($data['notes'] ?? null) ?: null,
            'internal_notes' => sprintf(
                "Website request. Rooms: %d. Arrival: %s. Language: %s.",
                $data['rooms'],
                ($data['arrival_time'] ?? null) ?: 'not given',
                app()->getLocale(),
            ),
        ]);

        $this->notifyLodge($reservation);

        return back()->with('success', 'booking.confirm_title');
    }

    /** The request is already saved, so a mail outage must not show the guest an error. */
    private function notifyLodge(Reservation $reservation): void
    {
        $recipient = config('contact.notify_to');

        if (! $recipient) {
            return;
        }

        try {
            Mail::to($recipient)->send(new BookingRequestReceived($reservation));
        } catch (\Throwable $e) {
            report($e);
        }
    }
}
