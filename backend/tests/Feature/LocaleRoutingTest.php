<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LocaleRoutingTest extends TestCase
{
    public function test_locale_prefix_sets_app_locale(): void
    {
        $this->get('/de/_smoke')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->where('locale', 'de'));
    }

    public function test_unknown_locale_prefix_is_not_found(): void
    {
        $this->get('/xx/_smoke')->assertNotFound();
    }
}
