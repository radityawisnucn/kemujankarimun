<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UmkmController extends Controller
{
    /**
     * Display the UMKM main page
     */
    public function index()
    {
        // PERBAIKAN: Hapus "pages/" dari path Inertia render
        return Inertia::render('umkm/umkm-page', [
            'stats' => [
                'total_umkm' => 150,
                'total_products' => 25,
                'certified_halal' => 80,
                'revenue_increase' => 45
            ],
            'featured_products' => [
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
            ]
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
            'message' => 'required|string|max:1000'
        ]);

        \Log::info('UMKM Contact Form Submitted:', $validated);
        
        return back()->with('success', 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
    }
}