<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->json('texts_tr')->nullable()->after('tagline_de');
            $table->json('texts_en')->nullable()->after('texts_tr');
            $table->json('texts_de')->nullable()->after('texts_en');
        });
    }

    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropColumn(['texts_tr', 'texts_en', 'texts_de']);
        });
    }
};
