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
                            className="relative group cursor-pointer overflow-hidden rounded-xl"
                            onClick={() => setSelectedImage(image.src)}
                        >
                            {/* Placeholder for image */}
                            <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                        <span className="text-2xl">📸</span>
                                    </div>
                                    <p className="font-medium">{image.alt}</p>
                                    <span className="text-sm text-blue-200">{image.category}</span>
                                </div>
                            </div>
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <p className="font-semibold mb-1">{image.alt}</p>
                                    <span className="text-sm text-yellow-400">{image.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl w-full">
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        
                        {/* Placeholder for enlarged image */}
                        <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                            <div className="text-center text-white">
                                <div className="w-24 h-24 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-4xl">📸</span>
                                </div>
                                <p className="text-xl font-medium">Preview Gambar</p>
                                <p className="text-blue-200">Ganti dengan gambar asli</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}