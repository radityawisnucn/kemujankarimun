import React, { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { 
    Star, 
    MapPin, 
    Phone, 
    CheckCircle, 
    ExternalLink,
    Instagram,
    Facebook,
    ArrowRight,
    Users,
    Award,
    ShoppingBag,
    TrendingUp,
    Filter,
    Clock
} from 'lucide-react';

// Interface untuk UMKM data
interface Umkm {
    id: number;
    name: string;
    owner: string;
    category: string;
    description: string;
    address: string;
    products: string[];
    contact: string;
    rating: number;
    image: string;
    display_photos?: string[];
    menu_photo?: string;
    instagram?: string;
    facebook?: string;
    opening_hours?: {
        [key: string]: {
            is_open: boolean;
            open_time: string;
            close_time: string;
        };
    };
    is_verified: boolean;
    is_active: boolean;
    created_at: string;
}

// Interface untuk category stats
interface CategoryStat {
    name: string;
    count: number;
}

// Interface untuk stats
interface Stats {
    total_umkm: number;
    total_products: number;
    certified_halal: number;
    revenue_increase: number;
}

interface Props {
    featured_umkms?: Umkm[];
    categories?: CategoryStat[];
    stats?: Stats;
}

export default function UmkmPrograms({ featured_umkms, categories, stats }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
    
    // Helper function untuk mendapatkan display image
    const getDisplayImage = (umkm: Umkm) => {
        if (umkm.display_photos && umkm.display_photos.length > 0) {
            return `/storage/umkm/display/${umkm.display_photos[0]}`;
        }
        return null;
    };

    // Helper function untuk mendapatkan jam buka hari ini
    const getTodayOpeningHours = (umkm: Umkm) => {
        if (!umkm.opening_hours) return '08:00-17:00';
        
        const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
        const today = days[new Date().getDay()];
        const todayHours = umkm.opening_hours[today];
        
        if (todayHours && todayHours.is_open) {
            return `${todayHours.open_time}-${todayHours.close_time}`;
        }
        return 'Tutup';
    };
    
    // Filter UMKM berdasarkan kategori yang dipilih
    const filteredUmkms = useMemo(() => {
        if (!featured_umkms) return [];
        if (selectedCategory === 'Semua') return featured_umkms;
        return featured_umkms.filter(umkm => umkm.category === selectedCategory);
    }, [featured_umkms, selectedCategory]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
            />
        ));
    };

    // Prepare categories list 
    const allCategories = useMemo(() => {
        if (!categories) return [{ name: 'Semua', count: featured_umkms?.length || 0 }];
        
        // Cek apakah 'Semua' sudah ada di categories
        const hasSemuaCategory = categories.some(cat => cat.name === 'Semua');
        
        if (hasSemuaCategory) {
            // Jika sudah ada, langsung gunakan categories
            return categories;
        } else {
            // Jika belum ada, tambahkan 'Semua' di awal
            return [
                { name: 'Semua', count: featured_umkms?.length || 0 },
                ...categories
            ];
        }
    }, [categories, featured_umkms]);

    return (
        <section id="programs" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        UMKM Unggulan Desa Kemujan, Karimun Jawa
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Berikut adalah usaha mikro, kecil, dan menengah terbaik di Desa Kemujan 
                        yang telah dipilih berdasarkan kualitas produk, pelayanan, dan kontribusi 
                        terhadap ekonomi lokal.
                    </p>
                </div>

                {/* Statistics Row */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-blue-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.total_umkm}+</div>
                            <div className="text-sm text-gray-600">Total UMKM</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-green-100">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <ShoppingBag className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="text-2xl font-bold text-green-600 mb-1">{stats.total_products}+</div>
                            <div className="text-sm text-gray-600">Jenis Produk</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-orange-100">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Award className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.certified_halal}%</div>
                            <div className="text-sm text-gray-600">Terverifikasi</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-purple-100">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.revenue_increase}%</div>
                            <div className="text-sm text-gray-600">Peningkatan Omzet</div>
                        </div>
                    </div>
                )}

                {/* Category Filter */}
                {allCategories && allCategories.length > 1 && (
                    <div className="mb-8">
                        <div className="flex flex-wrap justify-center gap-4">
                            {allCategories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`group flex items-center space-x-3 px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                                        selectedCategory === category.name
                                            ? 'bg-blue-600 text-white border border-blue-600'
                                            : 'bg-white hover:bg-blue-50 border border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800'
                                    }`}
                                >
                                    <span>{category.name}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        selectedCategory === category.name
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {category.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* UMKM Grid - Data dari Admin Panel dengan Filter */}
                {featured_umkms && featured_umkms.length > 0 ? (
                    <>
                        {/* Show current filter info */}
                        <div className="mb-6 text-center">
                            <p className="text-gray-600">
                                Menampilkan {filteredUmkms.length} UMKM 
                                {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
                            </p>
                        </div>

                        {filteredUmkms.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {filteredUmkms.map((umkm) => {
                                    const displayImage = getDisplayImage(umkm);
                                    const todayHours = getTodayOpeningHours(umkm);
                                    
                                    return (
                                        <div key={umkm.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full umkm-card-hover">
                                            {/* Image Section - Admin Style */}
                                            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
                                                {displayImage ? (
                                                    <>
                                                        <img 
                                                            src={displayImage} 
                                                            alt={umkm.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                const target = e.currentTarget;
                                                                target.style.display = 'none';
                                                                const fallback = target.parentElement?.querySelector('.emoji-fallback');
                                                                if (fallback) {
                                                                    (fallback as HTMLElement).classList.remove('hidden');
                                                                }
                                                            }}
                                                        />
                                                        <div className="emoji-fallback hidden w-full h-full flex items-center justify-center absolute inset-0">
                                                            <span className="text-6xl">{umkm.image}</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-6xl">{umkm.image}</span>
                                                    </div>
                                                )}
                                                
                                                {/* Status Badge */}
                                                <div className="absolute top-3 left-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Aktif
                                                    </span>
                                                </div>
                                                
                                                {/* Operating Hours */}
                                                <div className="absolute top-3 right-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-90 text-gray-800">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {todayHours}
                                                    </span>
                                                </div>

                                                {/* Verified Badge */}
                                                {umkm.is_verified && (
                                                    <div className="absolute bottom-3 left-3">
                                                        <div className="flex items-center space-x-1 text-green-600 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                                                            <CheckCircle className="w-4 h-4" />
                                                            <span className="text-xs font-medium">Verified</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-6 flex-grow flex flex-col">
                                                {/* Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
                                                            {umkm.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 truncate">{umkm.owner}</p>
                                                        <div className="flex items-center space-x-1 mt-1">
                                                            {renderStars(umkm.rating)}
                                                            <span className="text-xs text-gray-500 ml-1">({umkm.rating})</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Category */}
                                                <div className="mb-4">
                                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                                        {umkm.category}
                                                    </span>
                                                </div>

                                                {/* Description - Fixed height dengan line clamp */}
                                                <div className="mb-4 flex-shrink-0">
                                                    <p className="text-gray-600 text-sm leading-relaxed h-12 overflow-hidden">
                                                        <span className="line-clamp-3">{umkm.description}</span>
                                                    </p>
                                                </div>

                                                {/* Address - Fixed height */}
                                                <div className="flex items-start space-x-2 mb-4 flex-shrink-0">
                                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{umkm.address}</span>
                                                </div>

                                                {/* Products - Fixed height */}
                                                <div className="mb-4 flex-shrink-0">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Produk:</h4>
                                                    <div className="flex flex-wrap gap-1 min-h-[2rem]">
                                                        {umkm.products.slice(0, 3).map((product, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded truncate max-w-[120px]"
                                                                title={product}
                                                            >
                                                                {product}
                                                            </span>
                                                        ))}
                                                        {umkm.products.length > 3 && (
                                                            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                                                +{umkm.products.length - 3} lainnya
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Contact and Social Media - Push to bottom */}
                                                <div className="flex items-center justify-between mt-auto pt-2">
                                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                        <span className="text-sm text-gray-600 truncate">{umkm.contact}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                                                        {umkm.instagram && (
                                                            <a
                                                                href={umkm.instagram}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-pink-500 hover:text-pink-600 transition-colors"
                                                            >
                                                                <Instagram className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {umkm.facebook && (
                                                            <a
                                                                href={umkm.facebook}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-700 transition-colors"
                                                            >
                                                                <Facebook className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Created Date */}
                                                <div className="mt-3 pt-3 border-t border-gray-50">
                                                    <p className="text-xs text-gray-400">
                                                        Bergabung: {new Date(umkm.created_at).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Card Footer - Konsisten di bawah */}
                                            <div className="bg-gray-50 px-6 py-4 mt-auto flex-shrink-0">
                                                <Link
                                                    href={route('umkm.show', umkm.id)}
                                                    className="inline-flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors w-full group"
                                                >
                                                    <span>Lihat Detail</span>
                                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* No results for current filter */
                            <div className="text-center py-12 mb-12">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Filter className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">
                                    Tidak Ada UMKM dalam Kategori "{selectedCategory}"
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Coba pilih kategori lain atau lihat semua UMKM.
                                </p>
                                <button
                                    onClick={() => setSelectedCategory('Semua')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Fallback jika belum ada data UMKM */
                    <div className="text-center py-12 mb-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                            Belum Ada UMKM Unggulan
                        </h3>
                        <p className="text-gray-600 mb-6">
                            UMKM unggulan akan ditampilkan di sini setelah admin menambahkannya.
                        </p>
                    </div>
                )}

                {/* Main CTA */}
                <div className="text-center">
                    <Link
                        href="/umkm/list-umkm"
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <span>Lihat Semua UMKM</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}