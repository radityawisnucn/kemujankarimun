import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ArrowLeft,
    MapPin, 
    Phone, 
    Star, 
    CheckCircle,
    Instagram,
    Facebook,
    Mail,
    ExternalLink,
    Clock,
    Award,
    Send
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

interface Props {
    umkm: Umkm;
    related_umkms?: Umkm[];
}

export default function UmkmDetail({ umkm, related_umkms }: Props) {
    const [showContactForm, setShowContactForm] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        umkm_id: umkm.id
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('umkm.contact.store'), {
            onSuccess: () => {
                reset();
                setShowContactForm(false);
            }
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
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

    return (
        <>
            <Head title={`${umkm.name} - UMKM Desa Turus`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <Link
                            href={route('umkm.index')}
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali ke Daftar UMKM</span>
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* UMKM Header */}
                            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">{umkm.image}</span>
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{umkm.name}</h1>
                                            <p className="text-lg text-gray-600 mb-2">Oleh: {umkm.owner}</p>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1">
                                                    {renderStars(umkm.rating)}
                                                    <span className="text-sm text-gray-500 ml-1">({umkm.rating})</span>
                                                </div>
                                                {umkm.is_verified && (
                                                    <div className="flex items-center space-x-1 text-green-600">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span className="text-sm font-medium">Terverifikasi</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                                            {umkm.category}
                                        </span>
                                        <p className="text-sm text-gray-500 mt-2">
                                            <Clock className="w-4 h-4 inline mr-1" />
                                            Bergabung {formatDate(umkm.created_at)}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Tentang UMKM</h2>
                                    <p className="text-gray-700 leading-relaxed">{umkm.description}</p>
                                </div>

                                {/* Products */}
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Produk & Layanan</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {umkm.products.map((product, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center"
                                            >
                                                <span className="text-sm font-medium text-gray-800">{product}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Lokasi</h2>
                                    <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{umkm.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Contact Info */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kontak</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <a 
                                            href={`tel:${umkm.contact}`}
                                            className="text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            {umkm.contact}
                                        </a>
                                    </div>

                                    {umkm.instagram && (
                                        <div className="flex items-center space-x-3">
                                            <Instagram className="w-5 h-5 text-pink-500" />
                                            <a
                                                href={umkm.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Instagram
                                            </a>
                                        </div>
                                    )}

                                    {umkm.facebook && (
                                        <div className="flex items-center space-x-3">
                                            <Facebook className="w-5 h-5 text-blue-600" />
                                            <a
                                                href={umkm.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Facebook
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setShowContactForm(!showContactForm)}
                                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>Kirim Pesan</span>
                                </button>
                            </div>

                            {/* Contact Form */}
                            {showContactForm && (
                                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Kirim Pesan</h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Telepon (Opsional)</label>
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                                            <textarea
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                rows={4}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                required
                                            />
                                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                            >
                                                <Send className="w-4 h-4" />
                                                <span>{processing ? 'Mengirim...' : 'Kirim Pesan'}</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowContactForm(false)}
                                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Related UMKMs */}
                            {related_umkms && related_umkms.length > 0 && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">UMKM Serupa</h3>
                                    <div className="space-y-4">
                                        {related_umkms.map((relatedUmkm) => (
                                            <Link
                                                key={relatedUmkm.id}
                                                href={route('umkm.show', relatedUmkm.id)}
                                                className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span className="text-sm">{relatedUmkm.image}</span>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="font-medium text-gray-900 truncate">{relatedUmkm.name}</h4>
                                                        <p className="text-sm text-gray-600 truncate">{relatedUmkm.owner}</p>
                                                        <div className="flex items-center space-x-1 mt-1">
                                                            {renderStars(relatedUmkm.rating)}
                                                            <span className="text-xs text-gray-500">({relatedUmkm.rating})</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}