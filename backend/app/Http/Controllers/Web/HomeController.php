<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\SiteMedia;
use App\Support\PageProps;
use App\Support\RoomPresenter;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $locale = app()->getLocale();

        $rooms = Room::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Room $room) => RoomPresenter::localize($room, $locale))
            ->values();

        return Inertia::render('Home', [
            'rooms' => $rooms,
            'media' => SiteMedia::orderBy('group')->orderBy('sort_order')->get()->pluck('url', 'key'),
            'translations' => PageProps::translations([
                'meta', 'intro', 'glance', 'conviction', 'rooms', 'story', 'voices', 'gallery', 'explore_more',
            ]),
        ]);
    }
}
