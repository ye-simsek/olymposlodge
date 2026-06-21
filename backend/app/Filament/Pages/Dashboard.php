<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\StatsOverview;

class Dashboard extends \Filament\Pages\Dashboard
{
    public function getWidgets(): array
    {
        return [
            StatsOverview::class,
        ];
    }

    public function getColumns(): int | string | array
    {
        return 1;
    }
}
