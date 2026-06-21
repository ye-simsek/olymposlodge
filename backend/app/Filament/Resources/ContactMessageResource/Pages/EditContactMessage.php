<?php

namespace App\Filament\Resources\ContactMessageResource\Pages;

use App\Filament\Resources\ContactMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditContactMessage extends EditRecord
{
    protected static string $resource = ContactMessageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('reply')
                ->label('Reply by E-Mail')
                ->icon('heroicon-o-paper-airplane')
                ->color('success')
                ->url(fn () => "mailto:{$this->record->email}?subject=Re: {$this->record->subject}")
                ->openUrlInNewTab(),
            Actions\DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        // Auto-mark as read when opened in edit view
        if ($this->record->status === 'new') {
            $this->record->update(['status' => 'read']);
        }
    }
}
