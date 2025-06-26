import { Link } from '@inertiajs/react';

export default function UmkmFooter() {
    const currentYear = new Date().getFullYear();

    const navigationLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Kegiatan', href: '#programs' },
        { name: 'Program Kerja KKN', href: '#programs' }
    ];

    const categoryLinks = [
        { name: 'Keagamaan', href: '#' },
        { name: 'Kesehatan', href: '#' },
        { name: 'Kebudayaan', href: '#' },
        { name: 'UMKM', href: '#' }
    ];

    const programLinks = [
        { name: 'Multi Disiplin', href: '#' },
        { name: 'Mono Disiplin', href: '#' }
    ];

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                                <span className="text-gray-900 font-bold text-lg">🏘️</span>
                            </div>
                            <span className="font-bold text-xl">Desa Turus</span>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Desa Turus, Kecamatan Polanharjo, Kabupaten Klaten - 
                            Mengembangkan potensi ekonomi masyarakat melalui UMKM berkelanjutan.
                        </p>
                        <p className="text-sm text-gray-400">
                            Built with ❤️ by Pramudya Diagusta
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Beranda</h4>
                        <ul className="space-y-3">
                            {navigationLinks.map((link, index) => (
                                <li key={index}>
                                    {link.href.startsWith('/') ? (
                                        <Link
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Kegiatan</h4>
                        <ul className="space-y-3">
                            {categoryLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Program Kerja KKN</h4>
                        <ul className="space-y-3">
                            {programLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        ©{currentYear} All rights reserved by <strong>Desa Turus, Kecamatan Polanharjo, Kabupaten Klaten</strong>
                    </p>
                </div>
            </div>
        </footer>
    );
}