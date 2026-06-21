<?php

namespace App\Filament\Resources\SiteMediaResource\Pages;

use App\Filament\Resources\SiteMediaResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSiteMedia extends ListRecords
{
    protected static string $resource = SiteMediaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->label('Medium hinzufügen'),
        ];
    }
}
