import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import UmkmNavbar from '@/components/umkm/UmkmNavbar';
import UmkmFooter from '@/components/umkm/umkm-footer';
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
    Clock,
    Search,
    ChevronLeft,
    ChevronRight
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

interface PaginationMeta {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    umkms: {
        data: Umkm[];
        meta: PaginationMeta;
        links: PaginationLink[];
    };
    categories: CategoryStat[];
    filters: {
        category?: string;
        search?: string;
    };
    currentCategory?: string;
    current_category?: string;
    search_query?: string;
    stats?: Stats;
}

export default function UmkmListPage({ 
    umkms, 
    categories, 
    filters, 
    currentCategory, 
    current_category, 
    search_query,
    stats 
}: Props) {
    // Use both currentCategory and current_category for backward compatibility
    const activeCategory = currentCategory || current_category || 'Semua';
    const activeSearchQuery = search_query || filters?.search || '';
    
    const [searchTerm, setSearchTerm] = useState(activeSearchQuery);
    const [selectedCategory, setSelectedCategory] = useState(activeCategory);

    // Safety checks for data
    const safeUmkms = umkms || { data: [], meta: { current_page: 1, last_page: 1, from: 0, to: 0, total: 0 }, links: [] };
    const safeCategories = categories || [];
    const safeFilters = filters || {};
    const safeStats = stats || {
        total_umkm: safeUmkms.data.length,
        total_products: 0,
        certified_halal: 0,
        revenue_increase: 0
    };

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/umkm/list-umkm', {
            category: selectedCategory,
            search: searchTerm,
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleCategoryFilter = (categoryName: string) => {
        setSelectedCategory(categoryName);
        router.get('/umkm/list-umkm', {
            category: categoryName,
            search: searchTerm,
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handlePageChange = (url: string) => {
        if (url) {
            router.get(url);
        }
    };

    // Prepare categories list dengan "Semua"
    const allCategories = useMemo(() => {
        const hasSemuaCategory = safeCategories.some(cat => cat.name === 'Semua');
        
        if (hasSemuaCategory) {
            return safeCategories;
        } else {
            const totalCount = safeCategories.reduce((sum, cat) => sum + cat.count, 0);
            return [
                { name: 'Semua', count: totalCount || safeUmkms.data.length },
                ...safeCategories
            ];
        }
    }, [safeCategories, safeUmkms.data]);

    return (
        <>
            <Head title={`UMKM ${selectedCategory === 'Semua' ? 'Semua Kategori' : selectedCategory} - Desa Kemujan`} />
            
            {/* Updated Navbar Component with correct activeMenu */}
            <UmkmNavbar activeMenu="umkm-unggulan" />

            <div className="min-h-screen bg-gray-50 pt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Section Header - Same as umkm-programs */}
                    <div className="text-center mb-12 pt-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            UMKM Unggulan Desa Kemujan, Karimun Jawa
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Berikut adalah usaha mikro, kecil, dan menengah terbaik di Desa Kemujan 
                            yang telah dipilih berdasarkan kualitas produk, pelayanan, dan kontribusi 
                            terhadap ekonomi lokal.
                        </p>
                    </div>

                    {/* Statistics Row - Same as umkm-programs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-blue-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mb-1">{safeStats.total_umkm}+</div>
                            <div className="text-sm text-gray-600">Total UMKM</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-green-100">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <ShoppingBag className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="text-2xl font-bold text-green-600 mb-1">{safeStats.total_products}+</div>
                            <div className="text-sm text-gray-600">Jenis Produk</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-orange-100">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Award className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="text-2xl font-bold text-orange-600 mb-1">{safeStats.certified_halal}%</div>
                            <div className="text-sm text-gray-600">Terverifikasi</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-purple-100">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="text-2xl font-bold text-purple-600 mb-1">{safeStats.revenue_increase}%</div>
                            <div className="text-sm text-gray-600">Peningkatan Omzet</div>
                        </div>
                    </div>

                    {/* Search Section - Enhanced */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Search Bar */}
                            <div className="flex-1">
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Cari UMKM berdasarkan nama, pemilik, atau produk..."
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-transparent text-gray-400"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Search size={20} />
                                        Cari
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter - Same as umkm-programs */}
                    {allCategories && allCategories.length > 1 && (
                        <div className="mb-8">
                            <div className="flex flex-wrap justify-center gap-4">
                                {allCategories.map((category) => (
                                    <button
                                        key={category.name}
                                        onClick={() => handleCategoryFilter(category.name)}
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

                    {/* Current filter info */}
                    <div className="mb-6 text-center">
                        <p className="text-gray-600">
                            Menampilkan {safeUmkms.data.length} UMKM 
                            {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
                            {safeFilters.search && ` untuk pencarian "${safeFilters.search}"`}
                        </p>
                    </div>

                    {/* UMKM Grid - Same structure as umkm-programs */}
                    {safeUmkms.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {safeUmkms.data.map((umkm) => {
                                    const displayImage = getDisplayImage(umkm);
                                    const todayHours = getTodayOpeningHours(umkm);
                                    
                                    return (
                                        <div key={umkm.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full umkm-card-hover">
                                            {/* Image Section - Same as umkm-programs */}
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

                                            {/* Card Content - Same as umkm-programs */}
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

                                                {/* Description */}
                                                <div className="mb-4 flex-shrink-0">
                                                    <p className="text-gray-600 text-sm leading-relaxed h-12 overflow-hidden">
                                                        <span className="line-clamp-3">{umkm.description}</span>
                                                    </p>
                                                </div>

                                                {/* Address */}
                                                <div className="flex items-start space-x-2 mb-4 flex-shrink-0">
                                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{umkm.address}</span>
                                                </div>

                                                {/* Products */}
                                                <div className="mb-4 flex-shrink-0">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Produk:</h4>
                                                    <div className="flex flex-wrap gap-1 min-h-[2rem]">
                                                        {umkm.products && umkm.products.length > 0 ? (
                                                            <>
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
                                                            </>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">Tidak ada produk tersedia</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Contact and Social Media */}
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

                                            {/* Card Footer */}
                                            <div className="bg-gray-50 px-6 py-4 mt-auto flex-shrink-0">
                                                <Link
                                                    href={`/umkm/${umkm.id}`}
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

                            {/* Pagination */}
                            {safeUmkms.links && safeUmkms.links.length > 3 && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Halaman {safeUmkms.meta?.current_page || 1} dari {safeUmkms.meta?.last_page || 1}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {safeUmkms.links.map((link, index) => {
                                                if (link.label.includes('Previous')) {
                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() => link.url && handlePageChange(link.url)}
                                                            disabled={!link.url}
                                                            className={`px-3 py-2 text-sm rounded-lg flex items-center space-x-1 ${
                                                                link.url
                                                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                                            }`}
                                                        >
                                                            <ChevronLeft size={16} />
                                                            <span>Sebelumnya</span>
                                                        </button>
                                                    );
                                                }
                                                
                                                if (link.label.includes('Next')) {
                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() => link.url && handlePageChange(link.url)}
                                                            disabled={!link.url}
                                                            className={`px-3 py-2 text-sm rounded-lg flex items-center space-x-1 ${
                                                                link.url
                                                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                                            }`}
                                                        >
                                                            <span>Selanjutnya</span>
                                                            <ChevronRight size={16} />
                                                        </button>
                                                    );
                                                }
                                                
                                                if (link.label === '...') {
                                                    return (
                                                        <span key={index} className="px-3 py-2 text-gray-400">
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => link.url && handlePageChange(link.url)}
                                                        className={`px-3 py-2 text-sm rounded-lg ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                        }`}
                                                    >
                                                        {link.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // Empty State - Same as umkm-programs
                        <div className="text-center py-12 mb-12">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Filter className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">
                                {selectedCategory !== 'Semua' 
                                    ? `Tidak Ada UMKM dalam Kategori "${selectedCategory}"`
                                    : 'Belum Ada UMKM Unggulan'
                                }
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {selectedCategory !== 'Semua'
                                    ? 'Coba pilih kategori lain atau lihat semua UMKM.'
                                    : 'UMKM unggulan akan ditampilkan di sini setelah admin menambahkannya.'
                                }
                            </p>
                            {selectedCategory !== 'Semua' && (
                                <button
                                    onClick={() => handleCategoryFilter('Semua')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Lihat Semua UMKM
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {/* Footer */}
                <UmkmFooter />
                
            </div>
        </>
    );
}