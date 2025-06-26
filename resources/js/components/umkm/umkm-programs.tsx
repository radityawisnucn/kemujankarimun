import { MapPin, Phone, User, Star, ExternalLink, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';

// Interface untuk Social Media
interface SocialMedia {
    instagram?: string;
    facebook?: string;
}

// Interface untuk UMKM
interface UmkmData {
    id: number;
    name: string;
    owner: string;
    category: string;
    description: string;
    address: string;
    products: string[];
    contact: string;
    rating: number;
    image: string;
    socialMedia: SocialMedia;
    isVerified: boolean;
}

// Interface untuk Category
interface CategoryData {
    name: string;
    count: number;
}

export default function UmkmPrograms() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

    const umkmCategories: CategoryData[] = [
        { name: 'Semua', count: 28 },
        { name: 'Ikan & Seafood', count: 8 },
        { name: 'Rumput Laut', count: 6 },
        { name: 'Warung & Kuliner', count: 7 },
        { name: 'Kerajinan', count: 4 },
        { name: 'Jasa', count: 3 }
    ];

    const allUmkm: UmkmData[] = [
        {
            id: 1,
            name: "Ikan Asap Pak Budi",
            owner: "Budi Santoso",
            category: "Ikan & Seafood",
            description: "Spesialis ikan asap tradisional dengan cita rasa khas Karimunjawa. Menggunakan teknik pengasapan turun temurun dan ikan segar hasil tangkapan lokal.",
            address: "Jl. Pantai Utara No. 15, Kemujan",
            products: ["Ikan Tongkol Asap", "Ikan Tenggiri Asap", "Ikan Baronang Asap"],
            contact: "+62 812-3456-7890",
            rating: 4.8,
            image: "🐟",
            socialMedia: {
                instagram: "@ikanasappakbudi",
                facebook: "Ikan Asap Pak Budi Kemujan"
            },
            isVerified: true
        },
        {
            id: 2,
            name: "Rumput Laut Sari Bahari",
            owner: "Siti Aminah",
            category: "Rumput Laut",
            description: "Produksi dodol rumput laut, keripik rumput laut, dan minuman segar rumput laut. Menggunakan rumput laut organik hasil budidaya sendiri.",
            address: "Kampung Nelayan Blok A No. 8, Kemujan",
            products: ["Dodol Rumput Laut", "Keripik Rumput Laut", "Minuman Rumput Laut"],
            contact: "+62 856-7890-1234",
            rating: 4.9,
            image: "🌿",
            socialMedia: {
                instagram: "@saribahari_kemujan",
                facebook: "Rumput Laut Sari Bahari"
            },
            isVerified: true
        },
        {
            id: 3,
            name: "Warung Bu Lastri",
            owner: "Lastri Wulandari",
            category: "Warung & Kuliner",
            description: "Warung makan khas Karimunjawa dengan menu seafood segar dan masakan tradisional Jawa. Tempat favorit wisatawan dan warga lokal.",
            address: "Jl. Raya Kemujan No. 45, Kemujan",
            products: ["Sop Ikan Segar", "Cumi Bakar", "Nasi Gudeg Ikan", "Es Kelapa Muda"],
            contact: "+62 821-5678-9012",
            rating: 4.7,
            image: "🍽️",
            socialMedia: {
                instagram: "@warungbulastri"
            },
            isVerified: true
        },
        {
            id: 4,
            name: "Kerajinan Cangkang Kak Rina",
            owner: "Rina Sari Dewi",
            category: "Kerajinan",
            description: "Kerajinan tangan dari cangkang kerang dan bahan laut lainnya. Produk unik dan ramah lingkungan untuk souvenir dan dekorasi.",
            address: "Jl. Coral Garden No. 12, Kemujan",
            products: ["Lampu Hias Cangkang", "Gantungan Kunci", "Hiasan Dinding", "Vas Bunga"],
            contact: "+62 813-4567-8901",
            rating: 4.6,
            image: "🐚",
            socialMedia: {
                instagram: "@kerajinan_cangkang_rina",
                facebook: "Kerajinan Cangkang Kemujan"
            },
            isVerified: false
        },
        {
            id: 5,
            name: "Jasa Snorkeling Mas Agus",
            owner: "Agus Setiawan",
            category: "Jasa",
            description: "Jasa guide snorkeling dan diving dengan pengalaman 15 tahun. Mengenal spot-spot terbaik di sekitar Karimunjawa untuk wisata bahari.",
            address: "Dermaga Kemujan, Kemujan",
            products: ["Paket Snorkeling", "Diving Guide", "Rental Alat Selam", "Island Hopping"],
            contact: "+62 819-2345-6789",
            rating: 4.9,
            image: "🤿",
            socialMedia: {
                instagram: "@snorkeling_masagus",
                facebook: "Snorkeling Guide Karimunjawa"
            },
            isVerified: true
        },
        {
            id: 6,
            name: "Warung Kopi Pantai",
            owner: "Joko Prabowo",
            category: "Warung & Kuliner",
            description: "Kedai kopi dengan pemandangan pantai yang indah. Menyajikan kopi lokal dan camilan ringan dengan suasana santai pinggir laut.",
            address: "Pantai Kemujan, sebelah Dermaga, Kemujan",
            products: ["Kopi Robusta Lokal", "Kopi Susu Gula Aren", "Pisang Goreng", "Singkong Keju"],
            contact: "+62 817-8901-2345",
            rating: 4.5,
            image: "☕",
            socialMedia: {
                instagram: "@warungkopipantai"
            },
            isVerified: false
        },
        {
            id: 7,
            name: "Ikan Segar Pak Hasan",
            owner: "Hasan Basri",
            category: "Ikan & Seafood",
            description: "Supplier ikan segar hasil tangkapan langsung dari laut Karimunjawa. Melayani pembelian retail dan grosir untuk restoran.",
            address: "Pasar Ikan Kemujan No. 3, Kemujan",
            products: ["Ikan Kakap", "Ikan Kerapu", "Udang Segar", "Cumi-cumi"],
            contact: "+62 815-1234-5678",
            rating: 4.7,
            image: "🦐",
            socialMedia: {
                facebook: "Ikan Segar Pak Hasan"
            },
            isVerified: true
        },
        {
            id: 8,
            name: "Budidaya Rumput Laut Maju",
            owner: "Wahyu Santosa",
            category: "Rumput Laut",
            description: "Pembudidaya rumput laut dengan teknologi modern. Menyediakan bibit rumput laut dan produk olahan untuk dijual ke seluruh Indonesia.",
            address: "Pantai Timur Kemujan, Kemujan",
            products: ["Bibit Rumput Laut", "Rumput Laut Kering", "Agar-agar Alami"],
            contact: "+62 822-9876-5432",
            rating: 4.8,
            image: "🌊",
            socialMedia: {
                instagram: "@rumputlaut_maju",
                facebook: "Budidaya Rumput Laut Maju"
            },
            isVerified: true
        },
        {
            id: 9,
            name: "Souvenir Karang Pak Dedi",
            owner: "Dedi Kurniawan",
            category: "Kerajinan",
            description: "Kerajinan souvenir dari karang mati dan bahan alami laut. Ramah lingkungan dan mendukung konservasi terumbu karang.",
            address: "Jl. Wisata Laut No. 7, Kemujan",
            products: ["Miniatur Kapal", "Hiasan Karang", "Gantungan Kunci Karang", "Foto Frame"],
            contact: "+62 818-7654-3210",
            rating: 4.4,
            image: "🪸",
            socialMedia: {
                instagram: "@souvenir_karang_dedi"
            },
            isVerified: false
        },
        {
            id: 10,
            name: "Rental Perahu Wisata",
            owner: "Supriadi",
            category: "Jasa",
            description: "Jasa sewa perahu untuk wisata island hopping, fishing trip, dan transportasi antar pulau. Perahu terawat dengan kapten berpengalaman.",
            address: "Dermaga Utama Kemujan, Kemujan",
            products: ["Sewa Perahu Harian", "Paket Island Hopping", "Fishing Trip", "Charter Boat"],
            contact: "+62 811-2468-1357",
            rating: 4.6,
            image: "⛵",
            socialMedia: {
                instagram: "@rental_perahu_kemujan",
                facebook: "Rental Perahu Wisata Kemujan"
            },
            isVerified: true
        }
    ];

    // Filter UMKM berdasarkan kategori yang dipilih
    const filteredUmkm: UmkmData[] = selectedCategory === 'Semua' 
        ? allUmkm 
        : allUmkm.filter((umkm: UmkmData) => umkm.category === selectedCategory);

    // Update count untuk kategori "Semua" berdasarkan total UMKM
    const updatedCategories: CategoryData[] = umkmCategories.map((cat: CategoryData) => {
        if (cat.name === 'Semua') {
            return { ...cat, count: allUmkm.length };
        }
        return {
            ...cat,
            count: allUmkm.filter((umkm: UmkmData) => umkm.category === cat.name).length
        };
    });

    return (
        <section id="programs" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        UMKM Desa Kemujan 🏪
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Jelajahi beragam usaha mikro, kecil, dan menengah yang ada di Desa Kemujan, Karimunjawa. 
                        Dari hasil laut segar hingga kerajinan unik, temukan produk lokal terbaik langsung dari pengusaha setempat.
                    </p>
                    
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {updatedCategories.map((category: CategoryData, index: number) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    selectedCategory === category.name
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                                }`}
                            >
                                {category.name} ({category.count})
                            </button>
                        ))}
                    </div>

                    {/* Filter Result Info */}
                    <div className="text-sm text-gray-600 mb-8">
                        {selectedCategory === 'Semua' 
                            ? `Menampilkan semua ${filteredUmkm.length} UMKM di Desa Kemujan`
                            : `Menampilkan ${filteredUmkm.length} UMKM kategori "${selectedCategory}"`
                        }
                    </div>
                </div>

                {/* UMKM Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredUmkm.map((umkm: UmkmData) => (
                        <div key={umkm.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                            {/* UMKM Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                            <span className="text-3xl">{umkm.image}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h3 className="font-bold text-gray-900 text-lg">{umkm.name}</h3>
                                                {umkm.isVerified && (
                                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs">✓</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <User className="w-4 h-4" />
                                                <span>{umkm.owner}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                        {umkm.category}
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: 5 }, (_, i: number) => (
                                            <Star 
                                                key={i} 
                                                className={`w-4 h-4 ${
                                                    i < Math.floor(umkm.rating) 
                                                        ? 'text-yellow-400 fill-current' 
                                                        : 'text-gray-300'
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{umkm.rating}</span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{umkm.description}</p>

                                {/* Address */}
                                <div className="flex items-start space-x-2 mb-4">
                                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600">{umkm.address}</span>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="p-6 border-b border-gray-100">
                                <h4 className="font-semibold text-gray-900 mb-3">Produk Unggulan:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {umkm.products.slice(0, 3).map((product: string, idx: number) => (
                                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                            {product}
                                        </span>
                                    ))}
                                    {umkm.products.length > 3 && (
                                        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                            +{umkm.products.length - 3} lainnya
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Contact & Social Media */}
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-700">{umkm.contact}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {umkm.socialMedia.instagram && (
                                            <a 
                                                href="#" 
                                                className="text-pink-600 hover:text-pink-700 transition-colors"
                                                aria-label="Instagram"
                                            >
                                                <Instagram className="w-4 h-4" />
                                            </a>
                                        )}
                                        {umkm.socialMedia.facebook && (
                                            <a 
                                                href="#" 
                                                className="text-blue-600 hover:text-blue-700 transition-colors"
                                                aria-label="Facebook"
                                            >
                                                <Facebook className="w-4 h-4" />
                                            </a>
                                        )}
                                        <button 
                                            className="text-gray-600 hover:text-blue-600 transition-colors"
                                            aria-label="External Link"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredUmkm.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Tidak ada UMKM ditemukan
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Belum ada UMKM terdaftar untuk kategori "{selectedCategory}"
                        </p>
                        <button 
                            onClick={() => setSelectedCategory('Semua')}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Lihat Semua UMKM
                        </button>
                    </div>
                )}

                {/* Load More & CTA */}
                {filteredUmkm.length > 0 && (
                    <div className="text-center">
                        <div className="mb-4">
                            <span className="text-gray-600">
                                Menampilkan {filteredUmkm.length} dari {allUmkm.length} UMKM
                            </span>
                        </div>
                        <p className="text-gray-600">
                            Ingin mendaftarkan UMKM Anda? 
                            <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                                Hubungi kami →
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}