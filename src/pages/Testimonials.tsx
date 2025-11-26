import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { Footer } from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Testimonials() {

    const { id } = useParams();

    // Scroll to top whenever component mounts or route changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [id]);


    return (
        <>
            <Helmet>
                <title>Sky Elite Real Estate | Dubai Property Investment & Luxury Real Estate</title>
                {/* <!-- SEO Meta --> */}
              <meta name="description"
                content="Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors." />
              <meta name="keywords"
                content="Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments" />
              <meta name="author" content="Sky Elite Real Estate" />
      
              {/* <!-- Open Graph / Facebook --> */}
              <meta property="og:title" content="Luxurious 3-Bedroom Apartment in Downtown Dubai" />
              <meta property="og:description"
                content="Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns." />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://elite-real-estate-five.vercel.app/?v=2" />
              <meta property="og:image" content="https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
      
              {/* <!-- Twitter Card --> */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Sky Elite Real Estate | Dubai Property Investment" />
              <meta name="twitter:description"
                content="Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas." />
              <meta name="twitter:image" content="https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" />
      
              {/* <!-- Canonical --> */}
              <link rel="canonical" href="https://elite-real-estate-five.vercel.app/?v=2" />
            </Helmet>
            <Navbar />
            <ContactForm />
            <ContactCards />
            <Footer />
        </>
    )
}
function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        phoneNumber: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
    };

    return (
        <div
            className="relative py-6 sm:py-8 lg:py-10 sm:px-6 md:px-8 lg:px-12 xl:px-[65px] 2xl:px-24 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('https://skyeliterealestate.com/assets/images/Secondary/Hero.png')"
            }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="container relative z-[1]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-stretch">

                    {/* Form */}
                    <div className="w-full order-2 lg:order-1">
                        <div className="h-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm">
                            <div className="mb-4 sm:mb-6">
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-left text-[#0B579C] leading-tight">
                                    Get in touch with us and let's find your Perfect Property in Dubai
                                </h2>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                <div className="w-full">
                                    <input
                                        className="bg-white/90 text-black text-sm sm:text-base font-light w-full leading-[1] placeholder:text-black placeholder:text-sm sm:placeholder:text-base border border-[#0B579C] border-opacity-60 rounded-lg p-3 sm:p-[10px] focus:border-[#0B579C] focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0B579C] focus:ring-opacity-20 transition-all"
                                        type="text"
                                        placeholder="Full Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="w-full">
                                        <input
                                            className="bg-white/90 text-black text-sm sm:text-base font-light w-full leading-[1] placeholder:text-black placeholder:text-sm sm:placeholder:text-base border border-[#0B579C] border-opacity-60 rounded-lg p-3 sm:p-[10px] focus:border-[#0B579C] focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0B579C] focus:ring-opacity-20 transition-all"
                                            type="tel"
                                            placeholder="Phone number"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <input
                                            className="bg-white/90 text-black text-sm sm:text-base font-light w-full leading-[1] placeholder:text-black placeholder:text-sm sm:placeholder:text-base border border-[#0B579C] border-opacity-60 rounded-lg p-3 sm:p-[10px] focus:border-[#0B579C] focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0B579C] focus:ring-opacity-20 transition-all"
                                            type="email"
                                            placeholder="Email Address"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <textarea
                                        className="bg-white/90 text-black text-sm sm:text-base h-32 sm:h-40 md:h-48 font-light w-full leading-5 placeholder:text-black placeholder:text-sm sm:placeholder:text-base border border-[#0B579C] border-opacity-60 rounded-lg p-3 sm:p-[10px] focus:border-[#0B579C] focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0B579C] focus:ring-opacity-20 resize-none transition-all"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Message"
                                    />
                                </div>

                                <div className="w-full flex items-center justify-center pt-2">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="w-full sm:w-auto relative overflow-hidden text-white font-medium text-sm sm:text-base lg:text-lg px-8 sm:px-10 lg:px-12 py-3 sm:py-[10px] rounded-lg bg-[#0B579C] hover:bg-[#084a82] active:scale-95 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                                    >
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="w-full order-1 lg:order-2">
                        <div className="h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
                            <div className="w-full h-full">
                                <iframe
                                    className="w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
                                    frameBorder="0"
                                    scrolling="no"
                                    src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Armada tower JLT&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                                    title="Office Location Map"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



const ContactCards = () => {
    const contactData = [
        {
            icon: <HiOutlineLocationMarker size={40} className="text-primary" />,
            title: "Address",
            details: ["Armada tower JLT"],
        },
        {
            icon: <HiOutlinePhone size={40} className="text-primary" />,
            title: "Call us",
            details: ["0588273634", "+971588273634"],
        },
        {
            icon: <HiOutlineMail size={40} className="text-primary" />,
            title: "Email us",
            details: [
                { text: "Shahbaz@skyeliterealestate.com", href: "mailto:Shahbaz@skyeliterealestate.com" },
                { text: "Ashfaque@skteliterealestate.com", href: "mailto:Ashfaque@skteliterealestate.com" },
            ],
        },
    ];

    return (
        <section className="py-12 md:py-16 lg:py-20 xl:py-[120px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[55px]">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {contactData.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row items-start hover:drop-shadow-[0px_16px_10px_rgba(0,0,0,0.1)] hover:bg-[#F5F9F8] transition-all duration-300 p-5 md:p-6 lg:p-[20px] rounded-lg group"
                        >
                            <div className="mb-4 sm:mb-0 sm:mr-5 md:mr-8 lg:mr-5 xl:mr-10 flex-shrink-0">
                                {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-lora group-hover:text-secondary transition-colors duration-300 text-xl sm:text-2xl lg:text-[28px] text-primary mb-2 md:mb-3">
                                    {item.title}
                                </h4>
                                <div className="font-light text-sm md:text-base space-y-1">
                                    {item.details.map((detail, idx) =>
                                        typeof detail === "string" ? (
                                            <p key={idx} className="break-words">{detail}</p>
                                        ) : (
                                            <a
                                                key={idx}
                                                href={detail.href}
                                                className="hover:text-secondary transition-colors duration-200 block break-all"
                                            >
                                                {detail.text}
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
