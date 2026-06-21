<?php

namespace App\Filament\Resources\SiteMediaResource\Pages;

use App\Filament\Resources\SiteMediaResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSiteMedia extends EditRecord
{
    protected static string $resource = SiteMediaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
