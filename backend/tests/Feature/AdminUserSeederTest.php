<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminUserSeederTest extends TestCase
{
    use RefreshDatabase;

    private const OLD_PUBLIC_PASSWORD = 'olympos2024!';

    public function test_creates_the_admin_with_the_configured_password(): void
    {
        config(['admin.email' => 'owner@example.com', 'admin.password' => 'from-the-environment']);

        $this->seed(AdminUserSeeder::class);

        $admin = User::where('email', 'owner@example.com')->firstOrFail();
        $this->assertTrue(Hash::check('from-the-environment', $admin->password));
    }

    public function test_reseeding_never_resets_an_existing_admin_password(): void
    {
        config(['admin.email' => 'owner@example.com', 'admin.password' => 'from-the-environment']);
        User::factory()->create(['email' => 'owner@example.com', 'password' => 'changed-in-the-panel']);

        $this->seed(AdminUserSeeder::class);

        $admin = User::where('email', 'owner@example.com')->firstOrFail();
        $this->assertTrue(Hash::check('changed-in-the-panel', $admin->password));
        $this->assertSame(1, User::count());
    }

    public function test_without_a_configured_password_it_never_falls_back_to_the_old_public_one(): void
    {
        config(['admin.password' => null]);

        $this->seed(AdminUserSeeder::class);

        foreach (User::all() as $user) {
            $this->assertFalse(Hash::check(self::OLD_PUBLIC_PASSWORD, $user->password));
        }
    }

    public function test_in_production_without_a_configured_password_no_admin_is_created(): void
    {
        config(['admin.password' => null]);
        $this->app['env'] = 'production';

        // Called directly: `db:seed` asks for confirmation in production.
        $this->app->make(AdminUserSeeder::class)->run();

        $this->assertSame(0, User::count());
    }
}
