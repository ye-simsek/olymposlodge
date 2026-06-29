<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class NotFoundTest extends TestCase
{
    use RefreshDatabase;

    public function test_unknown_locale_path_renders_inertia_notfound_with_404(): void
    {
        $this->get('/en/this-page-does-not-exist')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page
                ->component('NotFound')
                ->where('locale', 'en')
                ->has('seo'));
    }

    public function test_api_404_stays_json(): void
    {
        // /api/* darf NICHT als Inertia-Page beantwortet werden
        $this->getJson('/api/v1/this-does-not-exist')->assertNotFound();
    }

    public function test_admin_path_is_not_rendered_as_inertia_notfound(): void
    {
        // Filament behält sein eigenes 404/Redirect-Verhalten — unsere
        // NotFound-Inertia-Page darf /admin/* NICHT übernehmen.
        $response = $this->get('/admin/definitely-not-a-filament-page');
        $response->assertDontSee('"component":"NotFound"', false);
    }
}
