import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Globe, 
    Facebook, 
    Instagram, 
    Twitter,
    Youtube,
    ExternalLink,
    Anchor,
    Waves,
    Fish
} from 'lucide-react';

export default function UmkmFooter() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🏝️</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">UMKM Kemujan</h3>
                                <p className="text-blue-200 text-sm">Karimunjawa</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Memberdayakan UMKM di Desa Kemujan, Karimunjawa untuk 
                            mengembangkan ekonomi berkelanjutan yang bersinergi 
                            dengan konservasi alam.
                        </p>
                        
                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#hero" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                                    <span>Beranda</span>
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Tentang Kemujan
                                </a>
                            </li>
                            <li>
                                <a href="#programs" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    UMKM Unggulan
                                </a>
                            </li>
                            <li>
                                <a href="#gallery" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Galeri Aktivitas
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Tim Kami
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* UMKM Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Kategori UMKM</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link 
                                    href={route('umkm.index', { category: 'Ikan & Seafood' })}
                                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                                >
                                    <Fish className="w-4 h-4 mr-2" />
                                    <span>Ikan & Seafood</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={route('umkm.index', { category: 'Rumput Laut' })}
                                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                                >
                                    <Waves className="w-4 h-4 mr-2" />
                                    <span>Rumput Laut</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={route('umkm.index', { category: 'Warung & Kuliner' })}
                                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                                >
                                    <span className="w-4 h-4 mr-2">🍽️</span>
                                    <span>Warung & Kuliner</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={route('umkm.index', { category: 'Kerajinan' })}
                                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                                >
                                    <span className="w-4 h-4 mr-2">🎨</span>
                                    <span>Kerajinan</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={route('umkm.index', { category: 'Jasa' })}
                                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                                >
                                    <Anchor className="w-4 h-4 mr-2" />
                                    <span>Jasa Wisata</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Desa Kemujan<br />
                                        Kec. Karimunjawa<br />
                                        Kab. Jepara, Jawa Tengah
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <p className="text-gray-300 text-sm">+62 291 XXX XXX</p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <p className="text-gray-300 text-sm">umkm.kemujan@karimunjawa.go.id</p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Globe className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <a 
                                    href="https://karimunjawa.go.id" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white text-sm transition-colors flex items-center"
                                >
                                    karimunjawa.go.id
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-4 md:mb-0">
                            © 2024 UMKM Desa Kemujan. Made with ♡ by Raditya Wisnu
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Kebijakan Privasi
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Syarat & Ketentuan
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Bantuan
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}