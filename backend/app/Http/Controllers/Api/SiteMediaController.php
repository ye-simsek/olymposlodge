<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteMedia;
use Illuminate\Http\JsonResponse;

class SiteMediaController extends Controller
{
    public function index(): JsonResponse
    {
        $media = SiteMedia::orderBy('group')->orderBy('sort_order')->get();

        return response()->json(
            $media->pluck('url', 'key')
        );
    }
}
