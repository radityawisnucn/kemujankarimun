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

                    {/* Right Content */}
                    <div className="space-y-6">
                        {/* Documents & Maps Section */}
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Dokumen & Peta UMKM</h3>
                            
                            <div className="space-y-4">
                                {/* Profil UMKM Kemujan */}
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

                        {/* Google Maps Container - UPDATED */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Google Maps Embed */}
                            <div className="relative h-80">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d34450.44805372992!2d110.46370367371266!3d-5.798838515507821!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e710d247285d9d1%3A0xf1344cb6f1b9d391!2sKemujan%2C%20Karimunjawa%2C%20Jepara%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1751488321918!5m2!1sen!2sid"
                                    width="100%"
                                    height="320"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full"
                                    title="Lokasi Desa Kemujan, Karimunjawa"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}