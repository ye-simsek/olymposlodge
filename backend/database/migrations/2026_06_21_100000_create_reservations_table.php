<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->string('confirmation_number', 20)->unique();
            $table->string('guest_name');
            $table->string('guest_email');
            $table->string('guest_phone', 50)->nullable();
            $table->string('guest_country', 100)->nullable();
            $table->date('check_in');
            $table->date('check_out');
            $table->tinyInteger('adults')->default(2);
            $table->tinyInteger('children')->default(0);
            $table->decimal('price_per_night', 8, 2)->default(0);
            $table->decimal('total_price', 10, 2)->default(0);
            $table->char('currency', 3)->default('EUR');
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'checked_in', 'checked_out'])->default('pending');
            $table->enum('channel', ['direct', 'phone', 'booking_com', 'airbnb', 'other'])->default('direct');
            $table->text('guest_notes')->nullable();
            $table->text('internal_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
