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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_tr');
            $table->string('title_en');
            $table->string('title_de');
            $table->text('excerpt_tr')->nullable();
            $table->text('excerpt_en')->nullable();
            $table->text('excerpt_de')->nullable();
            $table->longText('content_tr');
            $table->longText('content_en');
            $table->longText('content_de');
            $table->string('cover_image')->nullable();
            $table->string('author')->nullable();
            $table->json('tags')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
