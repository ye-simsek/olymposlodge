<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InertiaSmokeTest extends TestCase
{
    public function test_smoke_route_renders_inertia_component_with_props(): void
    {
        $this->get('/en/_smoke')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Smoke')
                ->where('message', 'inertia-ok')
                ->where('locale', 'en')
            );
    }
}
