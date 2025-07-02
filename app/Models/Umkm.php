<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Umkm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'owner',
        'category',
        'description',
        'address',
        'products',
        'contact',
        'rating',
        'image',
        'display_photos',     
        'menu_photo',    
        'instagram',
        'facebook',
        'opening_hours',
        'is_active'
    ];

    protected $casts = [
        'products' => 'array',
        'display_photos' => 'array', 
        'opening_hours' => 'array',
        'is_active' => 'boolean',
        'rating' => 'decimal:1'
    ];

    // Scope untuk UMKM yang aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk filter berdasarkan kategori
    public function scopeCategory($query, $category)
    {
        if ($category && $category !== 'Semua') {
            return $query->where('category', $category);
        }
        return $query;
    }

    // Accessor untuk mendapatkan URL foto display
    public function getDisplayPhotoUrlsAttribute()
    {
        if (!$this->display_photos) {
            return [];
        }

        return array_map(function($photo) {
            return Storage::url('umkm/display/' . $photo);
        }, $this->display_photos);
    }

    // Accessor untuk mendapatkan URL foto menu
    public function getMenuPhotoUrlAttribute()
    {
        if (!$this->menu_photo) {
            return null;
        }

        return Storage::url('umkm/menu/' . $this->menu_photo);
    }

    // Method untuk menghapus foto lama
    public function deleteOldPhotos()
    {
        // Hapus foto display lama
        if ($this->display_photos) {
            foreach ($this->display_photos as $photo) {
                Storage::delete('umkm/display/' . $photo);
            }
        }

        // Hapus foto menu lama
        if ($this->menu_photo) {
            Storage::delete('umkm/menu/' . $this->menu_photo);
        }
    }

    // Method untuk mendapatkan semua kategori
    public static function getCategories()
    {
        return [
            'Ikan & Seafood',
            'Rumput Laut',
            'Warung & Kuliner',
            'Kerajinan',
            'Jasa'
        ];
    }

    // Method untuk mendapatkan jam buka default
    public static function getDefaultOpeningHours()
    {
        return [
            'senin' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'selasa' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'rabu' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'kamis' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'jumat' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'sabtu' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'minggu' => ['is_open' => false, 'open_time' => '08:00', 'close_time' => '17:00']
        ];
    }

    // Method untuk mendapatkan statistik kategori
    public static function getCategoryStats()
    {
        $categories = self::getCategories();
        $stats = [];
        
        foreach ($categories as $category) {
            $stats[] = [
                'name' => $category,
                'count' => self::where('category', $category)->where('is_active', true)->count()
            ];
        }
        
        // Tambahkan "Semua"
        array_unshift($stats, [
            'name' => 'Semua',
            'count' => self::where('is_active', true)->count()
        ]);
        
        return $stats;
    }

    // Boot method untuk auto-delete files
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($umkm) {
            $umkm->deleteOldPhotos();
        });
    }
}