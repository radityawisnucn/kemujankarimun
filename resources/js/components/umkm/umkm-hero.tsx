import { Link } from '@inertiajs/react';
import { ChevronDown, MapPin, Users, Award } from 'lucide-react';

export default function UmkmHero() {
    return (
        <>
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🏝️</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900">UMKM Kemujan</span>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Beranda</Link>
                            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">Tentang</a>
                            <a href="#programs" className="text-gray-700 hover:text-blue-600 transition-colors">Program</a>
                            <a href="#gallery" className="text-gray-700 hover:text-blue-600 transition-colors">Galeri</a>
                            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Kontak</a>
                        </div>
                        
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Bergabung
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Background Image with Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='ocean' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2387CEEB'/%3E%3Cstop offset='50%25' stop-color='%2320B2AA'/%3E%3Cstop offset='100%25' stop-color='%23006994'/%3E%3C/linearGradient%3E%3ClinearGradient id='sand' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23F4A460'/%3E%3Cstop offset='100%25' stop-color='%23DEB887'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='500' fill='url(%23ocean)'/%3E%3Cpath d='M0,400 Q300,350 600,380 T1200,360 L1200,500 Q900,480 600,500 T0,490 Z' fill='url(%23sand)'/%3E%3Ccircle cx='100' cy='100' r='40' fill='%23FFD700' opacity='0.8'/%3E%3Cpath d='M50,600 Q150,580 250,600 T450,590 Q550,585 650,595 T850,600 Q950,605 1050,595 T1200,600 L1200,800 L0,800 Z' fill='%2332CD32' opacity='0.6'/%3E%3C/svg%3E")`
                    }}
                ></div>

                {/* Content Container */}
                <div className="relative z-10 min-h-screen flex items-center">
                    <div className="container mx-auto px-4 py-20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-white">
                                <div className="mb-6">
                                    <span className="text-blue-200 text-lg font-medium">#1 UMKM provider in Karimunjawa</span>
                                </div>
                                
                                <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
                                    New Economy<br />
                                    for the <span className="text-blue-300">Future</span>
                                </h1>
                                
                                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                    <a 
                                        href="#about"
                                        className="inline-flex items-center space-x-2 text-white border border-white/30 px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                                    >
                                        <span>Get in touch</span>
                                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                    </a>
                                    <a 
                                        href="#programs"
                                        className="inline-flex items-center space-x-2 text-white border border-white/30 px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                                    >
                                        <span>Our services</span>
                                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                    </a>
                                </div>
                            </div>
                            
                            {/* Right Content - Floating Cards */}
                            <div className="relative">
                                {/* UMKM Unggulan Card - Positioned like reference */}
                                <div className="absolute top-2 right-8 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-sm border border-gray-100">
                                    {/* Card Header */}
                                    <div className="p-6 pb-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-gray-900 text-lg">UMKM Unggulan</h3>
                                            <button className="text-gray-400 hover:text-gray-600">⋯</button>
                                        </div>
                                    </div>
                                    
                                    {/* UMKM Image with Border/Padding like reference */}
                                    <div className="px-6 pb-4">
                                        <div className="relative bg-white rounded-xl shadow-lg border-2 border-gray-100 p-4 overflow-hidden">
                                            {/* Image Container with padding/border effect */}
                                            <div className="w-full h-36 bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                                                {/* Seaweed/Ocean Pattern Background */}
                                                <div className="absolute inset-0 opacity-20">
                                                    <svg className="w-full h-full" viewBox="0 0 200 150" fill="none">
                                                        <path d="M20 120 Q30 100 40 120 T60 120 Q70 100 80 120 T100 120" stroke="#10B981" strokeWidth="2" fill="none"/>
                                                        <path d="M120 130 Q130 110 140 130 T160 130 Q170 110 180 130" stroke="#059669" strokeWidth="2" fill="none"/>
                                                        <circle cx="50" cy="40" r="15" fill="#3B82F6" opacity="0.3"/>
                                                        <circle cx="150" cy="30" r="20" fill="#06B6D4" opacity="0.2"/>
                                                    </svg>
                                                </div>
                                                
                                                {/* Main Content */}
                                                <div className="text-center z-10">
                                                    <span className="text-4xl mb-2 block">🌿</span>
                                                    <p className="text-sm text-gray-700 font-semibold">Keripik Rumput Laut</p>
                                                    <p className="text-xs text-gray-500">Premium Quality</p>
                                                </div>
                                                
                                                {/* Corner Decoration */}
                                                <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full opacity-60"></div>
                                                <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                                            </div>
                                            
                                            {/* Product Info */}
                                            <div className="mt-3 text-center">
                                                <p className="text-sm text-gray-600">⭐ 4.8 rating • 150+ pelanggan</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Card Footer */}
                                    <div className="px-6 pb-6">
                                        <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Card - Bottom Right Corner (Updated Design) */}
                <div className="absolute bottom-0 right-0 bg-white rounded-tl-3xl shadow-2xl border-l-2 border-t-2 border-gray-100 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                            <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
                                <circle cx="10" cy="10" r="1" fill="#3B82F6"/>
                            </pattern>
                            <rect width="400" height="200" fill="url(#dots)"/>
                        </svg>
                    </div>
                    
                    <div className="relative z-10 p-8">
                        <div className="grid grid-cols-3 gap-8 text-center min-w-[400px]">
                            <div className="group hover:transform hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                                    150+
                                </div>
                                <div className="text-sm text-gray-600 leading-tight">
                                    UMKM terdaftar<br />
                                    di Kemujan
                                </div>
                                <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="group hover:transform hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                                    25+
                                </div>
                                <div className="text-sm text-gray-600 leading-tight">
                                    Program unggulan<br />
                                    berkelanjutan
                                </div>
                                <div className="w-8 h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="group hover:transform hover:scale-105 transition-all duration-300">
                                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2">
                                    80%
                                </div>
                                <div className="text-sm text-gray-600 leading-tight">
                                    Sertifikasi HALAL<br />
                                    terakreditasi
                                </div>
                                <div className="w-8 h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <a 
                        href="#about"
                        className="block text-white hover:text-blue-200 transition-colors"
                    >
                        <ChevronDown className="w-8 h-8 animate-bounce" />
                    </a>
                </div>
            </section>
        </>
    );
}