<?php

use App\Events\TestEvent;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FriendshipsController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Translation\MessageCatalogue;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');


    // GET RESOURCES
    Route::get('friends/show', [FriendshipsController::class, 'index'])
        ->name('friends.show');

    Route::get('rooms/show', [RoomController::class, 'index'])
        ->name('rooms.show');

    Route::get('messages/show', [MessagesController::class, 'index'])
        ->name('messages.show');

    // GET A SPECIFIC RESOURCE
    Route::get('room/{room}', [RoomController::class, 'show'])
        ->name('room.instance');


    //CREATE A RESOURCE (THE FORM)
    Route::get('create/message', [MessagesController::class, 'create'])
        ->name('messages.create');

    //SEND A MESSAGE
    Route::post('room/{room}/message', [RoomController::class, 'sendMessage'])
        ->name('room.sendMessage');

    Route::get('/test-broadcast', function () {
        broadcast(new TestEvent('Hello from Laravel!'));
        return 'Event broadcasted!';
    });
});
