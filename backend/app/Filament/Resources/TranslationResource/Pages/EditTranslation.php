<?php

namespace App\Filament\Resources\TranslationResource\Pages;

use App\Filament\Resources\TranslationResource;
use Filament\Resources\Pages\EditRecord;

class EditTranslation extends EditRecord
{
    protected static string $resource = TranslationResource::class;

    /**
     * Marks the row as edited by a person. TranslationSeeder skips marked rows,
     * so re-seeding on deploy keeps this text.
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['customized_at'] = now();

        return $data;
    }
}
