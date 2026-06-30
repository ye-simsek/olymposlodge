<?php

namespace Tests\Feature;

use App\Models\Translation;
use Database\Seeders\TranslationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Guard test: every key listed in tests/fixtures/i18n-source-keys.json
 * must have a corresponding Translation row after running the seeder.
 *
 * Run RED before the seeder fix, GREEN after.
 */
class TranslationCompletenessTest extends TestCase
{
    use RefreshDatabase;

    public function test_all_source_keys_are_seeded(): void
    {
        $this->seed(TranslationSeeder::class);

        $fixturePath = base_path('tests/fixtures/i18n-source-keys.json');
        $this->assertFileExists($fixturePath, 'Fixture file tests/fixtures/i18n-source-keys.json is missing.');

        $sourceKeys = json_decode(file_get_contents($fixturePath), true);
        $this->assertIsArray($sourceKeys, 'i18n-source-keys.json must decode to an array.');
        $this->assertNotEmpty($sourceKeys, 'i18n-source-keys.json must not be empty.');

        $missing = [];

        foreach ($sourceKeys as $dotKey) {
            [$namespace, $key] = explode('.', $dotKey, 2);

            $exists = Translation::where('namespace', $namespace)
                ->where('key', $key)
                ->exists();

            if (! $exists) {
                $missing[] = $dotKey;
            }
        }

        $this->assertEmpty(
            $missing,
            sprintf(
                "%d source key(s) missing from the seeder:\n  - %s",
                count($missing),
                implode("\n  - ", $missing)
            )
        );
    }
}
