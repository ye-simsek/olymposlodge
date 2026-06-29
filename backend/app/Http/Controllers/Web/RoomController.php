<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Support\PageProps;
use App\Support\RoomPresenter;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function show(string $locale, string $slug): Response
    {
        $rooms = Room::where('is_active', true)->orderBy('sort_order')->get()->values();
        $index = $rooms->search(fn (Room $r) => $r->slug === $slug);

        abort_if($index === false, 404);

        $count = $rooms->count();
        $room = $rooms[$index];

        $data = RoomPresenter::localize($room, $locale);
        $data['prev'] = RoomPresenter::neighbour($rooms[($index - 1 + $count) % $count], $locale);
        $data['next'] = RoomPresenter::neighbour($rooms[($index + 1) % $count], $locale);

        return Inertia::render('RoomDetail', [
            'room' => $data,
            'translations' => PageProps::translations(['meta', 'room_detail', 'common']),
        ]);
    }
}
