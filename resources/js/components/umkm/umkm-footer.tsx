import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';

export default function UmkmFooter() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">UMKM Olah Laut</h3>
                        <p className="text-gray-300 mb-6">
                            Memberdayakan ekonomi masyarakat pesisir melalui pengolahan hasil laut berkelanjutan.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <Youtube className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <Mail className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Menu Utama</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Beranda</Link></li>
                            <li><Link href="/products" className="text-gray-300 hover:text-yellow-400 transition-colors">Produk</Link></li>
                            <li><Link href="/seaweed-type" className="text-gray-300 hover:text-yellow-400 transition-colors">Jenis Rumput Laut</Link></li>
                            <li><Link href="/user/processing-methods" className="text-gray-300 hover:text-yellow-400 transition-colors">Metode Pengolahan</Link></li>
                        </ul>
                    </div>
                    
                    {/* Programs */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Program</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>Pelatihan & Edukasi</li>
                            <li>Bantuan Teknologi</li>
                            <li>Akses Pasar</li>
                            <li>Sertifikasi</li>
                        </ul>
                    </div>
                    
                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                        <div className="space-y-2 text-gray-300">
                            <p>Desa Kemujan, Karimunjawa</p>
                            <p>Jepara, Jawa Tengah</p>
                            <p>+62 123-4567-8901</p>
                            <p>umkm@olahlautkemujan.id</p>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 UMKM Olah Laut Kemujan. Semua hak dilindungi.</p>
                </div>
            </div>
        </footer>
    );
}