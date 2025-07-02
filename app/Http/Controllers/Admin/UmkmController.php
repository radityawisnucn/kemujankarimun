<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            'image' => 'required|string|max:10', // Icon wajib dipilih
            'display_photos' => 'nullable|array|max:3',
            'display_photos.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'menu_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'opening_hours' => 'nullable|array',
            'opening_hours.*.is_open' => 'boolean',
            'opening_hours.*.open_time' => 'nullable|string',
            'opening_hours.*.close_time' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        // Custom validation: Harus ada foto display atau icon
        if (!$request->hasFile('display_photos') && empty($validated['image'])) {
            return back()->withErrors([
                'display_photos' => 'Wajib upload minimal 1 foto display atau pilih icon untuk UMKM.'
            ])->withInput();
        }

        // Set default values
        $validated['rating'] = $validated['rating'] ?? 0;
        $validated['opening_hours'] = $validated['opening_hours'] ?? Umkm::getDefaultOpeningHours();
        $validated['is_active'] = $validated['is_active'] ?? true;

        // Handle display photos upload
        $displayPhotos = [];
        if ($request->hasFile('display_photos')) {
            foreach ($request->file('display_photos') as $photo) {
                $filename = Str::random(20) . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs('umkm/display', $filename, 'public');
                $displayPhotos[] = $filename;
            }
        }
        $validated['display_photos'] = $displayPhotos;

        // Handle menu photo upload
        if ($request->hasFile('menu_photo')) {
            $menuPhoto = $request->file('menu_photo');
            $filename = Str::random(20) . '.' . $menuPhoto->getClientOriginalExtension();
            $menuPhoto->storeAs('umkm/menu', $filename, 'public');
            $validated['menu_photo'] = $filename;
        }

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
            'display_photos' => 'nullable|array|max:3',
            'display_photos.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'menu_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'remove_display_photos' => 'nullable|array',
            'remove_menu_photo' => 'nullable|boolean',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'opening_hours' => 'nullable|array',
            'opening_hours.*.is_open' => 'boolean',
            'opening_hours.*.open_time' => 'nullable|string',
            'opening_hours.*.close_time' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        // Handle display photos
        $currentDisplayPhotos = $umkm->display_photos ?? [];
        
        // Remove selected photos
        if ($request->filled('remove_display_photos')) {
            foreach ($request->remove_display_photos as $photoToRemove) {
                Storage::delete('umkm/display/' . $photoToRemove);
                $currentDisplayPhotos = array_filter($currentDisplayPhotos, function($photo) use ($photoToRemove) {
                    return $photo !== $photoToRemove;
                });
            }
        }

        // Add new photos
        if ($request->hasFile('display_photos')) {
            foreach ($request->file('display_photos') as $photo) {
                if (count($currentDisplayPhotos) < 3) {
                    $filename = Str::random(20) . '.' . $photo->getClientOriginalExtension();
                    $photo->storeAs('umkm/display', $filename, 'public');
                    $currentDisplayPhotos[] = $filename;
                }
            }
        }
        
        $validated['display_photos'] = array_values($currentDisplayPhotos);

        // Handle menu photo
        if ($request->filled('remove_menu_photo') && $request->remove_menu_photo) {
            if ($umkm->menu_photo) {
                Storage::delete('umkm/menu/' . $umkm->menu_photo);
            }
            $validated['menu_photo'] = null;
        } else {
            $validated['menu_photo'] = $umkm->menu_photo;
        }

        if ($request->hasFile('menu_photo')) {
            // Delete old menu photo
            if ($umkm->menu_photo) {
                Storage::delete('umkm/menu/' . $umkm->menu_photo);
            }
            
            $menuPhoto = $request->file('menu_photo');
            $filename = Str::random(20) . '.' . $menuPhoto->getClientOriginalExtension();
            $menuPhoto->storeAs('umkm/menu', $filename, 'public');
            $validated['menu_photo'] = $filename;
        }

        $umkm->update($validated);

        return redirect()->route('admin.umkm.index')
                        ->with('success', 'UMKM berhasil diperbarui!');
    }

    public function destroy(Umkm $umkm)
    {
        // Files will be deleted automatically via model boot method
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