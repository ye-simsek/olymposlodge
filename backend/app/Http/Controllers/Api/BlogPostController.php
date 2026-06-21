<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;

class BlogPostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = BlogPost::published()
            ->orderByDesc('published_at')
            ->get(['id', 'slug', 'title_tr', 'title_en', 'title_de',
                   'excerpt_tr', 'excerpt_en', 'excerpt_de',
                   'cover_image', 'author', 'tags', 'published_at']);

        return response()->json($posts);
    }

    public function show(string $slug): JsonResponse
    {
        $post = BlogPost::published()->where('slug', $slug)->firstOrFail();

        return response()->json($post);
    }
}
