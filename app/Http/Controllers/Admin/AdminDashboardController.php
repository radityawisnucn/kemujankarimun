<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\SeaweedType;
use App\Models\ProcessingMethod;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/AdminDashboard', [
            'totalProduk' => Product::count(),
            'jenisRumputLaut' => SeaweedType::count(),
            'metodePengolahan' => ProcessingMethod::count(),
            'aktivitas' => DB::table('admin_activities') // ✅ ganti dari activity_logs ke table yang ada
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get(['id', 'description', 'created_at']),
        ]);
    }
}
