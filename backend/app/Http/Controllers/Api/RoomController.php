<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\JsonResponse;

class RoomController extends Controller
{
    public function index(): JsonResponse
    {
        $rooms = Room::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($rooms);
    }

    public function show(string $slug): JsonResponse
    {
        $all = Room::where('is_active', true)->orderBy('sort_order')->get();
        $room = $all->firstWhere('slug', $slug);

        if (! $room) {
            return response()->json(['error' => 'Not found'], 404);
        }

        $count = $all->count();
        $index = $all->search(fn ($r) => $r->slug === $slug);
        $prev  = $all[($index - 1 + $count) % $count];
        $next  = $all[($index + 1) % $count];

        $data         = $room->toArray();
        $data['prev'] = [
            'slug'    => $prev->slug,
            'name_tr' => $prev->name_tr,
            'name_en' => $prev->name_en,
            'name_de' => $prev->name_de,
            'hero'    => $prev->images['hero'] ?? '',
        ];
        $data['next'] = [
            'slug'    => $next->slug,
            'name_tr' => $next->name_tr,
            'name_en' => $next->name_en,
            'name_de' => $next->name_de,
            'hero'    => $next->images['hero'] ?? '',
        ];

        return response()->json($data);
    }
}
