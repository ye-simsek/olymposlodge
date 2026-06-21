<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReservationResource\Pages;
use App\Models\Reservation;
use App\Models\Room;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Carbon;

class ReservationResource extends Resource
{
    protected static ?string $model = Reservation::class;
    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';
    protected static ?string $navigationLabel = 'Reservations';
    protected static ?string $modelLabel = 'Reservation';
    protected static ?string $pluralModelLabel = 'Reservations';
    protected static ?int $navigationSort = 1;

    private static array $statusColors = [
        'pending'     => 'warning',
        'confirmed'   => 'success',
        'cancelled'   => 'danger',
        'checked_in'  => 'info',
        'checked_out' => 'gray',
    ];

    private static array $statusLabels = [
        'pending'     => 'Pending',
        'confirmed'   => 'Confirmed',
        'cancelled'   => 'Cancelled',
        'checked_in'  => 'Checked In',
        'checked_out' => 'Checked Out',
    ];

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Stay')->schema([
                Forms\Components\Grid::make(2)->schema([
                    Forms\Components\Select::make('room_id')
                        ->label('Room')
                        ->options(fn () => Room::orderBy('sort_order')->pluck('name_en', 'id'))
                        ->required()
                        ->searchable(),
                    Forms\Components\Select::make('status')
                        ->label('Status')
                        ->options(self::$statusLabels)
                        ->required(),
                    Forms\Components\DatePicker::make('check_in')
                        ->label('Check-in')
                        ->required()
                        ->native(false)
                        ->displayFormat('Y-m-d'),
                    Forms\Components\DatePicker::make('check_out')
                        ->label('Check-out')
                        ->required()
                        ->native(false)
                        ->displayFormat('Y-m-d'),
                    Forms\Components\TextInput::make('adults')
                        ->label('Adults')
                        ->numeric()
                        ->default(2)
                        ->minValue(1)
                        ->required(),
                    Forms\Components\TextInput::make('children')
                        ->label('Children')
                        ->numeric()
                        ->default(0)
                        ->minValue(0),
                ]),
            ]),

            Forms\Components\Section::make('Pricing')->schema([
                Forms\Components\Grid::make(3)->schema([
                    Forms\Components\TextInput::make('price_per_night')
                        ->label('Price / Night (€)')
                        ->numeric()
                        ->prefix('€'),
                    Forms\Components\TextInput::make('total_price')
                        ->label('Total Price (€)')
                        ->numeric()
                        ->prefix('€'),
                    Forms\Components\Select::make('channel')
                        ->label('Channel')
                        ->options([
                            'direct'      => 'Direct (Website)',
                            'phone'       => 'Phone',
                            'booking_com' => 'Booking.com',
                            'airbnb'      => 'Airbnb',
                            'other'       => 'Other',
                        ])
                        ->required(),
                ]),
            ]),

            Forms\Components\Section::make('Guest Details')->schema([
                Forms\Components\Grid::make(2)->schema([
                    Forms\Components\TextInput::make('guest_name')->label('Name')->required(),
                    Forms\Components\TextInput::make('guest_email')->label('E-Mail')->email()->required(),
                    Forms\Components\TextInput::make('guest_phone')->label('Phone'),
                    Forms\Components\TextInput::make('guest_country')->label('Country'),
                ]),
                Forms\Components\Textarea::make('guest_notes')
                    ->label('Guest Special Requests')
                    ->rows(3)
                    ->columnSpanFull(),
            ]),

            Forms\Components\Section::make('Internal Notes')->schema([
                Forms\Components\Textarea::make('internal_notes')
                    ->label('Internal Notes (admin only)')
                    ->rows(3)
                    ->columnSpanFull(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('confirmation_number')
                    ->label('Ref.')
                    ->searchable()
                    ->copyable()
                    ->fontFamily('mono'),

                Tables\Columns\TextColumn::make('room.name_en')
                    ->label('Room')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('guest_name')
                    ->label('Guest')
                    ->searchable()
                    ->description(fn ($record) => $record->guest_email),

                Tables\Columns\TextColumn::make('check_in')
                    ->label('Check-in')
                    ->date('Y-m-d')
                    ->sortable(),

                Tables\Columns\TextColumn::make('check_out')
                    ->label('Check-out')
                    ->date('Y-m-d')
                    ->sortable(),

                Tables\Columns\TextColumn::make('nights')
                    ->label('Nights')
                    ->alignCenter()
                    ->getStateUsing(fn ($record) => $record->check_in->diffInDays($record->check_out)),

                Tables\Columns\TextColumn::make('total_price')
                    ->label('Total')
                    ->money('EUR')
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state) => self::$statusColors[$state] ?? 'gray')
                    ->formatStateUsing(fn (string $state) => self::$statusLabels[$state] ?? $state),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options(self::$statusLabels),
                Tables\Filters\SelectFilter::make('room_id')
                    ->label('Room')
                    ->options(fn () => Room::orderBy('sort_order')->pluck('name_en', 'id')),
            ])
            ->actions([
                Tables\Actions\Action::make('confirm')
                    ->label('Confirm')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->action(fn ($record) => $record->update(['status' => 'confirmed'])),

                Tables\Actions\Action::make('cancel')
                    ->label('Cancel')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->visible(fn ($record) => in_array($record->status, ['pending', 'confirmed']))
                    ->action(fn ($record) => $record->update(['status' => 'cancelled'])),

                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListReservations::route('/'),
            'create' => Pages\CreateReservation::route('/create'),
            'edit'   => Pages\EditReservation::route('/{record}/edit'),
        ];
    }
}
