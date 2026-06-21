<?php

namespace App\Filament\Widgets;

use App\Models\ChatLog;
use App\Models\ContactMessage;
use App\Models\NewsletterSubscriber;
use App\Models\Room;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $unreadMessages = ContactMessage::where('status', 'new')->count();
        $todayChats     = ChatLog::whereDate('created_at', today())->count();
        $activeRooms    = Room::where('is_active', true)->count();
        $subscribers    = NewsletterSubscriber::where('is_active', true)->count();

        return [
            Stat::make('Unread Messages', $unreadMessages)
                ->description('Contact form submissions')
                ->descriptionIcon('heroicon-o-envelope')
                ->color($unreadMessages > 0 ? 'danger' : 'success')
                ->url('/admin/contact-messages?tableFilters[status][value]=new'),

            Stat::make('Chats today', $todayChats)
                ->description('AI assistant conversations')
                ->descriptionIcon('heroicon-o-chat-bubble-left-right')
                ->color('info'),

            Stat::make('Active Rooms', $activeRooms)
                ->description('Published on the website')
                ->descriptionIcon('heroicon-o-home')
                ->color('success'),

            Stat::make('Newsletter', $subscribers)
                ->description('Active subscribers')
                ->descriptionIcon('heroicon-o-users')
                ->color('warning'),
        ];
    }
}
