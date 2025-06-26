import { useState } from 'react';
import { X } from 'lucide-react';

export default function UmkmGallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
    // Placeholder images - ganti dengan gambar asli UMKM
    const galleryImages = [
        { src: '/images/umkm/umkm-1.jpg', alt: 'Proses Pengolahan Rumput Laut', category: 'Produksi' },
        { src: '/images/umkm/umkm-2.jpg', alt: 'Produk Olahan Ikan', category: 'Produk' },
        { src: '/images/umkm/umkm-3.jpg', alt: 'Pelatihan UMKM', category: 'Pelatihan' },
        { src: '/images/umkm/umkm-4.jpg', alt: 'Packaging Produk', category: 'Packaging' },
        { src: '/images/umkm/umkm-5.jpg', alt: 'Pameran Produk UMKM', category: 'Event' },
        { src: '/images/umkm/umkm-6.jpg', alt: 'Sertifikasi HALAL', category: 'Sertifikat' }
    ];

    return (
        <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Galeri <span className="text-yellow-400">Aktivitas</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Dokumentasi kegiatan dan pencapaian UMKM Olah Laut Kemujan
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => (
                        <div 
                            key={index}
                            className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-800"
                            onClick={() => setSelectedImage(image.src)}
                        >
                            <div className="aspect-w-16 aspect-h-9 bg-gray-800 p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gray-600 rounded-lg mb-4 mx-auto flex items-center justify-center">
                                        <span className="text-gray-400 text-2xl">📷</span>
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">{image.alt}</h3>
                                    <span className="inline-block bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                                        {image.category}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-semibold">Lihat Gambar</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Modal untuk gambar yang dipilih */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                        <div className="relative max-w-4xl max-h-full">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                            >
                                <X className="w-8 h-8" />
                            </button>
                            <div className="bg-gray-800 p-8 rounded-xl">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gray-600 rounded-lg mb-4 mx-auto flex items-center justify-center">
                                        <span className="text-gray-400 text-4xl">📷</span>
                                    </div>
                                    <p className="text-white">Gambar akan ditampilkan di sini</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}