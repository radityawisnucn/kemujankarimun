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
        'opening_hours',  // Tambah jam buka
        'is_active'       // Hapus is_verified
    ];

    protected $casts = [
        'products' => 'array',
        'opening_hours' => 'array',  // Tambah casting untuk jam buka
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

    // Accessor untuk mendapatkan social media
    public function getSocialMediaAttribute()
    {
        return [
            'instagram' => $this->instagram,
            'facebook' => $this->facebook,
        ];
    }

    // Method untuk mendapatkan jam buka hari ini
    public function getTodayOpeningHoursAttribute()
    {
        if (!$this->opening_hours) {
            return null;
        }

        $today = strtolower(date('l')); // monday, tuesday, etc.
        $dayMapping = [
            'monday' => 'senin',
            'tuesday' => 'selasa',
            'wednesday' => 'rabu',
            'thursday' => 'kamis',
            'friday' => 'jumat',
            'saturday' => 'sabtu',
            'sunday' => 'minggu'
        ];

        $indonesianDay = $dayMapping[$today] ?? $today;
        
        return $this->opening_hours[$indonesianDay] ?? null;
    }

    // Method untuk cek apakah sedang buka
    public function getIsCurrentlyOpenAttribute()
    {
        $todayHours = $this->today_opening_hours;
        
        if (!$todayHours || !$todayHours['is_open']) {
            return false;
        }

        $currentTime = date('H:i');
        $openTime = $todayHours['open_time'];
        $closeTime = $todayHours['close_time'];

        return $currentTime >= $openTime && $currentTime <= $closeTime;
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

    // Method untuk format jam buka
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
}