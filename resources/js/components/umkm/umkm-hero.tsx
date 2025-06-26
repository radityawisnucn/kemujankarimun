import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export default function UmkmHero() {
    return (
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div 
                    className="h-full w-full repeat" 
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat'
                    }}
                ></div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    UMKM
                    <span className="block text-yellow-400">Olah Laut Kemujan</span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-8 opacity-90 font-light">
                    Mengembangkan Potensi Ekonomi Masyarakat Melalui Pengolahan Hasil Laut
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a 
                        href="#about"
                        className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Pelajari Lebih Lanjut
                    </a>
                    
                    <a 
                        href="#programs"
                        className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                        Lihat Program
                    </a>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <ChevronDown className="w-8 h-8 text-white animate-bounce" />
            </div>
            
            {/* Wave Animation */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-15">
                <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path 
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                        className="fill-white"
                    ></path>
                </svg>
            </div>
        </section>
    );
}