import { Head, Link } from '@inertiajs/react';
import UmkmHero from '@/components/umkm/umkm-hero';
import UmkmAbout from '@/components/umkm/umkm-about';
import UmkmPrograms from '@/components/umkm/umkm-programs';
import UmkmGallery from '@/components/umkm/umkm-gallery';
import UmkmContact from '@/components/umkm/umkm-contact';
import UmkmFooter from '@/components/umkm/umkm-footer';

// Interface untuk stats yang diterima dari Controller
interface Stats {
    total_umkm: number;
    total_products: number;
    certified_halal: number;
    revenue_increase: number;
}

// Interface untuk featured products
interface FeaturedProduct {
    name: string;
    description: string;
    price: string;
    image: string;
}

// Interface untuk UMKM data
interface Umkm {
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
    instagram?: string;
    facebook?: string;
    is_verified: boolean;
    is_active: boolean;
    created_at: string;
}

// Interface untuk category stats
interface CategoryStat {
    name: string;
    count: number;
}

// Interface untuk props yang diterima dari Controller
interface UmkmPageProps {
    stats?: Stats;
    featured_products?: FeaturedProduct[];
    featured_umkms?: Umkm[]; // Data UMKM unggulan dari admin panel
    categories?: CategoryStat[]; // Data kategori dengan jumlah
}

export default function UmkmPage({ stats, featured_products, featured_umkms, categories }: UmkmPageProps) {
    return (
        <>
            <Head title="UMKM Desa Turus - Polanharjo, Klaten" />
            
            <div className="min-h-screen bg-white">
                {/* Hero Section dengan Navigation */}
                <UmkmHero stats={stats} />
                
                {/* About Section */}
                <UmkmAbout />
                
                {/* Programs Section - Terhubung dengan data UMKM dari admin panel */}
                <UmkmPrograms 
                    featured_umkms={featured_umkms} 
                    categories={categories}
                    stats={stats} 
                />
                
                {/* Gallery Section */}
                <UmkmGallery />
                
                {/* Contact Section */}
                <UmkmContact />
                
                {/* Footer */}
                <UmkmFooter />
            </div>
        </>
    );
}