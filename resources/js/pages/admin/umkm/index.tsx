import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { 
    Plus, 
    Search, 
    Filter, 
    Eye, 
    Edit, 
    Trash2, 
    CheckCircle, 
    XCircle, 
    Star,
    MapPin,
    Phone,
    User,
    ExternalLink,
    ChevronLeft,
    ChevronRight
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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    path: string;
    links: PaginationLink[];
}

interface Props {
    umkms: {
        data: Umkm[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    categories: string[];
    filters: {
        category?: string;
        verified?: string;
        active?: string;
        search?: string;
    };
    stats: {
        total: number;
        active: number;
        verified: number;
        pending: number;
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

    const toggleVerification = (umkm: Umkm) => {
        router.post(route('admin.umkm.toggle-verification', umkm.id), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: show success message
            }
        });
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
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Head title="Kelola UMKM" />
            
            {/* Sidebar */}
            <AdminSidebar />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <AdminNavbar />
                
                {/* Content */}
                <main className="flex-1 px-8 py-6 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola UMKM</h1>
                            <p className="text-gray-600 mt-1">Kelola data UMKM Desa Kemujan</p>
                        </div>
                        <Link
                            href={route('admin.umkm.create')}
                            className="bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 text-sm rounded-lg shadow transition flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah UMKM</span>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total UMKM</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Aktif</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-3 bg-yellow-100 rounded-lg">
                                    <Star className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Terverifikasi</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <XCircle className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
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
                                
                                {(filters.category || filters.verified || filters.active || filters.search) && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Options */}
                        {showFilters && (
                            <div className="pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                        <select
                                            value={filters.category || 'all'}
                                            onChange={(e) => handleFilter('category', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="all">Semua Kategori</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Verification Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status Verifikasi</label>
                                        <select
                                            value={filters.verified || 'all'}
                                            onChange={(e) => handleFilter('verified', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="all">Semua Status</option>
                                            <option value="true">Terverifikasi</option>
                                            <option value="false">Belum Verifikasi</option>
                                        </select>
                                    </div>

                                    {/* Active Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status Aktif</label>
                                        <select
                                            value={filters.active || 'all'}
                                            onChange={(e) => handleFilter('active', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="all">Semua Status</option>
                                            <option value="true">Aktif</option>
                                            <option value="false">Nonaktif</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* UMKM Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {umkms.data.map((umkm) => (
                            <div key={umkm.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                                {/* Card Header */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <span className="text-xl">{umkm.image}</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-gray-900 truncate">{umkm.name}</h3>
                                                <p className="text-sm text-gray-600 truncate">{umkm.owner}</p>
                                                <div className="flex items-center space-x-1 mt-1">
                                                    {renderStars(umkm.rating)}
                                                    <span className="text-xs text-gray-500 ml-1">{umkm.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end space-y-1">
                                            {umkm.is_verified && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ Verified
                                                </span>
                                            )}
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                umkm.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {umkm.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </div>
                                    </div>

                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                                        {umkm.category}
                                    </span>

                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                                        {umkm.description}
                                    </p>

                                    <div className="flex items-start space-x-2 text-sm text-gray-500 mb-2">
                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-1">{umkm.address}</span>
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Phone className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{umkm.contact}</span>
                                    </div>
                                </div>

                                {/* Products */}
                                <div className="p-4 border-b border-gray-100">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Produk:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {umkm.products.slice(0, 3).map((product, idx) => (
                                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                {product}
                                            </span>
                                        ))}
                                        {umkm.products.length > 3 && (
                                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                +{umkm.products.length - 3} lainnya
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
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
                                                onClick={() => toggleVerification(umkm)}
                                                className={`text-xs px-2 py-1 rounded transition-colors ${
                                                    umkm.is_verified
                                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                                title={umkm.is_verified ? 'Batalkan Verifikasi' : 'Verifikasi'}
                                            >
                                                {umkm.is_verified ? 'Unverify' : 'Verify'}
                                            </button>
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
                        ))}
                    </div>

                    {/* Empty State */}
                    {umkms.data.length === 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center mb-6">
                            <div className="text-6xl mb-4">🏪</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {filters.search || filters.category || filters.verified || filters.active 
                                    ? 'Tidak ada UMKM yang sesuai filter' 
                                    : 'Belum ada UMKM'
                                }
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {filters.search || filters.category || filters.verified || filters.active 
                                    ? 'Coba ubah kriteria pencarian atau filter Anda' 
                                    : 'Mulai tambahkan UMKM untuk mengelola data usaha di Desa Kemujan'
                                }
                            </p>
                            {!(filters.search || filters.category || filters.verified || filters.active) ? (
                                <Link
                                    href={route('admin.umkm.create')}
                                    className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah UMKM Pertama</span>
                                </Link>
                            ) : (
                                <button
                                    onClick={clearFilters}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {umkms.data.length > 0 && umkms.meta && umkms.meta.last_page > 1 && (
                        <div className="bg-white px-6 py-4 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Menampilkan <span className="font-medium">{umkms.meta.from}</span> - <span className="font-medium">{umkms.meta.to}</span> dari <span className="font-medium">{umkms.meta.total}</span> UMKM
                                </div>
                                <div className="flex items-center space-x-2">
                                    {umkms.meta.links.map((link, index) => {
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
                                                    <span>Previous</span>
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
                                                    <span>Next</span>
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
                </main>
            </div>
        </div>
    );
}