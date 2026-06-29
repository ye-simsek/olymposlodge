<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\PageProps;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaticPageController extends Controller
{
    public function __invoke(Request $request): Response
    {
        /** @var array{component: string, namespaces: array<int, string>} $page */
        $page = $request->route()->defaults['page'];

        return Inertia::render($page['component'], [
            'translations' => PageProps::translations($page['namespaces']),
        ]);
    }
}
