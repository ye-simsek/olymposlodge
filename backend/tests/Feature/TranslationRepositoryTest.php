<?php

namespace Tests\Feature;

use App\Models\Translation;
use App\Support\TranslationRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TranslationRepositoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_maps_rows_by_key_and_decodes_json(): void
    {
        Translation::create([
            'namespace' => 'nav', 'key' => 'home',
            'tr' => 'Ana Sayfa', 'en' => 'Home', 'de' => 'Start', 'sort_order' => 0,
        ]);
        Translation::create([
            'namespace' => 'nav', 'key' => 'items',
            'tr' => '["a","b"]', 'en' => '["a","b"]', 'de' => '["a","b"]', 'sort_order' => 1,
        ]);

        $result = (new TranslationRepository())->forLocale('de', ['nav']);

        // Schlüssel ist 'home' (key), NICHT 'Start' (übersetzter Text) — alter show()-Bug.
        $this->assertSame('Start', $result['nav']['home']);
        $this->assertSame(['a', 'b'], $result['nav']['items']);
    }

    public function test_falls_back_to_english_when_value_null(): void
    {
        Translation::create([
            'namespace' => 'nav', 'key' => 'only_en',
            'tr' => null, 'en' => 'EnglishValue', 'de' => null, 'sort_order' => 0,
        ]);

        $result = (new TranslationRepository())->forLocale('de', ['nav']);

        $this->assertSame('EnglishValue', $result['nav']['only_en']);
    }

    public function test_only_requested_namespaces_are_returned(): void
    {
        Translation::create(['namespace' => 'nav', 'key' => 'a', 'en' => '1', 'sort_order' => 0]);
        Translation::create(['namespace' => 'home', 'key' => 'b', 'en' => '2', 'sort_order' => 0]);

        $result = (new TranslationRepository())->forLocale('en', ['nav']);

        $this->assertArrayHasKey('nav', $result);
        $this->assertArrayNotHasKey('home', $result);
    }
}
