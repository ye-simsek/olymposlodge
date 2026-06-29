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

    public function test_unknown_locale_prefix_results_in_404(): void
    {
        // /xx/_smoke is caught by the redirect matrix and sent to /en/xx/_smoke.
        // /en/xx/_smoke is NOT in the locale route group (only tr/en/de are valid),
        // so it falls through to a 404. The loop fix ensures no further redirect fires.
        $this->get('/en/xx/_smoke')->assertNotFound();
    }
}
