import { BookOpen, Wrench, ShoppingCart, Award } from 'lucide-react';

export default function UmkmPrograms() {
    const programs = [
        {
            icon: BookOpen,
            title: 'Pelatihan & Edukasi',
            description: 'Program pelatihan pengolahan hasil laut, manajemen usaha, dan marketing digital untuk meningkatkan kemampuan UMKM.',
            features: ['Teknik Pengolahan Modern', 'Manajemen Keuangan', 'Digital Marketing', 'Standar Keamanan Pangan']
        },
        {
            icon: Wrench,
            title: 'Bantuan Teknologi',
            description: 'Penyediaan peralatan modern dan teknologi tepat guna untuk meningkatkan efisiensi dan kualitas produksi.',
            features: ['Mesin Pengolahan', 'Alat Packaging', 'Sistem Pendingin', 'Quality Control Tools']
        },
        {
            icon: ShoppingCart,
            title: 'Akses Pasar',
            description: 'Membantu UMKM dalam mengakses pasar yang lebih luas melalui platform digital dan kemitraan strategis.',
            features: ['E-commerce Platform', 'Pameran Produk', 'Kemitraan B2B', 'Export Opportunity']
        },
        {
            icon: Award,
            title: 'Sertifikasi',
            description: 'Pendampingan dalam memperoleh sertifikasi HALAL, HACCP, dan standar kualitas lainnya.',
            features: ['Sertifikat HALAL', 'HACCP Certification', 'SNI Standard', 'Organic Certification']
        }
    ];

    return (
        <section id="programs" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Program <span className="text-blue-600">Pemberdayaan</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Berbagai program komprehensif untuk mendukung pengembangan UMKM olah laut yang berkelanjutan
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {programs.map((program, index) => (
                        <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-600 p-3 rounded-xl mr-4">
                                    <program.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                            </div>
                            
                            <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                            
                            <div className="space-y-2">
                                {program.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}