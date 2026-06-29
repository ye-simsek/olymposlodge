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

    public function test_unknown_locale_prefix_is_redirected(): void
    {
        // Task 4: the 301 redirect matrix catches any prefix-less path (incl. unknown
        // locale prefixes like /xx/*) and redirects to the canonical locale.
        $this->get('/xx/_smoke')->assertRedirect('/en/xx/_smoke');
    }
}
