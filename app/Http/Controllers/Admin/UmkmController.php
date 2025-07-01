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
            'filters' => $request->only(['category', 'active', 'search']),
            'stats' => [
                'total' => Umkm::count(),
                'active' => Umkm::where('is_active', true)->count(),
                'inactive' => Umkm::where('is_active', false)->count(),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/umkm/create', [
            'categories' => Umkm::getCategories(),
            'defaultOpeningHours' => Umkm::getDefaultOpeningHours()
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
            'opening_hours' => 'nullable|array',
            'opening_hours.*.is_open' => 'boolean',
            'opening_hours.*.open_time' => 'nullable|string',
            'opening_hours.*.close_time' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $validated['rating'] = $validated['rating'] ?? 0;
        $validated['image'] = $validated['image'] ?? '🏪';
        $validated['opening_hours'] = $validated['opening_hours'] ?? Umkm::getDefaultOpeningHours();
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
            'categories' => Umkm::getCategories(),
            'defaultOpeningHours' => Umkm::getDefaultOpeningHours()
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
            'opening_hours' => 'nullable|array',
            'opening_hours.*.is_open' => 'boolean',
            'opening_hours.*.open_time' => 'nullable|string',
            'opening_hours.*.close_time' => 'nullable|string',
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

    public function toggleActive(Umkm $umkm)
    {
        $umkm->update([
            'is_active' => !$umkm->is_active
        ]);

        return back()->with('success', 'Status aktif UMKM berhasil diubah!');
    }
}