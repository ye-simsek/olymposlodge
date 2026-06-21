<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsletterSubscriberResource\Pages;
use App\Models\NewsletterSubscriber;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Collection;

class NewsletterSubscriberResource extends Resource
{
    protected static ?string $model = NewsletterSubscriber::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Newsletter';
    protected static ?string $navigationGroup = 'Analytics';
    protected static ?int $navigationSort = 3;

    public static function getNavigationBadge(): ?string
    {
        return (string) NewsletterSubscriber::where('is_active', true)->count();
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'success';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(2)->schema([
                Forms\Components\TextInput::make('email')->email()->required(),
                Forms\Components\TextInput::make('name'),
                Forms\Components\Select::make('language')
                    ->options(['tr' => 'Türkçe', 'en' => 'English', 'de' => 'Deutsch']),
                Forms\Components\Toggle::make('is_active')->default(true),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Subscribed')
                    ->dateTime('Y-m-d')
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')->searchable()->copyable(),
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('language')
                    ->badge()
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'de'    => '🇩🇪 DE',
                        'en'    => '🇬🇧 EN',
                        'tr'    => '🇹🇷 TR',
                        default => $state ?? '—',
                    }),
                Tables\Columns\IconColumn::make('is_active')->boolean()->label('Active'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('language')
                    ->options(['de' => 'German', 'en' => 'English', 'tr' => 'Turkish']),
                Tables\Filters\TernaryFilter::make('is_active')->label('Status')
                    ->trueLabel('Active')->falseLabel('Unsubscribed'),
            ])
            ->headerActions([
                Tables\Actions\Action::make('export_csv')
                    ->label('Export CSV')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('gray')
                    ->action(function () {
                        $rows = NewsletterSubscriber::where('is_active', true)
                            ->orderBy('created_at', 'desc')
                            ->get(['email', 'name', 'language', 'consent_at', 'created_at']);

                        $csv = "email,name,language,consent_at,subscribed_at\n";
                        foreach ($rows as $r) {
                            $csv .= implode(',', [
                                '"' . $r->email . '"',
                                '"' . ($r->name ?? '') . '"',
                                $r->language ?? '',
                                $r->consent_at?->format('Y-m-d H:i') ?? '',
                                $r->created_at->format('Y-m-d H:i'),
                            ]) . "\n";
                        }

                        return response()->streamDownload(
                            fn () => print($csv),
                            'newsletter-subscribers-' . now()->format('Y-m-d') . '.csv',
                            ['Content-Type' => 'text/csv'],
                        );
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('toggle')
                    ->label(fn ($record) => $record->is_active ? 'Unsubscribe' : 'Reactivate')
                    ->icon(fn ($record) => $record->is_active ? 'heroicon-o-x-circle' : 'heroicon-o-check-circle')
                    ->color(fn ($record) => $record->is_active ? 'danger' : 'success')
                    ->action(fn ($record) => $record->update(['is_active' => !$record->is_active])),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('deactivate')
                        ->label('Unsubscribe selected')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->action(fn (Collection $records) => $records->each->update(['is_active' => false])),
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListNewsletterSubscribers::route('/'),
            'create' => Pages\CreateNewsletterSubscriber::route('/create'),
            'edit'   => Pages\EditNewsletterSubscriber::route('/{record}/edit'),
        ];
    }
}
