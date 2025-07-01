<?php

namespace App\Http\Controllers;

use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UmkmController extends Controller
{
    /**
     * Display the UMKM main page
     */
    public function index(Request $request)
    {
        // Jika ada parameter filter dari frontend, tampilkan daftar UMKM dengan filter
        if ($request->has('category') || $request->has('search')) {
            return $this->getFilteredUmkms($request);
        }

        // Ambil statistik real dari database
        $stats = [
            'total_umkm' => Umkm::where('is_active', true)->count(),
            'total_products' => $this->getTotalProducts(),
            'certified_halal' => Umkm::where('is_active', true)->where('is_verified', true)->count(),
            'revenue_increase' => 45 // Data statis untuk persentase peningkatan
        ];

        // Ambil UMKM unggulan untuk Programs Section (6 UMKM teratas berdasarkan rating)
        $featured_umkms = Umkm::where('is_active', true)
            ->orderBy('rating', 'desc')
            ->orderBy('is_verified', 'desc') // Prioritaskan yang terverifikasi
            ->take(6)
            ->get();

        // Ambil data kategori dengan jumlah UMKM
        $categories = Umkm::getCategoryStats();

        // Data produk unggulan (bisa diambil dari database atau tetap statis)
        $featured_products = [
            [
                'name' => 'Keripik Rumput Laut',
                'description' => 'Keripik rumput laut dengan berbagai varian rasa',
                'price' => 'Rp 25.000',
                'image' => '/images/products/keripik-rumput-laut.jpg'
            ],
            [
                'name' => 'Dodol Rumput Laut',
                'description' => 'Dodol tradisional dengan campuran rumput laut',
                'price' => 'Rp 15.000',
                'image' => '/images/products/dodol-rumput-laut.jpg'
            ],
            [
                'name' => 'Selai Rumput Laut',
                'description' => 'Selai sehat kaya nutrisi dari rumput laut',
                'price' => 'Rp 20.000',
                'image' => '/images/products/selai-rumput-laut.jpg'
            ]
        ];

        // Tampilkan halaman utama UMKM dengan data dari database
        return Inertia::render('umkm/umkm-page', [
            'stats' => $stats,
            'featured_products' => $featured_products,
            'featured_umkms' => $featured_umkms, // Data UMKM untuk Programs Section
            'categories' => $categories // Data kategori untuk quick links
        ]);
    }

    /**
     * Get filtered UMKMs for listing page
     */
    public function getFilteredUmkms(Request $request)
    {
        $query = Umkm::where('is_active', true);

        // Filter berdasarkan kategori
        if ($request->filled('category') && $request->category !== 'Semua') {
            $query->where('category', $request->category);
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('owner', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
                  
                // Search dalam products array (JSON)
                // Untuk MySQL
                if (DB::connection()->getDriverName() === 'mysql') {
                    $q->orWhereRaw('JSON_SEARCH(products, "one", ?) IS NOT NULL', ["%{$search}%"]);
                }
                // Untuk SQLite (fallback)
                else {
                    $q->orWhereRaw('products LIKE ?', ["%{$search}%"]);
                }
            });
        }

        $umkms = $query->latest()->paginate(12);

        // Ambil data untuk filter kategori
        $categories = Umkm::getCategoryStats();

        return Inertia::render('umkm/umkm-list', [
            'umkms' => $umkms,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search']),
        ]);
    }

    /**
     * Display specific UMKM detail
     */
    public function show(Umkm $umkm)
    {
        // Pastikan UMKM aktif
        if (!$umkm->is_active) {
            abort(404, 'UMKM tidak ditemukan atau sedang tidak aktif.');
        }

        return Inertia::render('umkm/umkm-detail', [
            'umkm' => $umkm,
            'related_umkms' => Umkm::where('is_active', true)
                ->where('category', $umkm->category)
                ->where('id', '!=', $umkm->id)
                ->take(4)
                ->get()
        ]);
    }

    /**
     * API endpoint untuk filter berdasarkan kategori
     */
    public function getByCategory(Request $request)
    {
        $category = $request->get('category');
        
        $query = Umkm::where('is_active', true);
        
        if ($category && $category !== 'Semua') {
            $query->where('category', $category);
        }

        $umkms = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $umkms,
            'total' => $umkms->count()
        ]);
    }

    /**
     * Store contact form submission
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:1000',
            'umkm_id' => 'nullable|exists:umkms,id'
        ]);

        // Log untuk debugging atau simpan ke database jika diperlukan
        \Log::info('UMKM Contact Form Submitted:', $validated);
        
        // Opsional: Simpan ke database contact_messages jika tabel ada
        // ContactMessage::create($validated);
        
        return back()->with('success', 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
    }

    /**
     * Helper method untuk menghitung total produk
     */
    private function getTotalProducts()
    {
        $umkms = Umkm::where('is_active', true)->get();
        $totalProducts = 0;
        
        foreach ($umkms as $umkm) {
            if (is_array($umkm->products)) {
                $totalProducts += count($umkm->products);
            }
        }
        
        return $totalProducts;
    }
}