import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram } from 'lucide-react';

export default function UmkmContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            router.post('/umkm/contact', formData, {
                onSuccess: () => {
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                    });
                    alert('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
                },
                onError: (errors) => {
                    setErrors(errors);
                },
                onFinish: () => {
                    setProcessing(false);
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setProcessing(false);
        }
    };

    const teamMembers = [
        {
            name: "Ahmad",
            role: "ML",
            image: "👨‍💼",
            bg: "bg-gradient-to-br from-blue-400 to-blue-600"
        },
        {
            name: "Dayn",
            role: "ML", 
            image: "👨‍💻",
            bg: "bg-gradient-to-br from-gray-400 to-gray-600"
        },
        {
            name: "Icha",
            role: "ML",
            image: "👩‍🎓",
            bg: "bg-gradient-to-br from-purple-400 to-purple-600"
        },
        {
            name: "Washlur",
            role: "CC",
            image: "👨‍🔬",
            bg: "bg-gradient-to-br from-amber-400 to-amber-600"
        },
        {
            name: "Pram",
            role: "CC",
            image: "👨‍🏫",
            bg: "bg-gradient-to-br from-green-400 to-green-600"
        },
        {
            name: "Hilmy",
            role: "MD",
            image: "👨‍💼",
            bg: "bg-gradient-to-br from-yellow-400 to-yellow-600"
        },
        {
            name: "Sulaiman",
            role: "MD",
            image: "👨‍🎯",
            bg: "bg-gradient-to-br from-red-400 to-red-600"
        }
    ];

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Meet Our Team Section */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold text-gray-900 mb-16">
                        Meet Our Team 👨‍💻
                    </h2>
                    
                    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative mb-4">
                                    <div className={`w-24 h-24 lg:w-28 lg:h-28 ${member.bg} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <span className="text-3xl lg:text-4xl">{member.image}</span>
                                    </div>
                                    {/* Role Badge */}
                                    <div className="absolute -bottom-2 -right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {member.role}
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 text-lg">
                                    {member.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Ada pertanyaan tentang program UMKM atau ingin berkolaborasi? 
                            Tim kami siap membantu Anda!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-100 p-3 rounded-lg">
                                            <Phone className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Telepon</h4>
                                            <p className="text-gray-600">+62 812-3456-7890</p>
                                            <p className="text-gray-600">+62 857-1234-5678</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-green-100 p-3 rounded-lg">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                                            <p className="text-gray-600">umkm@turus.id</p>
                                            <p className="text-gray-600">info@desaturus.com</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-purple-100 p-3 rounded-lg">
                                            <MapPin className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Alamat</h4>
                                            <p className="text-gray-600">Desa Turus, Polanharjo</p>
                                            <p className="text-gray-600">Klaten, Jawa Tengah 57473</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h4 className="font-semibold text-gray-900 mb-4">Ikuti Kami</h4>
                                    <div className="flex space-x-4">
                                        <a href="#" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Lengkap *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                placeholder="Masukkan nama lengkap"
                                                required
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                placeholder="nama@email.com"
                                                required
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor Telepon
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="+62 812-3456-7890"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Pesan *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="Ceritakan kepada kami tentang kebutuhan atau pertanyaan Anda..."
                                            required
                                        />
                                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg"
                                    >
                                        <Send className="w-5 h-5" />
                                        <span>{processing ? 'Mengirim...' : 'Kirim Pesan'}</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}