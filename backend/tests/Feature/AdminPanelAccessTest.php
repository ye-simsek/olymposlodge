<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_open_the_admin_panel_in_production(): void
    {
        config(['app.env' => 'production']);

        $this->actingAs(User::factory()->create())
            ->get('/admin')
            ->assertOk();
    }

    public function test_guests_are_sent_to_the_admin_login(): void
    {
        config(['app.env' => 'production']);

        $this->get('/admin')->assertRedirect('/admin/login');
    }
}
