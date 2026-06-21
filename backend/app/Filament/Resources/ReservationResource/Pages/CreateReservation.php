<?php

namespace App\Filament\Resources\ReservationResource\Pages;

use App\Filament\Resources\ReservationResource;
use App\Models\Reservation;
use Filament\Resources\Pages\CreateRecord;

class CreateReservation extends CreateRecord
{
    protected static string $resource = ReservationResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $year = now()->year;
        $seq  = Reservation::whereYear('created_at', $year)->count() + 1;
        $data['confirmation_number'] = 'OL-' . $year . '-' . str_pad($seq, 4, '0', STR_PAD_LEFT);
        $data['channel'] ??= 'phone';
        $data['status']  ??= 'confirmed';
        return $data;
    }
}
