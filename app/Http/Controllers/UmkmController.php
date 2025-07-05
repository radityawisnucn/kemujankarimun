<?php

namespace App\Http\Controllers;

use App\Models\Umkm;
use App\Models\UmkmContact;
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
     * Display the UMKM list page (untuk route /umkm/list-umkm)
     * Method baru yang ditambahkan
     */
    public function listUmkm(Request $request)
    {
        // Set default category ke 'Semua' jika tidak ada parameter
        if (!$request->has('category')) {
            $request->merge(['category' => 'Semua']);
        }
        
        // Gunakan method yang sudah ada untuk filtering
        return $this->getFilteredUmkms($request);
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
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
                  
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

        // Ordering: verified first, then by rating, then by latest
        $umkms = $query->orderBy('is_verified', 'desc')
                      ->orderBy('rating', 'desc')
                      ->latest()
                      ->paginate(12);

        // Ambil data untuk filter kategori
        $categories = Umkm::getCategoryStats();

        // Tentukan halaman yang akan di-render berdasarkan context
        $currentCategory = $request->get('category', 'Semua');
        $searchQuery = $request->get('search', '');
        
        return Inertia::render('umkm/umkm-list', [
            'umkms' => $umkms,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search']),
            'current_category' => $currentCategory,
            'search_query' => $searchQuery,
        ]);
    }

    /**
     * Display specific UMKM detail - ENHANCED VERSION
     */
    public function show(Umkm $umkm)
    {
        // Pastikan UMKM aktif
        if (!$umkm->is_active) {
            abort(404, 'UMKM tidak ditemukan atau sedang tidak aktif.');
        }

        // Ambil UMKM terkait (kategori sama, exclude current)
        $relatedUmkms = Umkm::where('is_active', true)
            ->where('category', $umkm->category)
            ->where('id', '!=', $umkm->id)
            ->orderBy('rating', 'desc')
            ->orderBy('is_verified', 'desc')
            ->take(4)
            ->get();

        // Tambahkan data tambahan untuk UMKM jika diperlukan
        $umkmData = $umkm->toArray();
        
        // Ensure products is an array
        if (is_string($umkmData['products'])) {
            $umkmData['products'] = json_decode($umkmData['products'], true) ?: [];
        }
        
        // Add additional fields if they exist in database, with fallbacks
        $additionalFields = [
            'price_range' => $umkm->price_range ?? 'Rp 10.000 - Rp 50.000',
            'website' => $umkm->website ?? null,
            'email' => $umkm->email ?? null,
            'facilities' => $umkm->facilities ?? ['Tempat Parkir', 'WiFi', 'Pembayaran Tunai'],
            'opening_hours' => $umkm->opening_hours ?? [
                'senin' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'selasa' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'rabu' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'kamis' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'jumat' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'sabtu' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'minggu' => ['is_open' => false, 'open_time' => '', 'close_time' => '']
            ]
        ];

        // Merge additional fields
        $umkmData = array_merge($umkmData, $additionalFields);

        // Parse facilities if it's JSON string
        if (isset($umkmData['facilities']) && is_string($umkmData['facilities'])) {
            $umkmData['facilities'] = json_decode($umkmData['facilities'], true) ?: $additionalFields['facilities'];
        }

        // Parse opening hours if it's JSON string
        if (isset($umkmData['opening_hours']) && is_string($umkmData['opening_hours'])) {
            $umkmData['opening_hours'] = json_decode($umkmData['opening_hours'], true) ?: $additionalFields['opening_hours'];
        }

        // Parse display_photos if it's JSON string
        if (isset($umkmData['display_photos']) && is_string($umkmData['display_photos'])) {
            $umkmData['display_photos'] = json_decode($umkmData['display_photos'], true) ?: [];
        }

        return Inertia::render('umkm/umkm-detail', [
            'umkm' => $umkmData,
            'related_umkms' => $relatedUmkms,
        ]);
    }

    /**
     * Store contact form submission - ENHANCED VERSION
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string|max:1000',
            'umkm_id' => 'nullable|exists:umkms,id', // Optional untuk contact umum
            'subject' => 'nullable|string|max:255',
            'visit_date' => 'nullable|date|after_or_equal:today',
            'visit_time' => 'nullable|date_format:H:i',
        ]);

        // Create contact record if UmkmContact model exists
        try {
            if (class_exists('App\Models\UmkmContact')) {
                UmkmContact::create($validated);
            } else {
                // Fallback: save to session or log
                session()->flash('contact_message', $validated);
            }
        } catch (\Exception $e) {
            // Fallback: save to session
            session()->flash('contact_message', $validated);
        }

        // Optional: Send email notification to UMKM owner
        // if ($validated['umkm_id']) {
        //     $umkm = Umkm::find($validated['umkm_id']);
        //     if ($umkm && $umkm->email) {
        //         Mail::to($umkm->email)->send(new UmkmContactNotification($validated));
        //     }
        // }

        return back()->with('success', 'Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.');
    }

    /**
     * Get UMKMs by category (API endpoint)
     */
    public function getByCategory(Request $request)
    {
        $category = $request->get('category', 'Semua');
        
        $query = Umkm::where('is_active', true);
        
        if ($category !== 'Semua') {
            $query->where('category', $category);
        }
        
        $umkms = $query->orderBy('is_verified', 'desc')
                      ->orderBy('rating', 'desc')
                      ->latest()
                      ->get();
        
        return response()->json([
            'umkms' => $umkms,
            'category' => $category,
            'total' => $umkms->count()
        ]);
    }

    /**
     * Get UMKM statistics for API
     */
    public function getStats()
    {
        $stats = [
            'total_umkm' => Umkm::where('is_active', true)->count(),
            'total_products' => $this->getTotalProducts(),
            'certified_halal' => Umkm::where('is_active', true)->where('is_verified', true)->count(),
            'categories_count' => Umkm::where('is_active', true)->distinct('category')->count(),
            'by_category' => Umkm::getCategoryStats(),
        ];

        return response()->json($stats);
    }

    /**
     * Search UMKMs (API endpoint untuk autocomplete)
     */
    public function search(Request $request)
    {
        $query = $request->get('q', '');
        
        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $umkms = Umkm::where('is_active', true)
            ->where(function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('owner', 'like', "%{$query}%")
                  ->orWhere('category', 'like', "%{$query}%");
            })
            ->select(['id', 'name', 'owner', 'category', 'image'])
            ->orderBy('is_verified', 'desc')
            ->orderBy('rating', 'desc')
            ->limit(10)
            ->get();

        return response()->json($umkms);
    }

    /**
     * Get featured UMKMs (untuk homepage atau widget)
     */
    public function getFeatured(Request $request)
    {
        $limit = $request->get('limit', 6);
        
        $featured = Umkm::where('is_active', true)
            ->orderBy('rating', 'desc')
            ->orderBy('is_verified', 'desc')
            ->take($limit)
            ->get();

        return response()->json($featured);
    }

    /**
     * Helper method untuk menghitung total produk
     */
    private function getTotalProducts()
    {
        return Umkm::where('is_active', true)
            ->get()
            ->sum(function ($umkm) {
                // Handle both array and JSON string formats
                $products = $umkm->products;
                if (is_string($products)) {
                    $products = json_decode($products, true) ?: [];
                }
                return is_array($products) ? count($products) : 0;
            });
    }

    /**
     * Helper method untuk validasi dan sanitasi input pencarian
     */
    private function sanitizeSearchInput($input)
    {
        return trim(strip_tags($input));
    }

    /**
     * Method untuk export data UMKM (opsional)
     */
    public function export(Request $request)
    {
        $format = $request->get('format', 'json'); // json, csv, excel
        
        $umkms = Umkm::where('is_active', true)
            ->orderBy('name')
            ->get();

        switch ($format) {
            case 'csv':
                // Implementation untuk CSV export
                return $this->exportToCsv($umkms);
            case 'excel':
                // Implementation untuk Excel export
                return $this->exportToExcel($umkms);
            default:
                return response()->json($umkms);
        }
    }

    /**
     * Helper method untuk CSV export
     */
    private function exportToCsv($umkms)
    {
        $filename = 'umkm_data_' . date('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($umkms) {
            $file = fopen('php://output', 'w');
            
            // Header CSV
            fputcsv($file, ['ID', 'Nama', 'Pemilik', 'Kategori', 'Alamat', 'Kontak', 'Rating', 'Status']);
            
            // Data
            foreach ($umkms as $umkm) {
                fputcsv($file, [
                    $umkm->id,
                    $umkm->name,
                    $umkm->owner,
                    $umkm->category,
                    $umkm->address,
                    $umkm->contact,
                    $umkm->rating,
                    $umkm->is_verified ? 'Terverifikasi' : 'Belum Terverifikasi'
                ]);
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Helper method untuk Excel export (placeholder)
     */
    private function exportToExcel($umkms)
    {
        // Implementation untuk Excel export menggunakan library seperti PhpSpreadsheet
        // Untuk sementara return JSON
        return response()->json([
            'message' => 'Excel export not implemented yet',
            'data' => $umkms
        ]);
    }

    /**
     * Get UMKM contact messages (untuk admin)
     */
    public function getContactMessages(Request $request)
    {
        if (!class_exists('App\Models\UmkmContact')) {
            return response()->json([
                'message' => 'UmkmContact model not found',
                'data' => []
            ]);
        }

        $messages = UmkmContact::with('umkm')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($messages);
    }

    /**
     * Mark contact message as read
     */
    public function markContactAsRead($contactId)
    {
        if (!class_exists('App\Models\UmkmContact')) {
            return response()->json(['message' => 'UmkmContact model not found']);
        }

        $contact = UmkmContact::findOrFail($contactId);
        $contact->update(['status' => 'read']);

        return response()->json(['message' => 'Contact marked as read']);
    }

    /**
     * Get opening hours for specific UMKM (API endpoint)
     */
    public function getOpeningHours(Umkm $umkm)
    {
        $openingHours = $umkm->opening_hours;
        
        if (is_string($openingHours)) {
            $openingHours = json_decode($openingHours, true);
        }

        return response()->json([
            'umkm_id' => $umkm->id,
            'opening_hours' => $openingHours
        ]);
    }

    /**
     * Check if UMKM is currently open
     */
    public function isCurrentlyOpen(Umkm $umkm)
    {
        $openingHours = $umkm->opening_hours;
        
        if (is_string($openingHours)) {
            $openingHours = json_decode($openingHours, true);
        }

        if (!$openingHours) {
            return response()->json([
                'is_open' => false,
                'message' => 'Opening hours not available'
            ]);
        }

        $days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
        $today = $days[date('w')];
        $currentTime = date('H:i');

        $todayHours = $openingHours[$today] ?? null;

        if (!$todayHours || !$todayHours['is_open']) {
            return response()->json([
                'is_open' => false,
                'message' => 'Closed today'
            ]);
        }

        $isOpen = $currentTime >= $todayHours['open_time'] && $currentTime <= $todayHours['close_time'];

        return response()->json([
            'is_open' => $isOpen,
            'today_hours' => $todayHours,
            'current_time' => $currentTime
        ]);
    }
}