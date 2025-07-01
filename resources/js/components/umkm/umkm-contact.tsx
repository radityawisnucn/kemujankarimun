import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram } from 'lucide-react';

export default function UmkmContact() {
    const teamMembers = [
        {
            name: "Wisnu",
            role: "FT",
            image: "👨‍💻",
            bg: "bg-gradient-to-br from-gray-400 to-gray-600"
        },
        {
            name: "Leila",
            role: "FPSI",
            image: "👩‍🎓",
            bg: "bg-gradient-to-br from-purple-400 to-purple-600"
        },
        {
            name: "Najwan",
            role: "FPP", 
            image: "👨‍🌾",
            bg: "bg-gradient-to-br from-green-400 to-green-600"
        },
        {
            name: "Tondi",
            role: "FPIK",
            image: "👨‍🔬",
            bg: "bg-gradient-to-br from-blue-400 to-blue-600"
        },
        {
            name: "Naomi",
            role: "SV",
            image: "👩‍💼",
            bg: "bg-gradient-to-br from-orange-400 to-orange-600"
        },
        {
            name: "Nareswari",
            role: "FISIP",
            image: "👩‍💼",
            bg: "bg-gradient-to-br from-red-400 to-red-600"
        },
        {
            name: "Pramesty",
            role: "FISIP",
            image: "👩‍💻",
            bg: "bg-gradient-to-br from-pink-400 to-pink-600"
        },
        {
            name: "Revinda",
            role: "FPIK",
            image: "👩‍🔬",
            bg: "bg-gradient-to-br from-cyan-400 to-cyan-600"
        },
        {
            name: "Rianza",
            role: "FH",
            image: "👨‍⚖️",
            bg: "bg-gradient-to-br from-yellow-400 to-yellow-600"
        },
        {
            name: "Galang",
            role: "SV",
            image: "👨‍💼",
            bg: "bg-gradient-to-br from-amber-400 to-amber-600"
        }
    ];

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Meet Our Team Section */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold text-gray-900 mb-16">
                        Temu Sapa dengan Kami 👋
                    </h2>
                    
                    {/* Overlapping Team Photos Layout - All Members */}
                    <div className="flex justify-center items-center">
                        <div className="relative flex items-center">
                            {teamMembers.map((member, index) => (
                                <div 
                                    key={index} 
                                    className="relative group text-center"
                                    style={{
                                        marginLeft: index > 0 ? '-12px' : '0', // Reduced overlap for more space
                                        zIndex: teamMembers.length - index
                                    }}
                                >
                                    {/* Main Photo Circle */}
                                    <div className={`w-20 h-20 lg:w-24 lg:h-24 ${member.bg} rounded-full flex items-center justify-center shadow-xl border-4 border-white group-hover:scale-110 transition-all duration-300 group-hover:z-50 relative mb-6`}>
                                        <span className="text-2xl lg:text-3xl">{member.image}</span>
                                        
                                        {/* Role Badge - Positioned further from name */}
                                        <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {member.role}
                                        </div>
                                    </div>
                                    
                                    {/* Name Below Photo - Clean without border */}
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-max">
                                        <h3 className="font-semibold text-gray-900 text-sm lg:text-base whitespace-nowrap">
                                            {member.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}