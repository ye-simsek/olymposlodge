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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name_tr');
            $table->string('name_en');
            $table->string('name_de');
            $table->text('description_tr');
            $table->text('description_en');
            $table->text('description_de');
            $table->string('tagline_tr')->nullable();
            $table->string('tagline_en')->nullable();
            $table->string('tagline_de')->nullable();
            $table->integer('capacity')->default(2);
            $table->integer('size_sqm')->nullable();
            $table->string('bed_type')->default('Queen');
            $table->string('view')->nullable();
            $table->decimal('price_per_night', 10, 2)->nullable();
            $table->string('currency', 3)->default('EUR');
            $table->string('key_prefix', 10)->nullable();
            $table->json('amenities')->nullable();
            $table->json('images')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
