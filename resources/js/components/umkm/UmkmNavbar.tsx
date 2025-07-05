import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

interface Props {
    activeMenu?: string;
    className?: string;
}

export default function UmkmNavbar({ activeMenu, className = "" }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function untuk handle navigation ke section tertentu
    const handleSectionNavigation = (sectionId: string) => {
        const currentPath = window.location.pathname;
        
        // Jika sudah berada di halaman utama UMKM
        if (currentPath === '/umkm') {
            // Langsung scroll ke section
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Jika berada di halaman lain, redirect ke halaman UMKM dengan hash
            router.get(`/umkm#${sectionId}`);
        }
    };

    return (
        <>
            {/* Navigation Bar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 ${className}`}>
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🏝️</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900">UMKM Kemujan</span>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8 ml-auto mr-8">
                            <button 
                                onClick={() => handleSectionNavigation('hero')}
                                className={`text-gray-700 hover:text-blue-600 transition-colors ${activeMenu === 'beranda' ? 'text-blue-600' : ''}`}
                            >
                                Beranda
                            </button>
                            <button 
                                onClick={() => handleSectionNavigation('about')}
                                className={`text-gray-700 hover:text-blue-600 transition-colors ${activeMenu === 'tentang' ? 'text-blue-600' : ''}`}
                            >
                                Tentang
                            </button>
                            <Link 
                                href="/umkm/list-umkm" 
                                className={`text-gray-700 hover:text-blue-600 transition-colors ${activeMenu === 'umkm-unggulan' ? 'text-blue-600' : ''}`}
                            >
                                UMKM Unggulan
                            </Link>
                            <Link 
                                href="/umkm/program-kerja" 
                                className={`text-gray-700 hover:text-blue-600 transition-colors ${activeMenu === 'program-kerja' ? 'text-blue-600' : ''}`}
                            >
                                Program Kerja
                            </Link>
                        </div>

                        <a 
                            href="http://127.0.0.1:8000/"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Olah Laut Kemujan
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors ml-4"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            <button 
                                onClick={() => {
                                    handleSectionNavigation('hero');
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 ${activeMenu === 'beranda' ? 'text-blue-600' : ''}`}
                            >
                                Beranda
                            </button>
                            <button 
                                onClick={() => {
                                    handleSectionNavigation('about');
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 ${activeMenu === 'tentang' ? 'text-blue-600' : ''}`}
                            >
                                Tentang
                            </button>
                            <Link 
                                href="/umkm/list-umkm"
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 ${activeMenu === 'umkm-unggulan' ? 'text-blue-600' : ''}`}
                            >
                                UMKM Unggulan
                            </Link>
                            <Link 
                                href="/umkm/program-kerja"
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 ${activeMenu === 'program-kerja' ? 'text-blue-600' : ''}`}
                            >
                                Program Kerja
                            </Link>
                            <a 
                                href="http://127.0.0.1:8000/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                            >
                                Olah Laut Kemujan
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}