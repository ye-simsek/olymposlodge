<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- Scroll-reveal styles only hide content under html.js, so the page stays
         readable if the script bundle fails to load. --}}
    <script>document.documentElement.classList.add('js')</script>
@if (config('services.gtm.id'))
    {{-- Consent Mode v2: everything is denied until the visitor opts in through the
         cookie bar. This MUST stay above the Tag Manager loader. A saved choice is
         restored straight away so returning visitors are not tracked less than they allowed. --}}
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500,
        });
        try {
            var saved = JSON.parse(localStorage.getItem('ol_cookie_consent') || 'null');
            if (saved) {
                gtag('consent', 'update', {
                    analytics_storage: saved.analytics ? 'granted' : 'denied',
                    ad_storage: saved.marketing ? 'granted' : 'denied',
                    ad_user_data: saved.marketing ? 'granted' : 'denied',
                    ad_personalization: saved.marketing ? 'granted' : 'denied',
                });
            }
        } catch (e) {}
    </script>
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', @json(config('services.gtm.id')));
    </script>
@endif
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
