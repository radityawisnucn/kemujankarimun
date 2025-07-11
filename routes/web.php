<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SeaweedTypeController;
use App\Http\Controllers\ProcessingMethodController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\UmkmController;
use App\Http\Controllers\Admin\UmkmController as AdminUmkmController;
use Illuminate\Http\Request;

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

// ==========================================
// UMKM ROUTES (PUBLIC) - UPDATED
// ==========================================

// Route utama UMKM - halaman landing
Route::get('/umkm', [UmkmController::class, 'index'])->name('umkm.index');

// Route untuk daftar UMKM dengan filter (URL baru sesuai permintaan)
Route::get('/umkm/list-umkm', [UmkmController::class, 'listUmkm'])->name('umkm.list');

// Route untuk halaman program kerja (BARU)
Route::get('/umkm/program-kerja', function () {
    return Inertia::render('umkm/program-kerja');
})->name('umkm.program-kerja');

// Route legacy untuk backward compatibility (redirect ke route baru)
Route::get('/umkm/list', function(Request $request) {
    return redirect()->route('umkm.list', $request->all());
})->name('umkm.list.legacy');

// Route detail UMKM
Route::get('/umkm/{umkm}', [UmkmController::class, 'show'])->name('umkm.show');

// Route untuk contact form
Route::post('/umkm/contact', [UmkmController::class, 'store'])->name('umkm.contact.store');

// ==========================================
// API ROUTES untuk UMKM (BARU)
// ==========================================

// API untuk mendapatkan UMKM berdasarkan kategori dengan limit
Route::get('/api/umkm/category/{category?}', [UmkmController::class, 'getUmkmsByCategory'])->name('api.umkm.by-category');

// API untuk mendapatkan UMKM berdasarkan kategori (backward compatibility)
Route::get('/api/umkm/by-category', [UmkmController::class, 'getByCategory'])->name('api.umkm.category');

// API untuk statistik UMKM
Route::get('/api/umkm/stats', [UmkmController::class, 'getStats'])->name('api.umkm.stats');

// API untuk search UMKM (autocomplete)
Route::get('/api/umkm/search', [UmkmController::class, 'search'])->name('api.umkm.search');

// API untuk mendapatkan UMKM unggulan
Route::get('/api/umkm/featured', [UmkmController::class, 'getFeatured'])->name('api.umkm.featured');

// API untuk cek jam buka UMKM
Route::get('/api/umkm/{umkm}/opening-hours', [UmkmController::class, 'getOpeningHours'])->name('api.umkm.opening-hours');
Route::get('/api/umkm/{umkm}/is-open', [UmkmController::class, 'isCurrentlyOpen'])->name('api.umkm.is-open');

// API untuk export data (opsional)
Route::get('/api/umkm/export', [UmkmController::class, 'export'])->name('api.umkm.export');

// ==========================================
// AUTHENTICATED USER ROUTES
// ==========================================

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
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
    Route::prefix('products')->name('products.')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::get('/create', [ProductController::class, 'create'])->name('create');
        Route::post('/', [ProductController::class, 'store'])->name('store');
        Route::get('/{product}', [ProductController::class, 'show'])->name('show');
        Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('edit');
        Route::put('/{product}', [ProductController::class, 'update'])->name('update');
        Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');
    });

    // Seaweed Types Management
    Route::prefix('seaweed-types')->name('seaweed-types.')->group(function () {
        Route::get('/', [SeaweedTypeController::class, 'index'])->name('index');
        Route::get('/create', [SeaweedTypeController::class, 'create'])->name('create');
        Route::post('/', [SeaweedTypeController::class, 'store'])->name('store');
        Route::get('/{seaweedType}', [SeaweedTypeController::class, 'show'])->name('show');
        Route::get('/{seaweedType}/edit', [SeaweedTypeController::class, 'edit'])->name('edit');
        Route::put('/{seaweedType}', [SeaweedTypeController::class, 'update'])->name('update');
        Route::delete('/{seaweedType}', [SeaweedTypeController::class, 'destroy'])->name('destroy');
    });

    // Processing Methods Management
    Route::prefix('processing-methods')->name('processing-methods.')->group(function () {
        Route::get('/', [ProcessingMethodController::class, 'index'])->name('index');
        Route::get('/create', [ProcessingMethodController::class, 'create'])->name('create');
        Route::post('/', [ProcessingMethodController::class, 'store'])->name('store');
        Route::get('/{processingMethod}', [ProcessingMethodController::class, 'show'])->name('show');
        Route::get('/{processingMethod}/edit', [ProcessingMethodController::class, 'edit'])->name('edit');
        Route::put('/{processingMethod}', [ProcessingMethodController::class, 'update'])->name('update');
        Route::delete('/{processingMethod}', [ProcessingMethodController::class, 'destroy'])->name('destroy');
    });

    // UMKM Management - HANYA SATU DEFINISI
    Route::prefix('umkm')->name('umkm.')->group(function () {
        Route::get('/', [AdminUmkmController::class, 'index'])->name('index');
        Route::get('/create', [AdminUmkmController::class, 'create'])->name('create');
        Route::post('/', [AdminUmkmController::class, 'store'])->name('store');
        Route::get('/{umkm}', [AdminUmkmController::class, 'show'])->name('show');
        Route::get('/{umkm}/edit', [AdminUmkmController::class, 'edit'])->name('edit');
        Route::put('/{umkm}', [AdminUmkmController::class, 'update'])->name('update');
        Route::delete('/{umkm}', [AdminUmkmController::class, 'destroy'])->name('destroy');
        
        // Custom actions for UMKM - HANYA toggle-active
        Route::post('/{umkm}/toggle-active', [AdminUmkmController::class, 'toggleActive'])->name('toggle-active');
    });

    // ==========================================
    // ADMIN ROUTES untuk UMKM Contact (BARU)
    // ==========================================
    
    // Route untuk admin melihat pesan kontak
    Route::get('/umkm/contacts', [UmkmController::class, 'getContactMessages'])->name('umkm.contacts');
    Route::patch('/umkm/contacts/{contact}/read', [UmkmController::class, 'markContactAsRead'])->name('umkm.contacts.read');
});

// ==========================================
// INCLUDE OTHER ROUTE FILES
// ==========================================

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';