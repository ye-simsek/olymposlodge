<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Set when a translation is edited in the admin panel. TranslationSeeder
     * leaves such rows alone, so a deploy cannot wipe the lodge's own copy.
     */
    public function up(): void
    {
        Schema::table('translations', function (Blueprint $table) {
            $table->timestamp('customized_at')->nullable()->after('sort_order');
        });
    }

    public function down(): void
    {
        Schema::table('translations', function (Blueprint $table) {
            $table->dropColumn('customized_at');
        });
    }
};
