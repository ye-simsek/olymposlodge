<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Blog';
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Meta')->schema([
                Forms\Components\Grid::make(2)->schema([
                    Forms\Components\TextInput::make('slug')
                        ->required()->unique(ignoreRecord: true)->maxLength(200),
                    Forms\Components\TextInput::make('author')->default('Olympos Lodge'),
                ]),
                Forms\Components\Grid::make(3)->schema([
                    Forms\Components\TextInput::make('title_tr')->label('Title (TR)')->required(),
                    Forms\Components\TextInput::make('title_en')->label('Title (EN)')->required(),
                    Forms\Components\TextInput::make('title_de')->label('Title (DE)')->required(),
                ]),
                Forms\Components\Grid::make(3)->schema([
                    Forms\Components\Textarea::make('excerpt_tr')->label('Excerpt (TR)')->rows(2),
                    Forms\Components\Textarea::make('excerpt_en')->label('Excerpt (EN)')->rows(2),
                    Forms\Components\Textarea::make('excerpt_de')->label('Excerpt (DE)')->rows(2),
                ]),
                Forms\Components\Grid::make(2)->schema([
                    Forms\Components\TextInput::make('cover_image')->label('Cover Image URL')->url(),
                    Forms\Components\TagsInput::make('tags')->label('Tags')->separator(','),
                ]),
                Forms\Components\Grid::make(2)->schema([
                    Forms\Components\DateTimePicker::make('published_at')->label('Publish Date'),
                    Forms\Components\Toggle::make('is_published')->label('Published')->default(false),
                ]),
            ]),

            Forms\Components\Section::make('Content')->schema([
                Forms\Components\Tabs::make('Language')->tabs([
                    Forms\Components\Tabs\Tab::make('Türkçe')->schema([
                        Forms\Components\RichEditor::make('content_tr')
                            ->label('')
                            ->toolbarButtons(['bold', 'italic', 'link', 'bulletList', 'orderedList', 'h2', 'h3', 'blockquote']),
                    ]),
                    Forms\Components\Tabs\Tab::make('English')->schema([
                        Forms\Components\RichEditor::make('content_en')
                            ->label('')
                            ->toolbarButtons(['bold', 'italic', 'link', 'bulletList', 'orderedList', 'h2', 'h3', 'blockquote']),
                    ]),
                    Forms\Components\Tabs\Tab::make('Deutsch')->schema([
                        Forms\Components\RichEditor::make('content_de')
                            ->label('')
                            ->toolbarButtons(['bold', 'italic', 'link', 'bulletList', 'orderedList', 'h2', 'h3', 'blockquote']),
                    ]),
                ])->columnSpanFull(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('published_at')
                    ->label('Date')->date('Y-m-d')->sortable(),
                Tables\Columns\TextColumn::make('title_en')->label('Title')->searchable()->limit(50),
                Tables\Columns\TextColumn::make('author')->badge()->color('gray'),
                Tables\Columns\IconColumn::make('is_published')->boolean()->label('Published'),
            ])
            ->defaultSort('published_at', 'desc')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Status')
                    ->trueLabel('Published')
                    ->falseLabel('Draft'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('publish')
                        ->label('Publish selected')
                        ->icon('heroicon-o-check-circle')
                        ->action(fn ($records) => $records->each->update(['is_published' => true, 'published_at' => now()])),
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit'   => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
