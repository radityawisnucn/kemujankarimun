import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function NavLanding() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const idbu = '/image/K-3-removebg.png';

    return (
        <nav className="fixed top-0 left-0 z-50 w-full">
            <div className="mx-auto -mt-10 flex max-w-7xl items-center justify-between px-4">
                <img className="h-50 w-55" src={idbu} alt="Logo" />

                {/* Tombol hamburger */}
                <button onClick={toggleMenu} className="z-50 text-white">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Slide-in Menu */}
            <div
                className={`fixed top-0 right-0 z-40 h-full w-full transform bg-white/20 backdrop-blur-3xl transition-transform duration-300 sm:max-w-sm md:max-w-md lg:max-w-lg ${
                    // Lebar responsif dan efek glass penuh
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Daftar menu dengan ukuran font responsif */}
                <ul className="mt-28 space-y-6 px-6 text-xl font-semibold tracking-wider text-white sm:text-4xl md:text-4xl lg:text-4xl">
                    <li>
                        <a href="/" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/time-line" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Time Line Kegiatan dan Dosen
                        </a>
                    </li>
                    <li>
                        <a href="/products" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Hasil Sumber Daya Alam Desa Kemujan
                        </a>
                    </li>
                    <li>
                        <a href="/umkm" className="block hover:text-blue-400" onClick={toggleMenu}>
                            UMKM Olah Laut Kemujan
                        </a>
                    </li>
                    <li>
                        <a href="/seaweed-type" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Jenis-Jenis Rumput Laut
                        </a>
                    </li>
                    <li>
                        <a href="/user/processing-methods" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Cara Pengolahan
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}