<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'instagram',
        'facebook',
        'is_verified',
        'is_active'
    ];

    protected $casts = [
        'products' => 'array',
        'is_verified' => 'boolean',
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

    // Scope untuk UMKM terverifikasi
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    // Accessor untuk mendapatkan social media
    public function getSocialMediaAttribute()
    {
        return [
            'instagram' => $this->instagram,
            'facebook' => $this->facebook,
        ];
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
}