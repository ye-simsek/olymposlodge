<?php

namespace App\Filament\Resources\ChatLogResource\Pages;

use App\Filament\Resources\ChatLogResource;
use App\Models\ChatLog;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Components\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListChatLogs extends ListRecords
{
    protected static string $resource = ChatLogResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }

    public function getTabs(): array
    {
        return [
            'all' => Tab::make('All')
                ->badge(ChatLog::count()),

            'today' => Tab::make('Today')
                ->modifyQueryUsing(fn (Builder $q) => $q->whereDate('created_at', today()))
                ->badge(ChatLog::whereDate('created_at', today())->count()),

            'week' => Tab::make('This Week')
                ->modifyQueryUsing(fn (Builder $q) => $q->where('created_at', '>=', now()->startOfWeek()))
                ->badge(ChatLog::where('created_at', '>=', now()->startOfWeek())->count()),

            'de' => Tab::make('🇩🇪 DE')
                ->modifyQueryUsing(fn (Builder $q) => $q->where('language', 'de'))
                ->badge(ChatLog::where('language', 'de')->count()),

            'en' => Tab::make('🇬🇧 EN')
                ->modifyQueryUsing(fn (Builder $q) => $q->where('language', 'en'))
                ->badge(ChatLog::where('language', 'en')->count()),

            'tr' => Tab::make('🇹🇷 TR')
                ->modifyQueryUsing(fn (Builder $q) => $q->where('language', 'tr'))
                ->badge(ChatLog::where('language', 'tr')->count()),
        ];
    }
}
