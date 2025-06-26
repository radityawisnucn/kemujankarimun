import { Head } from '@inertiajs/react';
import UmkmHero from '@/components/umkm/umkm-hero';
import UmkmAbout from '@/components/umkm/umkm-about';
import UmkmPrograms from '@/components/umkm/umkm-programs';
import UmkmGallery from '@/components/umkm/umkm-gallery';
import UmkmContact from '@/components/umkm/umkm-contact';
import UmkmFooter from '@/components/umkm/umkm-footer';

// Interface untuk props yang diterima dari Controller
interface UmkmPageProps {
    stats?: {
        total_umkm: number;
        total_products: number;
        certified_halal: number;
        revenue_increase: number;
    };
    featured_products?: Array<{
        name: string;
        description: string;
        price: string;
        image: string;
    }>;
}

export default function UmkmPage({ stats, featured_products }: UmkmPageProps) {
    return (
        <>
            <Head title="UMKM Desa Turus - Polanharjo, Klaten" />
            
            <div className="min-h-screen bg-white">
                {/* Hero Section dengan Navigation */}
                <UmkmHero />
                
                {/* About Section */}
                <UmkmAbout />
                
                {/* Programs Section */}
                <UmkmPrograms />
                
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