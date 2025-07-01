import React from 'react';
import { 
    FileText, 
    Map, 
    Download, 
    MapPin, 
    Users, 
    Waves, 
    Fish,
    Camera,
    Anchor,
    ExternalLink
} from 'lucide-react';

export default function UmkmAbout() {
    return (
        <section id="about" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Tentang Desa Kemujan
                            <span className="block text-blue-600">Karimunjawa</span>
                        </h2>
                        
                        <div className="prose prose-lg text-gray-600 mb-8">
                            <p className="mb-4">
                                Desa Kemujan merupakan salah satu desa di Kepulauan Karimunjawa, 
                                Kabupaten Jepara, Jawa Tengah. Sebagai bagian dari Taman Nasional 
                                Karimunjawa, desa ini memiliki potensi wisata bahari yang luar biasa 
                                dengan keindahan pantai, terumbu karang, dan kekayaan laut yang melimpah.
                            </p>
                            
                            <p className="mb-4">
                                Masyarakat Desa Kemujan sebagian besar berprofesi sebagai nelayan, 
                                petani rumput laut, dan pelaku usaha pariwisata. Berbagai UMKM berkembang 
                                pesat di desa ini, mulai dari produk olahan seafood, kerajinan khas 
                                Karimunjawa, homestay, hingga jasa wisata bahari.
                            </p>
                            
                            <p>
                                Dengan dukungan pemerintah daerah dan komitmen masyarakat untuk 
                                melestarikan lingkungan, Desa Kemujan terus mengembangkan ekonomi 
                                berkelanjutan yang bersinergi dengan konservasi alam.
                            </p>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center justify-center mb-2">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-blue-600">2,500+</div>
                                <div className="text-sm text-gray-600">Penduduk</div>
                            </div>
                            
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="flex items-center justify-center mb-2">
                                    <Anchor className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-2xl font-bold text-green-600">150+</div>
                                <div className="text-sm text-gray-600">UMKM Aktif</div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Waves className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-gray-700">Wisata Bahari & Diving</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <Fish className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-gray-700">Budidaya Rumput Laut</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Camera className="w-4 h-4 text-orange-600" />
                                </div>
                                <span className="text-gray-700">Destinasi Eco-Tourism</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Documents & Map */}
                    <div className="space-y-6">
                        {/* Download Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                                Dokumen & Peta UMKM
                            </h3>
                            
                            <div className="space-y-4">
                                {/* PDF Dokumen UMKM */}
                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">Profil UMKM Kemujan</h4>
                                            <p className="text-sm text-gray-600">Data lengkap UMKM di Desa Kemujan</p>
                                        </div>
                                        <a 
                                            href="/documents/umkm-kemujan-profile.pdf" 
                                            download
                                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Download</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Peta Persebaran UMKM */}
                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Map className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">Peta Persebaran UMKM</h4>
                                            <p className="text-sm text-gray-600">Lokasi sebaran UMKM di Desa Kemujan</p>
                                        </div>
                                        <a 
                                            href="/maps/umkm-distribution-map.pdf" 
                                            download
                                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Download</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map Preview */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4">
                                <h4 className="text-white font-semibold flex items-center">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Lokasi Desa Kemujan
                                </h4>
                            </div>
                            
                            {/* Map Container */}
                            <div className="relative h-64 bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
                                {/* Placeholder Map - Bisa diganti dengan Google Maps embed atau Leaflet */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                                        <p className="text-gray-700 font-medium">Desa Kemujan</p>
                                        <p className="text-sm text-gray-600">Karimunjawa, Jepara</p>
                                        <p className="text-xs text-gray-500 mt-1">-5.8167°S, 110.4167°E</p>
                                    </div>
                                </div>
                                
                                {/* Decorative elements */}
                                <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-6 left-6 w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="absolute top-1/2 left-4 w-2 h-2 bg-green-500 rounded-full"></div>
                                
                                {/* Overlay untuk menunjukkan ini adalah preview */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                                    <a 
                                        href="https://maps.google.com/?q=Desa+Kemujan+Karimunjawa" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 text-white text-sm hover:text-blue-200 transition-colors"
                                    >
                                        <span>Lihat di Google Maps</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}