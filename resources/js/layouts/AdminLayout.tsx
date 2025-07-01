import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Menu, 
    X, 
    Home, 
    Users, 
    ShoppingBag, 
    FileText, 
    Settings, 
    LogOut,
    Store,
    Fish,
    Waves,
    Activity
} from 'lucide-react';

interface Props {
    children: React.ReactNode;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface PageProps {
    auth: {
        user: User;
    };
}

export default function AdminLayout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage<PageProps>().props;

    const navigation = [
        {
            name: 'Dashboard',
            href: route('admin.dashboard'),
            icon: Home,
            current: route().current('admin.dashboard')
        },
        {
            name: 'UMKM',
            href: route('admin.umkm.index'),
            icon: Store,
            current: route().current('admin.umkm.*')
        },
        {
            name: 'Produk',
            href: route('admin.products.index'),
            icon: ShoppingBag,
            current: route().current('admin.products.*')
        },
        {
            name: 'Rumput Laut',
            href: route('admin.seaweed.index'),
            icon: Waves,
            current: route().current('admin.seaweed.*')
        },
        {
            name: 'Pengolahan',
            href: route('admin.processing.index'),
            icon: Fish,
            current: route().current('admin.processing.*')
        },
        {
            name: 'Aktivitas',
            href: route('admin.activities.index'),
            icon: Activity,
            current: route().current('admin.activities.*')
        },
        {
            name: 'Pengguna',
            href: route('admin.users.index'),
            icon: Users,
            current: route().current('admin.users.*')
        },
        {
            name: 'Pengaturan',
            href: route('admin.settings.index'),
            icon: Settings,
            current: route().current('admin.settings.*')
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                
                {/* Sidebar header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <Link href={route('admin.dashboard')} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">K</span>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">Kemujan Admin</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6 px-3">
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        item.current
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className={`flex-shrink-0 w-5 h-5 mr-3 ${
                                        item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                                    }`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* User section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-700">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {auth.user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {auth.user.email}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Keluar
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top navigation */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-6">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        
                        <div className="flex-1" />
                        
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                Selamat datang, {auth.user.name}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}