<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RoomResource\Pages;
use App\Models\Room;
use App\Models\SiteMedia;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class RoomResource extends Resource
{
    protected static ?string $model = Room::class;
    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationLabel = 'Rooms';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Basic Information')->schema([
                Forms\Components\Grid::make(2)->schema([
                    Forms\Components\TextInput::make('slug')
                        ->required()->unique(ignoreRecord: true)->maxLength(100),
                    Forms\Components\TextInput::make('key_prefix')
                        ->maxLength(10)->helperText('Used for i18n texts (asd, sd, dx, ge, an, st)'),
                ]),
                Forms\Components\Grid::make(3)->schema([
                    Forms\Components\TextInput::make('name_tr')->label('Name (TR)')->required(),
                    Forms\Components\TextInput::make('name_en')->label('Name (EN)')->required(),
                    Forms\Components\TextInput::make('name_de')->label('Name (DE)')->required(),
                ]),
                Forms\Components\Grid::make(3)->schema([
                    Forms\Components\TextInput::make('tagline_tr')->label('Tagline (TR)'),
                    Forms\Components\TextInput::make('tagline_en')->label('Tagline (EN)'),
                    Forms\Components\TextInput::make('tagline_de')->label('Tagline (DE)'),
                ]),
                Forms\Components\Grid::make(3)->schema([
                    Forms\Components\Textarea::make('description_tr')->label('Description (TR)')->rows(3),
                    Forms\Components\Textarea::make('description_en')->label('Description (EN)')->rows(3),
                    Forms\Components\Textarea::make('description_de')->label('Description (DE)')->rows(3),
                ]),
                Forms\Components\Grid::make(4)->schema([
                    Forms\Components\TextInput::make('capacity')->numeric()->default(2),
                    Forms\Components\TextInput::make('size_sqm')->numeric()->label('Size (m²)'),
                    Forms\Components\TextInput::make('bed_type')->default('Queen'),
                    Forms\Components\Select::make('view')->options([
                        'garden'     => 'Garden View',
                        'lake'       => 'Lake View',
                        'garden_sea' => 'Garden & Sea',
                    ]),
                ]),
                Forms\Components\Grid::make(3)->schema([
                    Forms\Components\TextInput::make('price_per_night')
                        ->label('Price / Night (€)')
                        ->numeric()
                        ->prefix('€')
                        ->step(0.01),
                    Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
                    Forms\Components\Toggle::make('is_active')->default(true)->columnSpan(1),
                ]),
            ]),

            Forms\Components\Section::make('Editorial Texts')->schema([
                Forms\Components\Tabs::make('Language')->tabs([
                    Forms\Components\Tabs\Tab::make('Türkçe')->schema([
                        Forms\Components\Textarea::make('texts_tr.p1')->label('Paragraph 1')->rows(4),
                        Forms\Components\Textarea::make('texts_tr.p2')->label('Paragraph 2')->rows(4),
                        Forms\Components\Textarea::make('texts_tr.p3')->label('Amenities text')->rows(4),
                        Forms\Components\Textarea::make('texts_tr.p4')->label('Closing quote')->rows(4),
                    ]),
                    Forms\Components\Tabs\Tab::make('English')->schema([
                        Forms\Components\Textarea::make('texts_en.p1')->label('Paragraph 1')->rows(4),
                        Forms\Components\Textarea::make('texts_en.p2')->label('Paragraph 2')->rows(4),
                        Forms\Components\Textarea::make('texts_en.p3')->label('Amenities text')->rows(4),
                        Forms\Components\Textarea::make('texts_en.p4')->label('Closing quote')->rows(4),
                    ]),
                    Forms\Components\Tabs\Tab::make('Deutsch')->schema([
                        Forms\Components\Textarea::make('texts_de.p1')->label('Paragraph 1')->rows(4),
                        Forms\Components\Textarea::make('texts_de.p2')->label('Paragraph 2')->rows(4),
                        Forms\Components\Textarea::make('texts_de.p3')->label('Amenities text')->rows(4),
                        Forms\Components\Textarea::make('texts_de.p4')->label('Closing quote')->rows(4),
                    ]),
                ]),
            ]),

            Forms\Components\Section::make('Images')->columns(2)->schema(
                self::imageFields()
            ),

            Forms\Components\Section::make('Amenities')->schema([
                Forms\Components\CheckboxList::make('amenities')
                    ->label('')
                    ->columns(3)
                    ->options([
                        'amenity_ac'                 => 'Air Conditioning',
                        'amenity_terrace'            => 'Private Terrace',
                        'amenity_veranda'            => 'Private Veranda',
                        'amenity_sea'                => 'Sea View',
                        'amenity_garden'             => 'Garden View',
                        'amenity_lake'               => 'Lake View',
                        'amenity_fireplace'          => 'Fireplace',
                        'amenity_jacuzzi'            => 'Jacuzzi',
                        'amenity_rain_shower'        => 'Rain Shower',
                        'amenity_rain_shower_in_out' => 'Indoor & Outdoor Rain Shower',
                        'amenity_espresso'           => 'Espresso Machine',
                        'amenity_kettle'             => 'Kettle',
                        'amenity_minibar'            => 'Minibar',
                        'amenity_safe'               => 'Safe',
                        'amenity_wifi'               => 'Free Wi-Fi',
                        'amenity_furniture'          => 'Handcrafted Furniture',
                    ]),
            ]),
        ]);
    }

    private static function mediaOptions(): array
    {
        return SiteMedia::orderBy('group')->orderBy('label')
            ->get()
            ->groupBy('group')
            ->flatMap(fn ($items, $group) =>
                $items->mapWithKeys(fn ($m) => [$m->url => "[{$group}] {$m->label}"])
            )
            ->toArray();
    }

    private static function imageField(string $key, string $label, bool $fullWidth = false): Forms\Components\Component
    {
        $options = fn () => self::mediaOptions();
        return Forms\Components\Select::make($key)
            ->label($label)
            ->options($options)
            ->searchable()
            ->allowHtml(false)
            ->columnSpan($fullWidth ? 2 : 1)
            ->suffixAction(
                Forms\Components\Actions\Action::make("open_{$key}")
                    ->icon('heroicon-o-arrow-top-right-on-square')
                    ->url(fn (Forms\Get $get) => $get($key) ?: null)
                    ->openUrlInNewTab()
                    ->visible(fn (Forms\Get $get) => (bool) $get($key))
            );
    }

    private static function imageFields(): array
    {
        return [
            self::imageField('images.hero',      'Hero Image',           fullWidth: true),
            self::imageField('images.full1',     'Full Photo 1'),
            self::imageField('images.full2',     'Full Photo 2'),
            self::imageField('images.ed1_inset', 'Editorial 1 – Inset'),
            self::imageField('images.ed1_right', 'Editorial 1 – Right'),
            self::imageField('images.ed2_inset', 'Editorial 2 – Inset'),
            self::imageField('images.ed2_right', 'Editorial 2 – Right'),
            self::imageField('images.strip.0',   'Strip Image 1'),
            self::imageField('images.strip.1',   'Strip Image 2'),
            self::imageField('images.strip.2',   'Strip Image 3'),
        ];
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sort_order')->label('#')->sortable(),
                Tables\Columns\TextColumn::make('name_en')->label('Room')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('view')->badge(),
                Tables\Columns\TextColumn::make('size_sqm')->label('m²'),
                Tables\Columns\TextColumn::make('capacity'),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([
                Tables\Actions\DeleteBulkAction::make(),
            ])]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListRooms::route('/'),
            'create' => Pages\CreateRoom::route('/create'),
            'edit'   => Pages\EditRoom::route('/{record}/edit'),
        ];
    }
}
