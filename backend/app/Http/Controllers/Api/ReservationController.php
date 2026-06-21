<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ReservationController extends Controller
{
    public function checkAvailability(Request $request): JsonResponse
    {
        $request->validate([
            'room_id'   => 'required|exists:rooms,id',
            'check_in'  => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
        ]);

        $overlap = Reservation::where('room_id', $request->room_id)
            ->whereNotIn('status', ['cancelled'])
            ->where('check_in', '<', $request->check_out)
            ->where('check_out', '>', $request->check_in)
            ->exists();

        $room   = Room::find($request->room_id);
        $nights = Carbon::parse($request->check_in)->diffInDays(Carbon::parse($request->check_out));
        $pricePn = (float) ($room->price_per_night ?? 0);

        return response()->json([
            'available'      => !$overlap,
            'price_per_night' => $pricePn,
            'total_price'    => round($nights * $pricePn, 2),
            'nights'         => $nights,
        ]);
    }

    public function calendar(Request $request): JsonResponse
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'from'    => 'required|date',
            'to'      => 'required|date|after:from',
        ]);

        $room = Room::find($request->room_id);

        $from = Carbon::parse($request->from)->startOfDay();
        $to   = Carbon::parse($request->to)->endOfDay();

        $reservations = Reservation::where('room_id', $request->room_id)
            ->whereNotIn('status', ['cancelled'])
            ->where('check_in', '<', $to)
            ->where('check_out', '>', $from)
            ->get(['check_in', 'check_out']);

        $blocked = [];
        foreach ($reservations as $res) {
            $current = $res->check_in->copy()->startOfDay();
            $end     = $res->check_out->copy()->startOfDay();
            while ($current->lt($end)) {
                $blocked[] = $current->format('Y-m-d');
                $current->addDay();
            }
        }

        return response()->json([
            'blocked'         => array_values(array_unique($blocked)),
            'price_per_night' => (float) ($room->price_per_night ?? 0),
            'currency'        => $room->currency ?? 'EUR',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'room_id'      => 'required|exists:rooms,id',
            'check_in'     => 'required|date|after_or_equal:today',
            'check_out'    => 'required|date|after:check_in',
            'adults'       => 'required|integer|min:1|max:8',
            'children'     => 'required|integer|min:0|max:6',
            'guest_name'   => 'required|string|max:255',
            'guest_email'  => 'required|email|max:255',
            'guest_phone'  => 'nullable|string|max:50',
            'guest_country'=> 'nullable|string|max:100',
            'guest_notes'  => 'nullable|string|max:2000',
        ]);

        // Re-check availability atomically
        $overlap = Reservation::where('room_id', $data['room_id'])
            ->whereNotIn('status', ['cancelled'])
            ->where('check_in', '<', $data['check_out'])
            ->where('check_out', '>', $data['check_in'])
            ->exists();

        if ($overlap) {
            return response()->json([
                'message' => 'Das Zimmer ist für diesen Zeitraum leider nicht verfügbar.',
            ], 422);
        }

        $room   = Room::find($data['room_id']);
        $nights = Carbon::parse($data['check_in'])->diffInDays(Carbon::parse($data['check_out']));
        $pricePn = (float) ($room->price_per_night ?? 0);

        // Sequential confirmation number (safe for low-volume boutique hotel)
        $year = now()->year;
        $seq  = Reservation::whereYear('created_at', $year)->lockForUpdate()->count() + 1;
        $confirmationNumber = 'OL-' . $year . '-' . str_pad($seq, 4, '0', STR_PAD_LEFT);

        $reservation = Reservation::create([
            ...$data,
            'confirmation_number' => $confirmationNumber,
            'price_per_night'     => $pricePn,
            'total_price'         => round($nights * $pricePn, 2),
            'currency'            => 'EUR',
            'status'              => 'pending',
            'channel'             => 'direct',
        ]);

        return response()->json([
            'confirmation_number' => $reservation->confirmation_number,
            'guest_name'  => $reservation->guest_name,
            'room_name'   => $room->name_de ?? $room->name_en,
            'check_in'    => $reservation->check_in->format('d.m.Y'),
            'check_out'   => $reservation->check_out->format('d.m.Y'),
            'nights'      => $nights,
            'total_price' => $reservation->total_price,
            'currency'    => $reservation->currency,
        ], 201);
    }
}
