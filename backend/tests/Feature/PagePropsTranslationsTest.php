<?php

namespace Tests\Feature;

use App\Models\Translation;
use App\Support\PageProps;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PagePropsTranslationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_merges_global_and_page_namespaces(): void
    {
        Translation::create(['namespace' => 'nav', 'key' => 'home', 'en' => 'Home', 'de' => 'Start', 'sort_order' => 0]);
        Translation::create(['namespace' => 'home', 'key' => 'hero', 'en' => 'Hero', 'de' => 'Held', 'sort_order' => 0]);

        app()->setLocale('de');
        $result = (PageProps::translations(['home']))();

        // globaler NS 'nav' UND Page-NS 'home' vorhanden:
        $this->assertSame('Start', $result['nav']['home']);
        $this->assertSame('Held', $result['home']['hero']);
    }
}
