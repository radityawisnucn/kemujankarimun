<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UmkmController extends Controller
{
    public function index(Request $request)
    {
        $query = Umkm::query();

        // Filter berdasarkan kategori
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Filter berdasarkan status verifikasi
        if ($request->filled('verified')) {
            $query->where('is_verified', $request->verified === 'true');
        }

        // Filter berdasarkan status aktif
        if ($request->filled('active')) {
            $query->where('is_active', $request->active === 'true');
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('owner', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $umkms = $query->latest()->paginate(12);
        
        return Inertia::render('admin/umkm/index', [
            'umkms' => $umkms,
            'categories' => Umkm::getCategories(),
            'filters' => $request->only(['category', 'verified', 'active', 'search']),
            'stats' => [
                'total' => Umkm::count(),
                'active' => Umkm::where('is_active', true)->count(),
                'verified' => Umkm::where('is_verified', true)->count(),
                'pending' => Umkm::where('is_verified', false)->count(),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/umkm/create', [
            'categories' => Umkm::getCategories()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'owner' => 'required|string|max:255',
            'category' => 'required|in:' . implode(',', Umkm::getCategories()),
            'description' => 'required|string',
            'address' => 'required|string',
            'products' => 'required|array|min:1',
            'products.*' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'rating' => 'nullable|numeric|min:0|max:5',
            'image' => 'nullable|string|max:10',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'is_verified' => 'boolean',
            'is_active' => 'boolean'
        ]);

        $validated['rating'] = $validated['rating'] ?? 0;
        $validated['image'] = $validated['image'] ?? '🏪';
        $validated['is_verified'] = $validated['is_verified'] ?? false;
        $validated['is_active'] = $validated['is_active'] ?? true;

        Umkm::create($validated);

        return redirect()->route('admin.umkm.index')
                        ->with('success', 'UMKM berhasil ditambahkan!');
    }

    public function show(Umkm $umkm)
    {
        return Inertia::render('admin/umkm/show', [
            'umkm' => $umkm
        ]);
    }

    public function edit(Umkm $umkm)
    {
        return Inertia::render('admin/umkm/edit', [
            'umkm' => $umkm,
            'categories' => Umkm::getCategories()
        ]);
    }

    public function update(Request $request, Umkm $umkm)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'owner' => 'required|string|max:255',
            'category' => 'required|in:' . implode(',', Umkm::getCategories()),
            'description' => 'required|string',
            'address' => 'required|string',
            'products' => 'required|array|min:1',
            'products.*' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'rating' => 'nullable|numeric|min:0|max:5',
            'image' => 'nullable|string|max:10',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'is_verified' => 'boolean',
            'is_active' => 'boolean'
        ]);

        $umkm->update($validated);

        return redirect()->route('admin.umkm.index')
                        ->with('success', 'UMKM berhasil diperbarui!');
    }

    public function destroy(Umkm $umkm)
    {
        $umkm->delete();

        return redirect()->route('admin.umkm.index')
                        ->with('success', 'UMKM berhasil dihapus!');
    }

    public function toggleVerification(Umkm $umkm)
    {
        $umkm->update([
            'is_verified' => !$umkm->is_verified
        ]);

        return back()->with('success', 'Status verifikasi UMKM berhasil diubah!');
    }

    public function toggleActive(Umkm $umkm)
    {
        $umkm->update([
            'is_active' => !$umkm->is_active
        ]);

        return back()->with('success', 'Status aktif UMKM berhasil diubah!');
    }
}