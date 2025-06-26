import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function UmkmContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
        alert('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
    };

    const contactInfo = [
        { icon: MapPin, label: 'Alamat', value: 'Desa Kemujan, Karimunjawa, Jepara' },
        { icon: Phone, label: 'Telepon', value: '+62 123-4567-8901' },
        { icon: Mail, label: 'Email', value: 'umkm@olahlautkemujan.id' },
        { icon: Clock, label: 'Jam Operasional', value: 'Senin - Jumat: 08:00 - 17:00' }
    ];

    return (
        <section id="contact" className="py-20 bg-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Hubungi <span className="text-blue-600">Kami</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Tertarik bergabung atau butuh informasi lebih lanjut? Jangan ragu untuk menghubungi kami
                    </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Informasi Kontak</h3>
                        
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="bg-blue-600 p-3 rounded-lg mr-4 flex-shrink-0">
                                        <info.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">{info.label}</h4>
                                        <p className="text-gray-600">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Map Placeholder */}
                        <div className="mt-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg h-64 flex items-center justify-center">
                            <div className="text-center text-blue-800">
                                <MapPin className="w-12 h-12 mx-auto mb-3" />
                                <p className="font-medium">Peta Lokasi</p>
                                <p className="text-sm">Integrasikan dengan Google Maps</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Email</label>
                                <input 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Nomor Telepon</label>
                                <input 
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Pesan</label>
                                <textarea 
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                            >
                                Kirim Pesan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}