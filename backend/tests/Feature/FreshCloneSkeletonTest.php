<?php

namespace Tests\Feature;

use Tests\TestCase;

/**
 * A fresh clone must contain the framework's writable directories, otherwise
 * `composer install` dies with "Please provide a valid cache path".
 */
class FreshCloneSkeletonTest extends TestCase
{
    public function test_framework_storage_directories_ship_with_placeholders(): void
    {
        foreach (['cache', 'cache/data', 'sessions', 'testing', 'views'] as $dir) {
            $this->assertFileExists(
                storage_path("framework/{$dir}/.gitignore"),
                "storage/framework/{$dir} has no .gitignore placeholder, so git will not create it on clone."
            );
        }
    }

    public function test_root_gitignore_does_not_swallow_the_placeholders(): void
    {
        $rootIgnore = file_get_contents(base_path('../.gitignore'));

        foreach (['cache', 'sessions', 'testing', 'views'] as $dir) {
            $this->assertDoesNotMatchRegularExpression(
                '#^backend/storage/framework/'.$dir.'/$#m',
                $rootIgnore,
                "Root .gitignore ignores backend/storage/framework/{$dir}/ wholesale, which hides its placeholder."
            );
        }
    }
}
