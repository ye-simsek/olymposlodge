<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ChatLogResource\Pages;
use App\Models\ChatLog;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ChatLogResource extends Resource
{
    protected static ?string $model = ChatLog::class;
    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationLabel = 'Chat Logs';
    protected static ?string $navigationGroup = 'Analytics';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('created_at')
                    ->label('Time')
                    ->dateTime('Y-m-d H:i')
                    ->sortable(),

                TextColumn::make('language')
                    ->label('Language')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'de'  => 'info',
                        'en'  => 'success',
                        'tr'  => 'warning',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'de'  => '🇩🇪 DE',
                        'en'  => '🇬🇧 EN',
                        'tr'  => '🇹🇷 TR',
                        default => $state ?? '—',
                    }),

                TextColumn::make('user_message')
                    ->label('Guest Message')
                    ->limit(80)
                    ->tooltip(fn ($record) => $record->user_message)
                    ->searchable(),

                TextColumn::make('bot_response')
                    ->label('Response')
                    ->formatStateUsing(fn ($state) =>
                        \Illuminate\Support\Str::markdown(
                            \Illuminate\Support\Str::limit($state ?? '', 120),
                            ['html_input' => 'escape', 'allow_unsafe_links' => false]
                        )
                    )
                    ->html()
                    ->tooltip(fn ($record) => $record->bot_response)
                    ->color('gray'),

                TextColumn::make('conversation_id')
                    ->label('Conversation')
                    ->formatStateUsing(fn ($state) => substr($state, 0, 8) . '…')
                    ->color('gray')
                    ->copyable()
                    ->copyMessage('UUID copied'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('language')
                    ->label('Language')
                    ->options([
                        'de' => '🇩🇪 German',
                        'en' => '🇬🇧 English',
                        'tr' => '🇹🇷 Turkish',
                    ]),

                Filter::make('today')
                    ->label('Today')
                    ->query(fn (Builder $query) => $query->whereDate('created_at', today())),

                Filter::make('this_week')
                    ->label('This Week')
                    ->query(fn (Builder $query) => $query->where('created_at', '>=', now()->startOfWeek())),

                Filter::make('this_month')
                    ->label('This Month')
                    ->query(fn (Builder $query) => $query->where('created_at', '>=', now()->startOfMonth())),
            ])
            ->actions([
                Tables\Actions\Action::make('view_conversation')
                    ->label('View conversation')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->color('gray')
                    ->modalHeading(fn ($record) => 'Conversation · ' . $record->created_at->format('Y-m-d H:i'))
                    ->modalContent(fn ($record) => view('filament.chat-conversation', [
                        'logs' => ChatLog::where('conversation_id', $record->conversation_id)
                            ->orderBy('created_at')
                            ->get(),
                    ]))
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Close'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->poll('30s');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListChatLogs::route('/'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }
}
