<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="alternate icon" href="/favicon.ico" sizes="any">
    {{-- Brand fonts are self-hosted (resources/css/fonts.css). Preload the two faces
         that paint first: body copy and headings. --}}
    <link rel="preload" as="font" type="font/woff2" href="/fonts/cormorant-garamond-300-normal-latin.woff2" crossorigin>
    <link rel="preload" as="font" type="font/woff2" href="/fonts/dm-sans-300-normal-latin.woff2" crossorigin>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
