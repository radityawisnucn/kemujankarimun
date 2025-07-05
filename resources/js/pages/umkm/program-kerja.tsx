// File: resources/js/pages/umkm/program-kerja.tsx

import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Target, Users, Lightbulb, TrendingUp, ArrowRight, Mail, Phone, MapPin, Send, Linkedin, Github, Instagram } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import UmkmNavbar from '@/components/umkm/UmkmNavbar';
import UmkmFooter from '@/components/umkm/umkm-footer';

const programKerja = [
    {
        title: "Pemberdayaan UMKM Lokal",
        description: "Program pelatihan dan pendampingan untuk meningkatkan kualitas produk dan pemasaran UMKM di Desa Kemujan.",
        icon: <Users className="w-8 h-8" />,
        goals: [
            "Meningkatkan keterampilan wirausaha",
            "Memperluas jaringan pemasaran",
            "Meningkatkan kualitas produk"
        ]
    },
    {
        title: "Inovasi Teknologi Rumput Laut",
        description: "Penerapan teknologi modern dalam budidaya dan pengolahan rumput laut untuk meningkatkan produktivitas.",
        icon: <Lightbulb className="w-8 h-8" />,
        goals: [
            "Implementasi teknik budidaya modern",
            "Pengembangan produk inovatif",
            "Transfer teknologi kepada nelayan"
        ]
    },
    {
        title: "Peningkatan Ekonomi Nelayan",
        description: "Program khusus untuk meningkatkan kesejahteraan nelayan melalui diversifikasi usaha dan peningkatan nilai tambah.",
        icon: <TrendingUp className="w-8 h-8" />,
        goals: [
            "Diversifikasi mata pencaharian",
            "Peningkatan nilai tambah produk",
            "Pembentukan koperasi nelayan"
        ]
    },
    {
        title: "Keberlanjutan Lingkungan",
        description: "Menjaga kelestarian lingkungan laut sambil mengembangkan ekonomi maritim yang berkelanjutan.",
        icon: <Target className="w-8 h-8" />,
        goals: [
            "Konservasi ekosistem laut",
            "Pengelolaan limbah berkelanjutan",
            "Edukasi lingkungan hidup"
        ]
    }
];

const teamMembers = [
    {
        name: "Wisnu",
        role: "FT",
        image: "👨‍💻",
        bg: "bg-gradient-to-br from-gray-400 to-gray-600"
    },
    {
        name: "Leila",
        role: "FPSI",
        image: "👩‍🎓",
        bg: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
        name: "Najwan",
        role: "FPP", 
        image: "👨‍🌾",
        bg: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
        name: "Tondi",
        role: "FPIK",
        image: "👨‍🔬",
        bg: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
        name: "Naomi",
        role: "SV",
        image: "👩‍💼",
        bg: "bg-gradient-to-br from-orange-400 to-orange-600"
    },
    {
        name: "Nareswari",
        role: "FISIP",
        image: "👩‍💼",
        bg: "bg-gradient-to-br from-red-400 to-red-600"
    },
    {
        name: "Pramesty",
        role: "FISIP",
        image: "👩‍💻",
        bg: "bg-gradient-to-br from-pink-400 to-pink-600"
    },
    {
        name: "Revinda",
        role: "FPIK",
        image: "👩‍🔬",
        bg: "bg-gradient-to-br from-cyan-400 to-cyan-600"
    },
    {
        name: "Rianza",
        role: "FH",
        image: "👨‍⚖️",
        bg: "bg-gradient-to-br from-yellow-400 to-yellow-600"
    },
    {
        name: "Galang",
        role: "SV",
        image: "👨‍💼",
        bg: "bg-gradient-to-br from-amber-400 to-amber-600"
    }
];

