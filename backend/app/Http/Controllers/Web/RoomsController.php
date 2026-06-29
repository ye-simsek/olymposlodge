<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Support\PageProps;
use App\Support\RoomPresenter;
use Inertia\Inertia;
use Inertia\Response;

class RoomsController extends Controller
{
    public function index(): Response
    {
        $locale = app()->getLocale();

        return Inertia::render('Rooms', [
            'rooms' => Room::where('is_active', true)
                ->orderBy('sort_order')
                ->get()
                ->map(fn (Room $room) => RoomPresenter::localize($room, $locale))
                ->values(),
            'translations' => PageProps::translations(['meta', 'rooms', 'rooms_page']),
        ]);
    }
}
