import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { 
    Search, 
    Filter, 
    Plus, 
    Eye, 
    Edit, 
    Trash2, 
    Star,
    Clock,
    MapPin,
    Phone,
    X
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
    opening_hours?: {
        [key: string]: {
            is_open: boolean;
            open_time: string;
            close_time: string;
        };
    };
    is_active: boolean;
    created_at: string;
}

interface Props {
    umkms: {
        data: Umkm[];
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
        links: any[];
    };
    categories: string[];
    filters: {
        category?: string;
        active?: string;
        search?: string;
    };
    stats: {
        total: number;
        active: number;
        inactive: number;
    };
}

export default function UmkmIndex({ umkms, categories, filters, stats }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.umkm.index'), { ...filters, search });
    };

    const handleFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        if (value === 'all') {
            delete newFilters[key as keyof typeof newFilters];
        }
        router.get(route('admin.umkm.index'), newFilters);
    };

    const clearFilters = () => {
        router.get(route('admin.umkm.index'));
    };

    const handleDelete = (umkm: Umkm) => {
        if (confirm(`Apakah Anda yakin ingin menghapus UMKM "${umkm.name}"?`)) {
            router.delete(route('admin.umkm.destroy', umkm.id), {
                onSuccess: () => {
                    // Optional: show success message
                }
            });
        }
    };

    const toggleActive = (umkm: Umkm) => {
        router.post(route('admin.umkm.toggle-active', umkm.id), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: show success message
            }
        });
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <Star 
                key={i} 
                className={`w-3 h-3 ${
                    i < Math.floor(rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                }`} 
            />
        ));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getTodayOpeningHours = (umkm: Umkm) => {
        if (!umkm.opening_hours) return null;
        
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const dayMapping: { [key: string]: string } = {
            'monday': 'senin',
            'tuesday': 'selasa',
            'wednesday': 'rabu',
            'thursday': 'kamis',
            'friday': 'jumat',
            'saturday': 'sabtu',
            'sunday': 'minggu'
        };
        
        const indonesianDay = dayMapping[today];
        return umkm.opening_hours[indonesianDay] || null;
    };

    const isCurrentlyOpen = (umkm: Umkm) => {
        const todayHours = getTodayOpeningHours(umkm);
        if (!todayHours || !todayHours.is_open) return false;
        
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [openHour, openMin] = todayHours.open_time.split(':').map(Number);
        const [closeHour, closeMin] = todayHours.close_time.split(':').map(Number);
        const openTime = openHour * 60 + openMin;
        const closeTime = closeHour * 60 + closeMin;
        
        return currentTime >= openTime && currentTime <= closeTime;
    };

    return (
        <AdminLayout>
            <Head title="Kelola UMKM" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Kelola UMKM</h1>
                        <p className="text-gray-600 mt-1">Manajemen data UMKM Desa Kemujan</p>
                    </div>
                    <Link
                        href={route('admin.umkm.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah UMKM</span>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total UMKM</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <span className="text-2xl">🏪</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Aktif</p>
                                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Tidak Aktif</p>
                                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-full">
                                <span className="text-2xl">❌</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari UMKM, pemilik, atau alamat..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </form>

                        {/* Filter Toggle */}
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Filter className="w-4 h-4" />
                                <span>Filter</span>
                            </button>
                            
                            {(filters.category || filters.active) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Hapus Filter</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className="border-t pt-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategori
                                    </label>
                                    <select
                                        value={filters.category || 'all'}
                                        onChange={(e) => handleFilter('category', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">Semua Kategori</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Active Status Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={filters.active || 'all'}
                                        onChange={(e) => handleFilter('active', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">Semua Status</option>
                                        <option value="true">Aktif</option>
                                        <option value="false">Tidak Aktif</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* UMKM Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {umkms.data.map((umkm) => {
                        const todayHours = getTodayOpeningHours(umkm);
                        const currentlyOpen = isCurrentlyOpen(umkm);
                        
                        return (
                            <div key={umkm.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="text-2xl">{umkm.image}</div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-gray-900 truncate">
                                                    {umkm.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {umkm.owner}
                                                </p>
                                                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                                                    {umkm.category}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Status Badge */}
                                        <div className="flex flex-col items-end space-y-1">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                umkm.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {umkm.is_active ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                            
                                            {/* Opening Hours Status */}
                                            {todayHours && (
                                                <div className={`flex items-center space-x-1 text-xs ${
                                                    currentlyOpen ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    <Clock className="w-3 h-3" />
                                                    <span>
                                                        {todayHours.is_open 
                                                            ? (currentlyOpen ? 'Buka' : `${todayHours.open_time}-${todayHours.close_time}`)
                                                            : 'Tutup'
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-start space-x-2">
                                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {umkm.address}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <p className="text-sm text-gray-600">
                                                {umkm.contact}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-1">
                                                {renderStars(umkm.rating)}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                ({umkm.rating}/5)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Products */}
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 mb-2">Produk:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {umkm.products.slice(0, 3).map((product, index) => (
                                                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                    {product}
                                                </span>
                                            ))}
                                            {umkm.products.length > 3 && (
                                                <span className="text-xs text-gray-500">
                                                    +{umkm.products.length - 3} lainnya
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={route('admin.umkm.show', umkm.id)}
                                                className="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors"
                                                title="Lihat Detail"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={route('admin.umkm.edit', umkm.id)}
                                                className="text-yellow-600 hover:text-yellow-700 p-1 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(umkm)}
                                                className="text-red-600 hover:text-red-700 p-1 rounded transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => toggleActive(umkm)}
                                                className={`text-xs px-2 py-1 rounded transition-colors ${
                                                    umkm.is_active
                                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                                title={umkm.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                            >
                                                {umkm.is_active ? 'Disable' : 'Enable'}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Date */}
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <p className="text-xs text-gray-500">
                                            Dibuat: {formatDate(umkm.created_at)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {umkms.data.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center mb-6">
                        <div className="text-6xl mb-4">🏪</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {filters.search || filters.category || filters.active 
                                ? 'Tidak ada UMKM yang sesuai filter' 
                                : 'Belum ada UMKM'
                            }
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {filters.search || filters.category || filters.active 
                                ? 'Coba ubah kriteria pencarian atau filter Anda' 
                                : 'Mulai tambahkan UMKM untuk mengelola data usaha di Desa Kemujan'
                            }
                        </p>
                        {!(filters.search || filters.category || filters.active) && (
                            <Link
                                href={route('admin.umkm.create')}
                                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Tambah UMKM Pertama</span>
                            </Link>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {umkms.last_page > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow-sm">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {umkms.links[0].url && (
                                <Link
                                    href={umkms.links[0].url}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {umkms.links[umkms.links.length - 1].url && (
                                <Link
                                    href={umkms.links[umkms.links.length - 1].url}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(umkms.current_page - 1) * umkms.per_page + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(umkms.current_page * umkms.per_page, umkms.total)}
                                    </span>{' '}
                                    of <span className="font-medium">{umkms.total}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {umkms.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                link.active
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : link.url
                                                    ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                                            } ${
                                                index === 0 ? 'rounded-l-md' : ''
                                            } ${
                                                index === umkms.links.length - 1 ? 'rounded-r-md' : ''
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}