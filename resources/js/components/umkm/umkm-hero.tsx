import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown, MapPin, Users, Award } from 'lucide-react';
import UmkmNavbar from './UmkmNavbar';

interface Stats {
    total_umkm: number;
    total_products: number;
    certified_halal: number;
    revenue_increase: number;
}

interface Props {
    stats?: Stats;
}

export default function UmkmHero({ stats }: Props) {
    // Default stats jika tidak ada data dari props
    const defaultStats = {
        total_umkm: 150,
        total_products: 25,
        certified_halal: 80,
        revenue_increase: 45
    };

    const displayStats = stats || defaultStats;

    return (
        <>
            {/* Navigation Bar - Menggunakan UmkmNavbar component */}
            <UmkmNavbar activeMenu="beranda" />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen bg-white overflow-hidden pt-20 pb-4">
                {/* Central Rounded Background Image Container - Bigger with margin 4 all sides */}
                <div className="relative m-4">
                    <div 
                        className="relative rounded-3xl overflow-hidden min-h-[calc(100vh-8rem)]"
                        style={{
                            
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url("/umkmassets/hero-section-background.png")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Content Container inside rounded background */}
                        <div className="relative z-10 h-full flex items-center">
                            <div className="container mx-auto px-8 py-16">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    {/* Left Content */}
                                    <div className="text-white ">
                                        <div className="mb-6">
                                            <span className="text-blue-200 text-lg font-medium">#1 UMKM provider in Karimunjawa</span>
                                        </div>
                                        
                                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
                                            New Economy<br />
                                            for the <span className="text-blue-300">Future</span>
                                        </h1>
                                        
                                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                            <Link 
                                                href="/umkm/list-umkm"
                                                className="inline-flex items-center space-x-2 text-white border border-white/30 px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                                            >
                                                <span>Lihat UMKM</span>
                                                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                            </Link>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Card - Bigger, no shadow, attached to bottom right with all corners rounded */}
                <div className="absolute bottom-0 right-0 bg-white rounded-tl-3xl border-l border-t border-white overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <svg className="w-full h-full" viewBox="0 0 500 250" fill="none">
                            <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
                                <circle cx="10" cy="10" r="1" fill="#3B82F6"/>
                            </pattern>
                            <rect width="500" height="250" fill="url(#dots)"/>
                        </svg>
                    </div>
                    
                    <div className="relative z-10 p-8">
                        <div className="grid grid-cols-3 gap-10 text-center min-w-[480px]">
                            <div className="group hover:transform hover:scale-105 transition-all duration-300">
                                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-3">
                                    {displayStats.total_umkm}+
                                </div>
                                <div className="text-sm text-gray-600 leading-tight font-medium">
                                    UMKM terdaftar<br />
                                    di Kemujan
                                </div>
                                <div className="w-10 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="group hover:transform hover:scale-105 transition-all duration-300">
                                <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-3">
                                    {displayStats.total_products}+
                                </div>
                                <div className="text-sm text-gray-600 leading-tight font-medium">
                                    Jenis produk<br />
                                    tersedia
                                </div>
                                <div className="w-10 h-1.5 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="group hover:transform hover:scale-105 transition-all duration-300">
                                <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-3">
                                    {displayStats.certified_halal}%
                                </div>
                                <div className="text-sm text-gray-600 leading-tight font-medium">
                                    Sertifikasi HALAL<br />
                                    terakreditasi
                                </div>
                                <div className="w-10 h-1.5 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}