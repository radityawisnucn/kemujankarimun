import { Users, Target, Award, TrendingUp } from 'lucide-react';

export default function UmkmAbout() {
    const stats = [
        { icon: Users, label: 'UMKM Terdaftar', value: '150+' },
        { icon: Target, label: 'Produk Unggulan', value: '25+' },
        { icon: Award, label: 'Sertifikat HALAL', value: '80%' },
        { icon: TrendingUp, label: 'Peningkatan Omzet', value: '45%' }
    ];

    return (
        <section id="about" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Tentang Program 
                            <span className="text-blue-600"> UMKM Kami</span>
                        </h2>
                        
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Program UMKM Olah Laut Kemujan merupakan inisiatif untuk memberdayakan masyarakat 
                            pesisir dalam mengembangkan usaha pengolahan hasil laut yang berkelanjutan dan 
                            bernilai ekonomi tinggi.
                        </p>
                        
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Melalui pendampingan teknologi, pelatihan, dan akses pasar, kami membantu UMKM 
                            lokal untuk meningkatkan kualitas produk dan jangkauan pasar mereka.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                                <span className="font-semibold">Visi:</span> Menjadi pusat UMKM terdepan
                            </div>
                            <div className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg">
                                <span className="font-semibold">Misi:</span> Memberdayakan ekonomi lokal
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <stat.icon className="w-8 h-8 text-blue-600" />
                                    <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
                                </div>
                                <p className="text-gray-700 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}