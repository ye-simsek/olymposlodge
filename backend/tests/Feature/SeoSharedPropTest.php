<?php

namespace Tests\Feature;

use App\Models\Translation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SeoSharedPropTest extends TestCase
{
    use RefreshDatabase;

    public function test_seo_prop_has_canonical_and_alternates_for_current_path(): void
    {
        $this->get('/de/_smoke')
            ->assertInertia(fn (Assert $page) => $page
                ->where('seo.canonical', fn ($url) => str_ends_with($url, '/de/_smoke'))
                ->where('seo.alternates.en', fn ($url) => str_ends_with($url, '/en/_smoke'))
                ->where('seo.alternates.tr', fn ($url) => str_ends_with($url, '/tr/_smoke'))
                ->where('seo.alternates.de', fn ($url) => str_ends_with($url, '/de/_smoke'))
                ->where('seo.alternates.x-default', fn ($url) => str_ends_with($url, '/en/_smoke'))
            );
    }
}
