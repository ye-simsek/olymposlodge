<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        $record = $this->getRecord();

        return array_filter([
            $record->id !== 1
                ? Actions\DeleteAction::make()
                    ->requiresConfirmation()
                    ->modalHeading('Delete user')
                    ->modalDescription('Are you sure? This action cannot be undone.')
                    ->modalSubmitActionLabel('Yes, delete')
                : null,
        ]);
    }
}
