<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Support\PageProps;
use App\Support\RoomPresenter;
use Illuminate\Http\Request;
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
}
