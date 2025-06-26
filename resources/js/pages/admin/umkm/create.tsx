import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

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
        <>
            <Head title="Tambah UMKM" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Link
                        href={route('admin.umkm.index')}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tambah UMKM</h1>
                        <p className="text-gray-600 mt-1">Tambahkan UMKM baru ke dalam sistem</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
                    <div className="p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama UMKM *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: Ikan Asap Pak Budi"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Pemilik *
                                </label>
                                <input
                                    type="text"
                                    value={data.owner}
                                    onChange={(e) => setData('owner', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: Budi Santoso"
                                    required
                                />
                                {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori *
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kontak (WhatsApp) *
                                </label>
                                <input
                                    type="text"
                                    value={data.contact}
                                    onChange={(e) => setData('contact', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: +62 812-3456-7890"
                                    required
                                />
                                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi *
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ceritakan tentang UMKM ini, keunggulan, dan hal menarik lainnya..."
                                required
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Alamat *
                            </label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Contoh: Jl. Pantai Utara No. 15, Kemujan"
                                required
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>

                        {/* Products */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Produk Unggulan *
                                </label>
                                <button
                                    type="button"
                                    onClick={addProduct}
                                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah Produk</span>
                                </button>
                            </div>
                            <div className="space-y-3">
                                {data.products.map((product, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={product}
                                            onChange={(e) => updateProduct(index, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder={`Produk ${index + 1}`}
                                            required
                                        />
                                        {data.products.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeProduct(index)}
                                                className="p-2 text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {errors.products && <p className="text-red-500 text-sm mt-1">{errors.products}</p>}
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating (0-5)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={data.rating}
                                    onChange={(e) => setData('rating', parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ikon/Emoji
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {emojiOptions.map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => setData('image', emoji)}
                                            className={`p-2 text-xl border rounded-lg hover:bg-gray-50 ${
                                                data.image === emoji
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Instagram (opsional)
                                </label>
                                <input
                                    type="text"
                                    value={data.instagram}
                                    onChange={(e) => setData('instagram', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="@username atau link lengkap"
                                />
                                {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Facebook (opsional)
                                </label>
                                <input
                                    type="text"
                                    value={data.facebook}
                                    onChange={(e) => setData('facebook', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nama halaman atau link lengkap"
                                />
                                {errors.facebook && <p className="text-red-500 text-sm mt-1">{errors.facebook}</p>}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_verified"
                                    checked={data.is_verified}
                                    onChange={(e) => setData('is_verified', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_verified" className="ml-2 text-sm text-gray-700">
                                    UMKM Terverifikasi
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                                    Status Aktif
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                        <div className="flex justify-end space-x-3">
                            <Link
                                href={route('admin.umkm.index')}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan UMKM'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}