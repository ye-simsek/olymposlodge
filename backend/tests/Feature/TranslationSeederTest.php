<?php

namespace Tests\Feature;

use App\Models\Translation;
use Database\Seeders\TranslationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Regression guard for TranslationSeeder completeness.
 *
 * These tests MUST fail before the seeder fix and pass after.
 * They seed the REAL TranslationSeeder — not artificial rows.
 */
class TranslationSeederTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(TranslationSeeder::class);
    }

    // ── P1(a): experiences merge ──────────────────────────────────────────────

    public function test_experiences_has_intro_p1_from_first_block(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'experiences')->where('key', 'intro_p1')->exists(),
            'experiences.intro_p1 is missing — first experiences block was overwritten by the duplicate key.'
        );
    }

    public function test_experiences_has_ch2_s_location_label_from_second_block(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'experiences')->where('key', 'ch2_s_location_label')->exists(),
            'experiences.ch2_s_location_label is missing — second experiences block was lost.'
        );
    }

    public function test_experiences_namespace_has_both_blocks_merged(): void
    {
        // Both keys must exist simultaneously (proves the merge, not one-or-the-other)
        $this->assertTrue(
            Translation::where('namespace', 'experiences')->where('key', 'intro_p1')->exists() &&
            Translation::where('namespace', 'experiences')->where('key', 'ch2_s_location_label')->exists(),
            'experiences namespace must contain BOTH intro_p1 (block 1) AND ch2_s_location_label (block 2).'
        );
    }

    // ── P1(b): missing namespaces ─────────────────────────────────────────────

    public function test_activities_namespace_has_representative_key(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'activities')->where('key', 'tekne_title')->exists(),
            'activities.tekne_title is missing — activities namespace was not seeded.'
        );
    }

    public function test_lodge_namespace_has_representative_key(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'lodge')->where('key', 'spa_title')->exists(),
            'lodge.spa_title is missing — lodge namespace was not seeded.'
        );
    }

    public function test_spa_namespace_has_representative_key(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'spa')->where('key', 'hero_title')->exists(),
            'spa.hero_title is missing — spa namespace was not seeded.'
        );
    }

    // ── P1(b): missing nav keys ───────────────────────────────────────────────

    public function test_nav_activities_key_exists(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'nav')->where('key', 'activities')->exists(),
            'nav.activities is missing from the seeder.'
        );
    }

    public function test_nav_at_lodge_key_exists(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'nav')->where('key', 'at_lodge')->exists(),
            'nav.at_lodge is missing from the seeder.'
        );
    }

    public function test_nav_menu_key_exists(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'nav')->where('key', 'menu')->exists(),
            'nav.menu is missing from the seeder.'
        );
    }

    // ── P1(b): missing meta keys ──────────────────────────────────────────────

    public function test_meta_activities_title_key_exists(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'meta')->where('key', 'activities_title')->exists(),
            'meta.activities_title is missing from the seeder.'
        );
    }

    public function test_meta_lodge_title_key_exists(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'meta')->where('key', 'lodge_title')->exists(),
            'meta.lodge_title is missing from the seeder.'
        );
    }

    public function test_meta_spa_title_key_exists(): void
    {
        $this->assertTrue(
            Translation::where('namespace', 'meta')->where('key', 'spa_title')->exists(),
            'meta.spa_title is missing from the seeder.'
        );
    }

    // ── Value correctness ─────────────────────────────────────────────────────

    public function test_meta_activities_title_has_correct_english_value(): void
    {
        $row = Translation::where('namespace', 'meta')->where('key', 'activities_title')->first();
        $this->assertNotNull($row, 'meta.activities_title row does not exist.');
        $this->assertSame('Activities – Olympos Lodge', $row->en);
    }

    public function test_spa_hero_title_has_correct_english_value(): void
    {
        $row = Translation::where('namespace', 'spa')->where('key', 'hero_title')->first();
        $this->assertNotNull($row, 'spa.hero_title row does not exist.');
        $this->assertSame('Spa', $row->en);
    }

    // ── End-to-end: page receives real translated values ──────────────────────

    public function test_activities_page_receives_real_translated_tekne_title(): void
    {
        $this->get('/en/activities')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Activities')
                ->where('translations.activities.tekne_title', 'Boat Trip')
            );
    }

    public function test_spa_page_receives_real_translated_hero_title(): void
    {
        $this->get('/en/spa')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Spa')
                ->where('translations.spa.hero_title', 'Spa')
            );
    }
}
