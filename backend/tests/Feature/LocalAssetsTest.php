<?php

namespace Tests\Feature;

use Symfony\Component\Finder\Finder;
use Tests\TestCase;

/**
 * The site must not depend on files hosted by the old WordPress install: the
 * moment the domain points at this app those URLs stop existing.
 */
class LocalAssetsTest extends TestCase
{
    private function sources(): Finder
    {
        return Finder::create()->files()
            ->in([resource_path('js'), resource_path('css'), database_path('seeders')])
            ->name(['*.tsx', '*.ts', '*.css', '*.php', '*.json'])
            ->notName('*.test.*');
    }

    public function test_nothing_is_hotlinked_from_the_wordpress_site(): void
    {
        $offenders = [];
        foreach ($this->sources() as $file) {
            if (str_contains($file->getContents(), 'wp-content')) {
                $offenders[] = $file->getRelativePathname();
            }
        }

        $this->assertSame([], $offenders, 'These files still reference wp-content URLs.');
    }

    public function test_every_referenced_local_image_exists(): void
    {
        $missing = [];
        foreach ($this->sources() as $file) {
            preg_match_all('#/images/[A-Za-z0-9_./-]+\.(?:webp|jpe?g|png|svg)#', $file->getContents(), $m);
            foreach (array_unique($m[0]) as $path) {
                if (! is_file(public_path(ltrim($path, '/')))) {
                    $missing[] = $file->getRelativePathname().' -> '.$path;
                }
            }
        }

        $this->assertSame([], $missing, 'Referenced images that are not in public/.');
    }
}
