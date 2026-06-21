<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TranslationResource\Pages;
use App\Models\Translation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TranslationResource extends Resource
{
    protected static ?string $model = Translation::class;
    protected static ?string $navigationIcon = 'heroicon-o-language';
    protected static ?string $navigationLabel = 'Translations';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(2)->schema([
                Forms\Components\TextInput::make('namespace')->disabled(),
                Forms\Components\TextInput::make('key')->disabled(),
            ]),
            Forms\Components\Textarea::make('tr')->label('Türkçe')->rows(5)->required(),
            Forms\Components\Textarea::make('en')->label('English')->rows(5)->required(),
            Forms\Components\Textarea::make('de')->label('Deutsch')->rows(5)->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('namespace')
                    ->badge()->sortable()->searchable(),
                Tables\Columns\TextColumn::make('key')
                    ->searchable()->sortable(),
                Tables\Columns\TextColumn::make('tr')
                    ->label('TR')->limit(60)->searchable(),
                Tables\Columns\TextColumn::make('en')
                    ->label('EN')->limit(60)->searchable(),
                Tables\Columns\TextColumn::make('de')
                    ->label('DE')->limit(60)->searchable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('namespace')
                    ->options(fn () => Translation::query()
                        ->distinct()
                        ->pluck('namespace', 'namespace')
                        ->toArray()
                    ),
            ])
            ->defaultSort('namespace')
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTranslations::route('/'),
            'edit'  => Pages\EditTranslation::route('/{record}/edit'),
        ];
    }
}
