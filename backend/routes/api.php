<?php

use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\SiteMediaController;
use App\Http\Controllers\Api\TranslationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/rooms', [RoomController::class, 'index']);
    Route::get('/rooms/{slug}', [RoomController::class, 'show']);

    Route::get('/translations', [TranslationController::class, 'index']);
    Route::get('/translations/{lang}', [TranslationController::class, 'show']);

    Route::get('/media', [SiteMediaController::class, 'index']);

    Route::get('/blog', [BlogPostController::class, 'index']);
    Route::get('/blog/{slug}', [BlogPostController::class, 'show']);

    Route::post('/newsletter/subscribe', [NewsletterController::class, 'store']);
    Route::post('/contact', [ContactController::class, 'store']);

    Route::get('/availability', [ReservationController::class, 'checkAvailability']);
    Route::get('/calendar', [ReservationController::class, 'calendar']);
    Route::post('/reservations', [ReservationController::class, 'store']);

    Route::post('/chat', [ChatController::class, 'send']);
});
