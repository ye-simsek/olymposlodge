<?php

namespace Tests\Feature;

use App\Filament\Resources\TranslationResource\Pages\EditTranslation;
use App\Models\Translation;
use App\Models\User;
use Database\Seeders\TranslationSeeder;
use Filament\Facades\Filament;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

/**
 * The deploy checklist re-runs TranslationSeeder. That must add new keys and
 * refresh untouched defaults, but never wipe copy the lodge edited in the panel.
 */
class TranslationSeedingSafetyTest extends TestCase
{
    use RefreshDatabase;

    private function navHome(): Translation
    {
        return Translation::where('namespace', 'nav')->where('key', 'home')->firstOrFail();
    }

    public function test_copy_edited_in_the_admin_panel_survives_a_reseed(): void
    {
        $this->seed(TranslationSeeder::class);
        $this->actingAs(User::factory()->create());
        Filament::setCurrentPanel(Filament::getPanel('admin'));

        Livewire::test(EditTranslation::class, ['record' => $this->navHome()->getRouteKey()])
            ->fillForm(['en' => 'Welcome'])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->seed(TranslationSeeder::class);

        $this->assertSame('Welcome', $this->navHome()->en);
        $this->assertNotNull($this->navHome()->customized_at);
    }

    public function test_untouched_defaults_are_still_refreshed_by_a_reseed(): void
    {
        $this->seed(TranslationSeeder::class);
        // An old default that was never edited by a person.
        $this->navHome()->forceFill(['en' => 'Old default'])->saveQuietly();

        $this->seed(TranslationSeeder::class);

        $this->assertSame('Home', $this->navHome()->en);
    }
}