export default function ProgramKerja() {
    return (
        <>
            <Head title="Program Kerja - UMKM Desa Kemujan" />
            
            {/* Navbar */}
            <UmkmNavbar activeMenu="program-kerja" />
            <div className="min-h-screen bg-gray-50">
                
                {/* Tim KKN Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        {/* Meet Our Team Section */}
                        <div className="text-center mb-20">
                            <h2 className="text-5xl font-bold text-gray-900 mb-16">
                                Temu Sapa dengan Tim KKN 👋
                            </h2>
                            
                            {/* Overlapping Team Photos Layout - All Members */}
                            <div className="flex justify-center items-center">
                                <div className="relative flex items-center">
                                    {teamMembers.map((member, index) => (
                                        <div 
                                            key={index} 
                                            className="relative group text-center"
                                            style={{
                                                marginLeft: index > 0 ? '-12px' : '0', // Reduced overlap for more space
                                                zIndex: teamMembers.length - index
                                            }}
                                        >
                                            {/* Main Photo Circle */}
                                            <div className={`w-20 h-20 lg:w-24 lg:h-24 ${member.bg} rounded-full flex items-center justify-center shadow-xl border-4 border-white group-hover:scale-110 transition-all duration-300 group-hover:z-50 relative mb-6`}>
                                                <span className="text-2xl lg:text-3xl">{member.image}</span>
                                                
                                                {/* Role Badge - Positioned further from name */}
                                                <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    {member.role}
                                                </div>
                                            </div>
                                            
                                            {/* Name Below Photo - Clean without border */}
                                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-max">
                                                <h3 className="font-semibold text-gray-900 text-sm lg:text-base whitespace-nowrap">
                                                    {member.name}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Program Kerja KKN
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Revitalisasi Budidaya Rumput Laut KappaphycusSP. Integrasi Inovasi Teknologi, 
                            Pemberdayaan Ekonomi Nelayan, dan Keberlanjutan Lingkungan di Desa Kemujan, Karimunjawa
                        </p>
                    </div>
                </div>

                {/* Program Cards */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {programKerja.map((program, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="p-8">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                            {program.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {program.title}
                                        </h3>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {program.description}
                                    </p>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Tujuan Program:</h4>
                                        <ul className="space-y-2">
                                            {program.goals.map((goal, goalIndex) => (
                                                <li key={goalIndex} className="flex items-start space-x-2">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-700">{goal}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Timeline Kegiatan
                        </h2>
                        
                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-8">
                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Fase 1: Persiapan dan Survei</h3>
                                        <p className="text-gray-600">21 Mei - 30 Mei 2025</p>
                                        <p className="text-gray-700 mt-2">Survei lokasi, identifikasi potensi UMKM, dan pemetaan kebutuhan masyarakat.</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Fase 2: Implementasi Program</h3>
                                        <p className="text-gray-600">31 Mei - 8 Juni 2025</p>
                                        <p className="text-gray-700 mt-2">Pelaksanaan pelatihan UMKM, workshop teknologi rumput laut, dan pendampingan usaha.</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Fase 3: Pengembangan Produk</h3>
                                        <p className="text-gray-600">23 Juni - 5 Juli 2025</p>
                                        <p className="text-gray-700 mt-2">Pengembangan produk inovatif, packaging, dan strategi pemasaran digital.</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        4
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Fase 4: Evaluasi dan Keberlanjutan</h3>
                                        <p className="text-gray-600">6 Juli - 13 Juli 2025</p>
                                        <p className="text-gray-700 mt-2">Evaluasi program, penyusunan rencana keberlanjutan, dan serah terima kegiatan.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-blue-600 text-white py-12">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-2xl font-bold mb-4">
                            Ingin Berpartisipasi dalam Program Kami?
                        </h3>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Bergabunglah dengan program pemberdayaan UMKM dan ikuti perkembangan terbaru kegiatan KKN di Desa Kemujan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/umkm/list-umkm"
                                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                            >
                                Lihat UMKM Partner
                            </Link>
                            <Link
                                href="/umkm#contact"
                                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Hubungi Tim KKN
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
            
            {/* Footer */}
            <UmkmFooter />
        </>
    );
}