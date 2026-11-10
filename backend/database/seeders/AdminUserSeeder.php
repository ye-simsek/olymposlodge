<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    /**
     * Creates the first admin once. An existing account is never modified, so
     * re-running the seeders cannot reset a password that was changed later.
     */
    public function run(): void
    {
        $email = config('admin.email');

        if (User::where('email', $email)->exists()) {
            return;
        }

        $password = config('admin.password');

        if (! $password) {
            if (app()->environment('production')) {
                $this->command?->warn('ADMIN_PASSWORD is not set: no admin user created. Run `php artisan make:filament-user`.');

                return;
            }

            // Local/testing convenience: a one-off random password, shown once.
            $password = Str::password(20);
            $this->command?->warn("Created {$email} with a generated password: {$password}");
        }

        User::create([
            'name' => 'Admin',
            'email' => $email,
            'password' => $password, // hashed by the model cast
        ]);
    }
}
