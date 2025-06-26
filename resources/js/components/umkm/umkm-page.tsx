import { Head } from '@inertiajs/react';
import UmkmHero from '@/components/umkm/umkm-hero';
import UmkmAbout from '@/components/umkm/umkm-about';
import UmkmPrograms from '@/components/umkm/umkm-programs';
import UmkmGallery from '@/components/umkm/umkm-gallery';
import UmkmContact from '@/components/umkm/umkm-contact';
import UmkmFooter from '@/components/umkm/umkm-footer';

export default function UmkmPage() {
    return (
        <>
            <Head title="UMKM Olah Laut Kemujan" />
            
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
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