<?php

namespace App\Support;

use App\Models\Translation;

class TranslationRepository
{
    public const FALLBACK = 'en';

    private const ALLOWED_TAGS = ['br', 'em', 'strong', 'i', 'b'];

    /**
     * @param  array<int, string>  $namespaces
     * @return array<string, array<string, mixed>>
     */
    public function forLocale(string $locale, array $namespaces): array
    {
        $rows = Translation::query()
            ->whereIn('namespace', $namespaces)
            ->orderBy('namespace')->orderBy('sort_order')->orderBy('key')
            ->get();

        $result = [];

        foreach ($rows as $row) {
            $raw = $row->{$locale} ?? $row->{self::FALLBACK};
            $result[$row->namespace][$row->key] = $this->decode($raw);
        }

        return $result;
    }

    private function decode(?string $raw): mixed
    {
        if ($raw === null) {
            return null;
        }

        $decoded = json_decode($raw, true);

        return (json_last_error() === JSON_ERROR_NONE && (is_array($decoded)))
            ? $decoded
            : $this->sanitize($raw);
    }

    /**
     * A handful of strings are rendered as HTML for line breaks and emphasis
     * (footer address, story headings). They are editable in the admin panel,
     * so only those tags survive, without attributes. Text without any markup
     * is returned untouched.
     */
    private function sanitize(string $value): string
    {
        if (! preg_match('/<[a-zA-Z\/!]/', $value)) {
            return $value;
        }

        // Drop script/style blocks including their content, then every tag outside the allowlist.
        $value = preg_replace('#<(script|style)\b[^>]*>.*?</\1\s*>#is', '', $value) ?? $value;
        $value = strip_tags($value, self::ALLOWED_TAGS);

        // Strip attributes from the tags that remain: <em onclick="..."> becomes <em>.
        // A plain class name is kept on emphasis tags, because the story headings
        // mark their accent word with <em class="accent-word">.
        return preg_replace_callback(
            '#<(/?)(br|em|strong|i|b)\b([^>]*)>#i',
            static function (array $m): string {
                $class = '';
                if ($m[1] === '' && strtolower($m[2]) !== 'br'
                    && preg_match('/\bclass\s*=\s*"([a-z0-9 _-]+)"/i', $m[3], $c)) {
                    $class = ' class="'.$c[1].'"';
                }

                return '<'.$m[1].$m[2].$class.'>';
            },
            $value,
        ) ?? $value;
    }
}
