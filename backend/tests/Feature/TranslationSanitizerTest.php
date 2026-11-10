<?php

namespace Tests\Feature;

use App\Models\Translation;
use App\Support\TranslationRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * A few translations are rendered as HTML (line breaks, emphasis). They are
 * editable in the admin panel, so anything beyond that small allowlist is removed.
 */
class TranslationSanitizerTest extends TestCase
{
    use RefreshDatabase;

    private function value(string $stored): mixed
    {
        Translation::updateOrCreate(
            ['namespace' => 'footer', 'key' => 'address'],
            ['tr' => $stored, 'en' => $stored, 'de' => $stored],
        );

        return (new TranslationRepository())->forLocale('en', ['footer'])['footer']['address'];
    }

    public function test_line_breaks_and_emphasis_are_kept(): void
    {
        $this->assertSame('Ulupınar<br>Çıralı <em>Kemer</em> <strong>Antalya</strong>', $this->value('Ulupınar<br>Çıralı <em>Kemer</em> <strong>Antalya</strong>'));
    }

    public function test_scripts_and_other_tags_are_removed(): void
    {
        $clean = $this->value('Hello<script>alert(1)</script> <img src=x onerror=alert(1)> <a href="javascript:alert(1)">x</a>');

        $this->assertStringNotContainsString('<script', $clean);
        $this->assertStringNotContainsString('<img', $clean);
        $this->assertStringNotContainsString('<a', $clean);
        $this->assertStringNotContainsString('alert(1)</script>', $clean);
    }

    public function test_attributes_on_allowed_tags_are_removed(): void
    {
        $this->assertSame('<em>x</em><br>', $this->value('<em onmouseover="alert(1)" style="x">x</em><br class="y" />'));
    }

    public function test_a_plain_class_on_emphasis_is_kept_for_the_accent_word(): void
    {
        $this->assertSame(
            'An <em class="accent-word">emerald</em> valley',
            $this->value('An <em class="accent-word" onclick="alert(1)">emerald</em> valley'),
        );
        $this->assertSame('<em>x</em>', $this->value('<em class="a&quot;b" id="q">x</em>'));
    }

    public function test_plain_text_and_structured_values_are_untouched(): void
    {
        $this->assertSame('Rooms & Suites: 5 < 6', $this->value('Rooms & Suites: 5 < 6'));

        Translation::create(['namespace' => 'weather', 'key' => 'days', 'tr' => '["Pz","Pt"]', 'en' => '["Su","Mo"]', 'de' => '["So","Mo"]']);
        $this->assertSame(['Su', 'Mo'], (new TranslationRepository())->forLocale('en', ['weather'])['weather']['days']);
    }
}
