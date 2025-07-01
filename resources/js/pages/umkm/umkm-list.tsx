import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Search, 
    MapPin, 
    Phone, 
    Star, 
    CheckCircle,
    ExternalLink,
    Instagram,
    Facebook,
    ChevronLeft,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';

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
    instagram?: string;
    facebook?: string;
    is_verified: boolean;
    is_active: boolean;
    created_at: string;
}

interface CategoryStat {
    name: string;
    count: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    umkms: {
        data: Umkm[];
        links: PaginationLink[];
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            per_page: number;
            to: number;
            total: number;
        };
    };
    categories: CategoryStat[];
    filters: {
        category?: string;
        search?: string;
    };
}

export default function UmkmList({ umkms, categories, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'Semua');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('umkm.index'), {
            search: searchTerm,
            category: selectedCategory === 'Semua' ? undefined : selectedCategory
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        router.get(route('umkm.index'), {
            search: searchTerm,
            category: category === 'Semua' ? undefined : category
        }, {
            preserveState: true,
            replace: true
        });
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

    return (
        <>
            <Head title="Daftar UMKM - Desa Turus" />
            
            <div className="bg-gray-50 min-h-screen">
                {/* Navigation Header */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <Link
                            href={route('umkm.index')}
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali ke Halaman Utama</span>
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Daftar UMKM Desa Turus
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Temukan berbagai usaha mikro, kecil, dan menengah yang ada di Desa Turus, 
                            Polanharjo, Klaten dengan produk-produk berkualitas.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <form onSubmit={handleSearch} className="mb-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Cari UMKM, pemilik, atau produk..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => handleCategoryChange(category.name)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category.name
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category.name} ({category.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Count */}
                    {umkms.data.length > 0 && (
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Menampilkan {umkms.meta.from} - {umkms.meta.to} dari {umkms.meta.total} UMKM
                                {filters.search && ` untuk "${filters.search}"`}
                                {filters.category && filters.category !== 'Semua' && ` dalam kategori "${filters.category}"`}
                            </p>
                        </div>
                    )}

                    {/* UMKM Grid */}
                    {umkms.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {umkms.data.map((umkm) => (
                                <div key={umkm.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                                    {/* Card Header */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-xl">{umkm.image}</span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-bold text-gray-900 text-lg">{umkm.name}</h3>
                                                    <p className="text-sm text-gray-600">{umkm.owner}</p>
                                                    <div className="flex items-center space-x-1 mt-1">
                                                        {renderStars(umkm.rating)}
                                                        <span className="text-xs text-gray-500 ml-1">({umkm.rating})</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {umkm.is_verified && (
                                                <div className="flex items-center space-x-1 text-green-600">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="text-xs font-medium">Verified</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Category */}
                                        <div className="mb-3">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                                {umkm.category}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {umkm.description}
                                        </p>

                                        {/* Address */}
                                        <div className="flex items-start space-x-2 mb-4">
                                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-gray-600">{umkm.address}</span>
                                        </div>

                                        {/* Products */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Produk:</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {umkm.products.slice(0, 3).map((product, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
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

                                        {/* Contact and Social Media */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{umkm.contact}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
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
                                    </div>

                                    {/* Card Footer */}
                                    <div className="bg-gray-50 px-6 py-4">
                                        <Link
                                            href={route('umkm.show', umkm.id)}
                                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                                        >
                                            <span>Lihat Detail</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">
                                Tidak ada UMKM yang ditemukan
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Coba ubah kata kunci pencarian atau pilih kategori lain.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('Semua');
                                    router.get(route('umkm.index'));
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {umkms.data.length > 0 && umkms.meta.last_page > 1 && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Halaman {umkms.meta.current_page} dari {umkms.meta.last_page}
                                </div>
                                <div className="flex items-center space-x-2">
                                    {umkms.links.map((link, index) => {
                                        if (link.label.includes('Previous')) {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => link.url && router.get(link.url)}
                                                    disabled={!link.url}
                                                    className={`px-3 py-2 text-sm rounded-lg flex items-center space-x-1 ${
                                                        link.url
                                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                    <span>Sebelumnya</span>
                                                </button>
                                            );
                                        }
                                        
                                        if (link.label.includes('Next')) {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => link.url && router.get(link.url)}
                                                    disabled={!link.url}
                                                    className={`px-3 py-2 text-sm rounded-lg flex items-center space-x-1 ${
                                                        link.url
                                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <span>Selanjutnya</span>
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            );
                                        }
                                        
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : link.url
                                                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
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
                </div>
            </div>
        </>
    );
}