<?php

namespace App\Support;

use App\Models\Translation;

class TranslationRepository
{
    public const FALLBACK = 'en';

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
            : $raw;
    }
}
