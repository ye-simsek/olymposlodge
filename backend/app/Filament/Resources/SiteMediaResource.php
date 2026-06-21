<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteMediaResource\Pages;
use App\Models\SiteMedia;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SiteMediaResource extends Resource
{
    protected static ?string $model = SiteMedia::class;
    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationLabel = 'Media';
    protected static ?string $modelLabel = 'Media Item';
    protected static ?string $pluralModelLabel = 'Media';
    protected static ?int $navigationSort = 3;

    private static array $groupOptions = [
        'hero'    => 'Hero',
        'gallery' => 'Gallery',
        'story'   => 'Story / Philosophy',
        'pages'   => 'Pages',
    ];

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(3)->schema([
                Forms\Components\Select::make('group')
                    ->label('Group')
                    ->options(self::$groupOptions)
                    ->required(),
                Forms\Components\TextInput::make('label')
                    ->label('Label')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('sort_order')
                    ->label('Sort Order')
                    ->numeric()
                    ->default(0),
            ]),
            Forms\Components\TextInput::make('url')
                ->label('URL')
                ->required()
                ->url()
                ->maxLength(2048)
                ->columnSpanFull()
                ->placeholder('https://... oder /pfad/zur/datei.jpg'),
            Forms\Components\TextInput::make('key')
                ->label('Key')
                ->required()
                ->unique(ignoreRecord: true)
                ->maxLength(100)
                ->helperText('Used by the system, e.g. gallery.1 or hero.poster'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('group')
                    ->label('Group')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'hero'    => 'danger',
                        'gallery' => 'info',
                        'story'   => 'success',
                        'pages'   => 'warning',
                        default   => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => self::$groupOptions[$state] ?? $state)
                    ->sortable(),
                Tables\Columns\TextColumn::make('label')
                    ->label('Label')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('url')
                    ->label('URL')
                    ->limit(60)
                    ->tooltip(fn ($record) => $record->url)
                    ->url(fn ($record) => $record->url, true)
                    ->color('primary'),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable()
                    ->alignCenter(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('group')
                    ->label('Group')
                    ->options(self::$groupOptions),
            ])
            ->defaultSort('group')
            ->reorderable('sort_order')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListSiteMedia::route('/'),
            'create' => Pages\CreateSiteMedia::route('/create'),
            'edit'   => Pages\EditSiteMedia::route('/{record}/edit'),
        ];
    }
}
