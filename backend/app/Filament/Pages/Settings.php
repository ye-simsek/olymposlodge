<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class Settings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon  = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Settings';
    protected static string  $view            = 'filament.pages.settings';
    protected static ?int    $navigationSort  = 99;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'chat_system_prompt' => Setting::getValue('chat_system_prompt'),
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Chat Assistant')
                    ->schema([
                        Forms\Components\Textarea::make('chat_system_prompt')
                            ->label('System Prompt')
                            ->rows(30)
                            ->columnSpanFull()
                            ->helperText('Cache is cleared on save — changes take effect immediately. Leave empty to use the built-in default.'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();
        Setting::setValue('chat_system_prompt', $data['chat_system_prompt'] ?: null);

        Notification::make()
            ->title('Settings saved.')
            ->success()
            ->send();
    }
}
