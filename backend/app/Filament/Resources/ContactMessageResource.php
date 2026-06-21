<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactMessageResource\Pages;
use App\Models\ContactMessage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;
    protected static ?string $navigationIcon = 'heroicon-o-envelope';
    protected static ?string $navigationLabel = 'Contact Messages';
    protected static ?string $navigationGroup = 'Analytics';
    protected static ?int $navigationSort = 2;

    public static function getNavigationBadge(): ?string
    {
        return (string) ContactMessage::where('status', 'new')->count() ?: null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'danger';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(2)->schema([
                Forms\Components\TextInput::make('name')->disabled(),
                Forms\Components\TextInput::make('email')->disabled(),
                Forms\Components\TextInput::make('phone')->disabled(),
                Forms\Components\TextInput::make('subject')->disabled(),
            ]),
            Forms\Components\Textarea::make('message')->disabled()->rows(6)->columnSpanFull(),
            Forms\Components\Grid::make(3)->schema([
                Forms\Components\Select::make('status')
                    ->options(['new' => 'New', 'read' => 'Read', 'replied' => 'Replied'])
                    ->required(),
                Forms\Components\TextInput::make('language')->disabled(),
                Forms\Components\TextInput::make('created_at')->label('Received')->disabled(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime('Y-m-d H:i')
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'danger'  => 'new',
                        'warning' => 'read',
                        'success' => 'replied',
                    ]),
                Tables\Columns\TextColumn::make('language')
                    ->badge()
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'de'    => '🇩🇪 DE',
                        'en'    => '🇬🇧 EN',
                        'tr'    => '🇹🇷 TR',
                        default => $state ?? '—',
                    }),
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('email')->searchable()->copyable(),
                Tables\Columns\TextColumn::make('subject')->limit(30),
                Tables\Columns\TextColumn::make('message')->limit(60)->tooltip(fn ($record) => $record->message),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(['new' => 'New', 'read' => 'Read', 'replied' => 'Replied']),
                Tables\Filters\SelectFilter::make('language')
                    ->options(['de' => 'German', 'en' => 'English', 'tr' => 'Turkish']),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Open'),
                Tables\Actions\Action::make('mark_read')
                    ->label('Mark read')
                    ->icon('heroicon-o-eye')
                    ->color('warning')
                    ->visible(fn ($record) => $record->status === 'new')
                    ->action(fn ($record) => $record->update(['status' => 'read'])),
                Tables\Actions\Action::make('reply')
                    ->label('Reply')
                    ->icon('heroicon-o-paper-airplane')
                    ->color('success')
                    ->url(fn ($record) => "mailto:{$record->email}?subject=Re: {$record->subject}")
                    ->openUrlInNewTab()
                    ->action(fn ($record) => $record->update(['status' => 'replied'])),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('mark_read')
                        ->label('Mark as read')
                        ->icon('heroicon-o-eye')
                        ->action(fn ($records) => $records->each->update(['status' => 'read'])),
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactMessages::route('/'),
            'edit'  => Pages\EditContactMessage::route('/{record}/edit'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }
}
