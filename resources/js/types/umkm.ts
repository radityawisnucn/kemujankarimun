export interface UmkmStats {
    total_umkm: number;
    total_products: number;
    certified_halal: number;
    revenue_increase: number;
}

export interface FeaturedProduct {
    name: string;
    description: string;
    price: string;
    image: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export interface UmkmPageProps {
    stats: UmkmStats;
    featured_products: FeaturedProduct[];
}