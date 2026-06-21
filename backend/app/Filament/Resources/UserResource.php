<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Users';
    protected static ?string $modelLabel = 'User';
    protected static ?string $pluralModelLabel = 'Users';
    protected static ?int $navigationSort = 10;

    // The primary admin account must never be deleted
    private const PROTECTED_ID = 1;

    public static function form(Form $form): Form
    {
        $isEdit = $form->getOperation() === 'edit';

        return $form->schema([
            Forms\Components\Grid::make(2)->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('email')
                    ->label('E-Mail')
                    ->email()
                    ->required()
                    ->unique(User::class, 'email', ignoreRecord: true)
                    ->maxLength(255),

                Forms\Components\TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->revealable()
                    ->required(!$isEdit)
                    ->dehydrated(fn ($state) => filled($state))
                    ->helperText($isEdit ? 'Leave blank to keep the current password.' : null)
                    ->maxLength(255),

                Forms\Components\TextInput::make('password_confirmation')
                    ->label('Confirm Password')
                    ->password()
                    ->revealable()
                    ->required(!$isEdit)
                    ->dehydrated(false)
                    ->same('password')
                    ->helperText($isEdit ? 'Only fill in if changing the password.' : null)
                    ->maxLength(255),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->sortable()
                    ->alignCenter()
                    ->width('60px'),

                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->label('E-Mail')
                    ->searchable()
                    ->sortable()
                    ->copyable(),

                Tables\Columns\IconColumn::make('is_protected')
                    ->label('Protected')
                    ->boolean()
                    ->alignCenter()
                    ->getStateUsing(fn ($record) => $record->id === self::PROTECTED_ID)
                    ->trueIcon('heroicon-o-lock-closed')
                    ->trueColor('warning')
                    ->falseIcon('')
                    ->tooltip(fn ($record) => $record->id === self::PROTECTED_ID ? 'Primary account — cannot be deleted' : null),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('Y-m-d H:i')
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),

                Tables\Actions\DeleteAction::make()
                    ->hidden(fn ($record) => $record->id === self::PROTECTED_ID)
                    ->requiresConfirmation()
                    ->modalHeading('Delete user')
                    ->modalDescription('Are you sure? This action cannot be undone.')
                    ->modalSubmitActionLabel('Yes, delete'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->action(function ($records) {
                            $records->reject(fn ($r) => $r->id === self::PROTECTED_ID)
                                ->each->delete();
                        }),
                ]),
            ])
            ->defaultSort('id');
    }

    public static function canDelete(Model $record): bool
    {
        return $record->id !== self::PROTECTED_ID;
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit'   => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
