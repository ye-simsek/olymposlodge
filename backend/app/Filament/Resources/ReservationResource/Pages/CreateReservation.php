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
        $data['confirmation_number'] = Reservation::nextConfirmationNumber();
        $data['channel'] ??= 'phone';
        $data['status']  ??= 'confirmed';
        return $data;
    }
}
