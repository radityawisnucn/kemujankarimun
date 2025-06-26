import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { ArrowLeft, Plus, Trash2, AlertCircle } from 'lucide-react';

interface Props {
    categories: string[];
}

export default function UmkmCreate({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        owner: '',
        category: '',
        description: '',
        address: '',
        products: [''],
        contact: '',
        rating: 0,
        image: '🏪',
        instagram: '',
        facebook: '',
        is_verified: false,
        is_active: true
    });

    const addProduct = () => {
        setData('products', [...data.products, '']);
    };

    const removeProduct = (index: number) => {
        const newProducts = data.products.filter((_, i) => i !== index);
        setData('products', newProducts);
    };

    const updateProduct = (index: number, value: string) => {
        const newProducts = [...data.products];
        newProducts[index] = value;
        setData('products', newProducts);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.umkm.store'));
    };

    const emojiOptions = ['🏪', '🐟', '🌿', '🍽️', '🐚', '🤿', '☕', '🦐', '🌊', '🪸', '⛵'];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Head title="Tambah UMKM" />
            
            {/* Sidebar */}
            <AdminSidebar />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <AdminNavbar />
                
                {/* Content */}
                <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                            <Link
                                href={route('admin.umkm.index')}
                                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                            <div className="min-w-0">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tambah UMKM</h1>
                                <p className="text-gray-600 mt-1 text-sm sm:text-base">Tambahkan UMKM baru ke dalam sistem</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <form onSubmit={handleSubmit}>
                            {/* Form Content */}
                            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                                
                                {/* Section: Informasi Dasar */}
                                <div className="space-y-6">
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Informasi Dasar</h2>
                                        <p className="text-sm text-gray-600 mt-1">Data utama UMKM yang wajib diisi</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nama UMKM <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                                }`}
                                                placeholder="Contoh: Ikan Asap Pak Budi"
                                                required
                                            />
                                            {errors.name && (
                                                <div className="flex items-center gap-1 text-red-600 text-xs">
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>{errors.name}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nama Pemilik <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.owner}
                                                onChange={(e) => setData('owner', e.target.value)}
                                                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                    errors.owner ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                                }`}
                                                placeholder="Contoh: Budi Santoso"
                                                required
                                            />
                                            {errors.owner && (
                                                <div className="flex items-center gap-1 text-red-600 text-xs">
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>{errors.owner}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Kategori <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={data.category}
                                                onChange={(e) => setData('category', e.target.value)}
                                                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                    errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                                }`}
                                                required
                                            >
                                                <option value="">Pilih Kategori</option>
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category && (
                                                <div className="flex items-center gap-1 text-red-600 text-xs">
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>{errors.category}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Kontak (WhatsApp) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.contact}
                                                onChange={(e) => setData('contact', e.target.value)}
                                                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                    errors.contact ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                                }`}
                                                placeholder="Contoh: +62 812-3456-7890"
                                                required
                                            />
                                            {errors.contact && (
                                                <div className="flex items-center gap-1 text-red-600 text-xs">
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>{errors.contact}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Deskripsi <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={4}
                                            className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                                                errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                            }`}
                                            placeholder="Ceritakan tentang UMKM ini, keunggulan, dan hal menarik lainnya..."
                                            required
                                        />
                                        {errors.description && (
                                            <div className="flex items-center gap-1 text-red-600 text-xs">
                                                <AlertCircle className="w-3 h-3" />
                                                <span>{errors.description}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Alamat <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                            }`}
                                            placeholder="Contoh: Jl. Pantai Utara No. 15, Kemujan"
                                            required
                                        />
                                        {errors.address && (
                                            <div className="flex items-center gap-1 text-red-600 text-xs">
                                                <AlertCircle className="w-3 h-3" />
                                                <span>{errors.address}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Section: Produk */}
                                <div className="space-y-6">
                                    <div className="border-b border-gray-200 pb-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-900">Produk Unggulan</h2>
                                                <p className="text-sm text-gray-600 mt-1">Daftar produk yang ditawarkan UMKM</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addProduct}
                                                className="inline-flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                                <span>Tambah Produk</span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {data.products.map((product, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="flex-1 space-y-1">
                                                    <input
                                                        type="text"
                                                        value={product}
                                                        onChange={(e) => updateProduct(index, e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                        placeholder={`Produk ${index + 1}`}
                                                        required
                                                    />
                                                </div>
                                                {data.products.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeProduct(index)}
                                                        className="flex-shrink-0 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors mt-0"
                                                        title="Hapus produk"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {errors.products && (
                                        <div className="flex items-center gap-1 text-red-600 text-xs">
                                            <AlertCircle className="w-3 h-3" />
                                            <span>{errors.products}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Section: Informasi Tambahan */}
                                <div className="space-y-6">
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Informasi Tambahan</h2>
                                        <p className="text-sm text-gray-600 mt-1">Rating, ikon, dan media sosial</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Rating (0-5)
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="5"
                                                step="0.1"
                                                value={data.rating}
                                                onChange={(e) => setData('rating', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            />
                                            {errors.rating && (
                                                <div className="flex items-center gap-1 text-red-600 text-xs">
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>{errors.rating}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Ikon/Emoji
                                            </label>
                                            <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 gap-2">
                                                {emojiOptions.map((emoji) => (
                                                    <button
                                                        key={emoji}
                                                        type="button"
                                                        onClick={() => setData('image', emoji)}
                                                        className={`aspect-square p-2 text-lg border rounded-lg hover:bg-gray-50 transition-colors ${
                                                            data.image === emoji
                                                                ? 'border-blue-500 bg-blue-50'
                                                                : 'border-gray-300'
                                                        }`}
                                                    >
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>
                                            {errors.image && (
                                                <div className="flex items-center gap-1 text-red-600 text-xs">
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>{errors.image}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Instagram (opsional)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.instagram}
                                                onChange={(e) => setData('instagram', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                placeholder="@username atau link lengkap"
                                            />
                                            {errors.instagram && (
                                                <div className="flex items-center gap-1 text-red-600 text-xs">
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>{errors.instagram}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Facebook (opsional)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.facebook}
                                                onChange={(e) => setData('facebook', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                placeholder="Nama halaman atau link lengkap"
                                            />
                                            {errors.facebook && (
                                                <div className="flex items-center gap-1 text-red-600 text-xs">
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>{errors.facebook}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Status */}
                                <div className="space-y-6">
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Status UMKM</h2>
                                        <p className="text-sm text-gray-600 mt-1">Pengaturan verifikasi dan status aktif</p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                id="is_verified"
                                                checked={data.is_verified}
                                                onChange={(e) => setData('is_verified', e.target.checked)}
                                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <div className="min-w-0">
                                                <label htmlFor="is_verified" className="text-sm font-medium text-gray-700">
                                                    UMKM Terverifikasi
                                                </label>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    UMKM yang sudah diverifikasi akan mendapat badge khusus
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <div className="min-w-0">
                                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                                    Status Aktif
                                                </label>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    UMKM aktif akan ditampilkan di halaman publik
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                                <div className="flex flex-col sm:flex-row justify-end gap-3">
                                    <Link
                                        href={route('admin.umkm.index')}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-center text-sm font-medium transition-colors"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 disabled:bg-blue-400 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan UMKM'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}