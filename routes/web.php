<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SeaweedTypeController;
use App\Http\Controllers\ProcessingMethodController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\UmkmController;

// ==========================================
// PUBLIC ROUTES
// ==========================================

Route::get('/', function () {
    return Inertia::render('landingPage/home-page');
})->name('home');

Route::get('/time-line', function () {
    return Inertia::render('timeLine/time-line');
})->name('timeLine');

Route::get('/products', [ProductController::class, 'productIndex'])->name('products.index');
Route::get('/seaweed-type', [SeaweedTypeController::class, 'userIndex'])->name('seaweed-type.public.index');
Route::get('/user/processing-methods', [ProcessingMethodController::class, 'publicIndex'])->name('processing-methods.public.index');

// UMKM Routes (Public)
Route::get('/umkm', [UmkmController::class, 'index'])->name('umkm.index');
Route::post('/umkm/contact', [UmkmController::class, 'store'])->name('umkm.contact.store');

// ==========================================
// AUTHENTICATED USER ROUTES
// ==========================================

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// ==========================================
// ADMIN AUTH ROUTES
// ==========================================

Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});

// ==========================================
// ADMIN PROTECTED ROUTES
// ==========================================

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Products Management
    Route::resource('products', ProductController::class);

    // Seaweed Types Management
    Route::prefix('seaweed-types')->name('seaweed-types.')->group(function () {
        Route::get('/', [SeaweedTypeController::class, 'index'])->name('index');
        Route::get('/create', [SeaweedTypeController::class, 'create'])->name('create');
        Route::post('/', [SeaweedTypeController::class, 'store'])->name('store');
        Route::get('/{seaweedType}/edit', [SeaweedTypeController::class, 'edit'])->name('edit');
        Route::put('/{seaweedType}', [SeaweedTypeController::class, 'update'])->name('update');
        Route::delete('/{seaweedType}', [SeaweedTypeController::class, 'destroy'])->name('destroy');
    });

    // Processing Methods Management
    Route::prefix('processing-methods')->name('processing-methods.')->group(function () {
        Route::get('/', [ProcessingMethodController::class, 'index'])->name('index');
        Route::get('/create', [ProcessingMethodController::class, 'create'])->name('create');
        Route::post('/', [ProcessingMethodController::class, 'store'])->name('store');
        Route::get('/{processingMethod}/edit', [ProcessingMethodController::class, 'edit'])->name('edit');
        Route::put('/{processingMethod}', [ProcessingMethodController::class, 'update'])->name('update');
        Route::delete('/{processingMethod}', [ProcessingMethodController::class, 'destroy'])->name('destroy');
    });
});

// ==========================================
// INCLUDE OTHER ROUTE FILES
// ==========================================

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';