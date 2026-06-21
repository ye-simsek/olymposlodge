<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Translation;
use Illuminate\Http\JsonResponse;

class TranslationController extends Controller
{
    public function index(): JsonResponse
    {
        $rows = Translation::orderBy('namespace')->orderBy('sort_order')->orderBy('key')->get();

        $result = ['tr' => [], 'en' => [], 'de' => []];

        foreach ($rows as $row) {
            $ns  = $row->namespace;
            $key = $row->key;

            foreach (['tr', 'en', 'de'] as $lang) {
                $raw     = $row->$lang;
                $decoded = json_decode($raw, true);
                $value   = (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_object($decoded)))
                    ? $decoded
                    : $raw;

                $result[$lang][$ns][$key] = $value;
            }
        }

        return response()->json($result)->header('Cache-Control', 'public, max-age=300');
    }

    public function show(string $lang): JsonResponse
    {
        if (! in_array($lang, ['tr', 'en', 'de'])) {
            return response()->json(['error' => 'Invalid language'], 400);
        }

        $rows   = Translation::orderBy('namespace')->orderBy('sort_order')->orderBy('key')->get();
        $result = [];

        foreach ($rows as $row) {
            $ns      = $row->namespace;
            $key     = $row->$lang === null ? $row->tr : $row->$lang;
            $raw     = $row->$lang ?? $row->tr;
            $decoded = json_decode($raw, true);
            $value   = (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_object($decoded)))
                ? $decoded
                : $raw;

            $result[$ns][$key] = $value;
        }

        return response()->json($result)->header('Cache-Control', 'public, max-age=300');
    }
}
