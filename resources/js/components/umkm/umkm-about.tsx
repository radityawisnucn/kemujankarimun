import { Users, Target, Award, TrendingUp, Play } from 'lucide-react';

export default function UmkmAbout() {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Kenali <span className="text-blue-600">UMKM Turus</span> 💛
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left Content - Image */}
                    <div className="relative">
                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                            <div className="aspect-video bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <span className="text-3xl">🏘️</span>
                                    </div>
                                    <p className="text-blue-800 font-semibold">Kantor UMKM Turus</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Floating Cards */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl border">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 text-sm">✓</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Profile Desa</div>
                                    <div className="text-sm text-gray-600">Lengkap & Terpercaya</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div>
                        <div className="space-y-6">
                            <div className="border-l-4 border-blue-600 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">🔍 Profile Desa</h3>
                                <p className="text-gray-600">
                                    UMKM Turus terletak di Kecamatan Polanharjo, Klaten, Jawa Tengah dengan 
                                    wilayah yang terdiri dari 4 RW dan 13 RT. Desa ini memiliki potensi besar 
                                    dalam pengembangan ekonomi kreatif dan pengolahan hasil laut.
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-green-600 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">🌊 Sejarah Desa</h3>
                                <p className="text-gray-600">
                                    Bermula dari kebutuhan masyarakat untuk mengembangkan ekonomi lokal, 
                                    UMKM Turus didirikan sebagai wadah pemberdayaan masyarakat dalam 
                                    mengolah potensi sumber daya alam yang berkelanjutan.
                                </p>
                            </div>
                            
                            <div className="border-l-4 border-yellow-500 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">⚡ Visi & Misi Desa</h3>
                                <p className="text-gray-600">
                                    Menjadi pusat UMKM terdepan dalam pengolahan hasil laut yang 
                                    berkelanjutan dan memberdayakan ekonomi masyarakat lokal untuk 
                                    mencapai kesejahteraan bersama.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Section */}
                <div className="bg-gray-50 rounded-2xl p-8 mb-16">
                    <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Kenali Desa Turus dalam 10 menit! 📹
                    </h3>
                    
                    <div className="relative max-w-4xl mx-auto">
                        <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <button className="group">
                                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-lg">
                                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                    </div>
                                </button>
                            </div>
                        </div>
                        
                        <div className="text-center mt-4">
                            <p className="text-gray-600">
                                Profile Desa Turus, Polanharjo, Klaten [KKN UNDIP]
                            </p>
                        </div>
                    </div>
                </div>

                {/* Collaboration Section */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Program KKN UNDIP</h3>
                    
                    <div className="flex items-center justify-center space-x-8 mb-6">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🎓</span>
                        </div>
                        <div className="text-4xl text-gray-300">~</div>
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🏛️</span>
                        </div>
                    </div>
                    
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Pada tahun 1971, Departemen Pendidikan dan Kebudayaan memulai program pengabdian 
                        masyarakat yang menjadi Kuliah Kerja Nyata (KKN) di UNDIP, mengintegrasikan 
                        pendidikan, penelitian, dan pengabdian masyarakat untuk pemberdayaan komunitas lokal.
                    </p>
                </div>
            </div>
        </section>
    );
}