import { Navbar } from '@/components/Navbar'
import React, { useEffect, useRef, useState } from 'react'
import { Footer } from '@/components/Footer';

export default function Rental() {
    return (
        <div>
            <Navbar />
            <SecondaryPropertiesHero />
            <PropertySearchForm />
            <ApartmentsList />
            <PartnersSection />
            <Footer />
        </div>
    )
}



function SecondaryPropertiesHero() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        category: 'Buy',
        currency: '$',
        budgetMin: '',
        budgetMax: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted successfully!');
        setIsPopupOpen(false);
    };

    return (
        <>
            {/* Hero Section */}
            <section
                className="p-[15px] bg-no-repeat bg-center bg-cover bg-[#FFF6F0] h-screen flex flex-wrap items-center relative before:absolute before:inset-0 before:content-['']"
                style={{ backgroundImage: "url('https://skyeliterealestate.com/assets/images/Secondary/Hero.png')" }}
            >
                <div className="container mx-auto px-4">
                    <div className="text-center text-white relative z-[1] max-w-[650px] mx-auto">
                        <span className="block mb-2 text-base">Services</span>
                        <h1 className="font-serif text-[36px] sm:text-[50px] md:text-[68px] lg:text-[50px] leading-tight xl:text-[68px] font-medium">
                            Secondary Properties
                        </h1>
                        <p className="text-base mt-3 max-w-[500px] mx-auto">
                            Find your dream home easily. Whether you're upgrading, relocating, or investing, we help you secure the perfect property without the hassle.
                        </p>
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="mt-6 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                        >
                            Get Expert Advice
                        </button>
                    </div>
                </div>
            </section>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 transition-all duration-500 ${isPopupOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                        }`}
                >
                    <div className="bg-white rounded-lg w-[90%] max-w-[650px] h-[600px] mt-10 flex flex-col md:flex-row relative overflow-hidden shadow-lg transition-all duration-500 transform animate-slideDown p-3">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsPopupOpen(false)}
                            className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-3xl font-light z-10"
                        >
                            ×
                        </button>

                        {/* Image Section */}
                        <div className="hidden md:block md:w-1/2">
                            <img
                                src="https://skyeliterealestate.com/assets/images/home/Mask%20group.png"
                                alt="House"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Form Section */}
                        <div className="w-full md:w-1/2 p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Let's Connect!</h2>

                            <form onSubmit={handleSubmit} className="space-y-3">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                                {/* Budget */}
                                <div>
                                    <h5 className="text-gray-700 font-semibold mb-1">Budget Range</h5>
                                    <div className="flex gap-2 flex-wrap">
                                        <select
                                            name="currency"
                                            value={formData.currency}
                                            onChange={handleInputChange}
                                            className="flex-[0_0_90px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                        >
                                            <option value="$">USD</option>
                                            <option value="AED">AED</option>
                                        </select>

                                        <input
                                            type="number"
                                            name="budgetMin"
                                            value={formData.budgetMin}
                                            onChange={handleInputChange}
                                            placeholder="Min"
                                            min="0"
                                            required
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                        />

                                        <input
                                            type="number"
                                            name="budgetMax"
                                            value={formData.budgetMax}
                                            onChange={handleInputChange}
                                            placeholder="Max"
                                            min="0"
                                            required
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Type your message..."

                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none outline-none"
                                ></textarea>

                                <button
                                    type="submit"
                                    className="w-full bg-[#1FA7E1] text-white py-3 rounded-md hover:bg-[#1890c9] transition-all"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation Keyframes */}
            <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
        </>
    );
}




function PropertySearchForm() {
    const [city, setCity] = React.useState("");
    const [propertyType, setPropertyType] = React.useState("");
    const [bedrooms, setBedrooms] = React.useState("");
    const [price, setPrice] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (city) params.append('City', city);
        if (propertyType) params.append('propertyType', propertyType);
        if (bedrooms) params.append('bedrooms', bedrooms);
        if (price) params.append('price', price);

        console.log('Search parameters:', Object.fromEntries(params));
        // Navigate to: /Property/secondary?${params.toString()}
    };
    
    return (
        <>
            <div className="container mx-auto px-4 md:px-20 mt-20">
                {/* Search Form */}
                <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-6 md:p-8 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {/* City */}
                            <div className="w-full sm:w-[calc(25%-0.5rem)]">
                                <select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="" disabled>Select City</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Abu Dhabi">Abu Dhabi</option>
                                    <option value="Sharjah">Sharjah</option>
                                </select>
                            </div>

                            {/* Property Type */}
                            <div className="w-full sm:w-[calc(20%-0.5rem)]">
                                <select
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="" disabled>Choose Property</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Penthouse">Penthouse</option>
                                </select>
                            </div>

                            {/* Bedrooms */}
                            <div className="w-full sm:w-[calc(20%-0.5rem)]">
                                <select
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="" disabled>Choose Bedroom</option>
                                    <option value="1">1 Bed</option>
                                    <option value="2">2 Beds</option>
                                    <option value="3">3+ Beds</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div className="w-full sm:w-[calc(20%-0.5rem)]">
                                <select
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Price</option>
                                    <option value="low">Low to High</option>
                                    <option value="high">High to Low</option>
                                </select>
                            </div>

                            {/* Search Button */}
                            <div className="w-full sm:w-[calc(10%-0.5rem)]">
                                <button
                                    type="submit"
                                    className="w-full h-10 bg-[#1FA7E1] text-white rounded-md hover:bg-[#1890c8] transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Listing Header */}
                <div className="w-full max-w-5xl mx-auto mt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg p-4 shadow-sm gap-3">

                        {/* Left Side */}
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm md:text-base">
                                Apartment for Sale in Dubai
                            </span>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <label
                                htmlFor="sortSelect"
                                className="text-gray-500 font-semibold text-sm whitespace-nowrap"
                            >
                                Sort by:
                            </label>
                            <select
                                id="sortSelect"
                                className="border border-gray-300 rounded-md text-sm px-3 py-2 w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Newest</option>
                                <option>Oldest</option>
                                <option>Popular</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ApartmentsList() {
    return (
        <div className="container mx-auto mt-[50px] px-[100px]">
            <h4 className="mb-3 text-xl font-semibold text-gray-800">
                Apartments for Sale in Dubai
            </h4>

            <div className="col-span-12">
                <div className="all-properties properties-tab-content active">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <h4 className="text-gray-500 text-lg font-medium">
                            No Properties yet
                        </h4>
                    </div>

                    <div className="mt-5"></div>
                </div>
            </div>
        </div>
    );
}


function PartnersSection() {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let position = 0;
        const speed = 0.4; // pixels per frame
        const logos = track.children.length;
        const logoWidth = 150; // approximate width including gap
        const totalWidth = logos * logoWidth;

        const animate = () => {
            position -= speed;

            // Reset position for infinite loop
            if (Math.abs(position) >= totalWidth / 2) {
                position = 0;
            }

            track.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, []);

    const logos = [
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-1.png',
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-4.png',
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-4.png',
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-9.png',
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-5.png',
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-7.png',
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-8.png',
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-5.png',
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-9.png',
        'https://skyeliterealestate.com/assets/images/OffPlan/Logo-7.png',
    ];

    return (
        <section className="pt-6 sm:pt-8 md:pt-10 overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-[98px] mb-6 sm:mb-8 md:mb-10">
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="mb-4 sm:mb-5 md:mb-6 text-center">
                            <h2 className="font-serif text-blue-900 text-xl sm:text-2xl md:text-3xl xl:text-4xl capitalize font-medium">
                                Our Partners
                            </h2>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="relative w-full overflow-hidden">
                            <div
                                ref={trackRef}
                                className="flex gap-4 sm:gap-6 md:gap-8 items-center w-max"
                            >
                                {/* Original logos */}
                                {logos.map((logo, index) => (
                                    <img
                                        key={`logo-${index}`}
                                        src={logo}
                                        alt={`Partner Logo ${index + 1}`}
                                        className="h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] w-auto object-contain flex-shrink-0"
                                    />
                                ))}
                                {/* Duplicate logos for seamless infinite scroll */}
                                {logos.map((logo, index) => (
                                    <img
                                        key={`logo-duplicate-${index}`}
                                        src={logo}
                                        alt={`Partner Logo ${index + 1}`}
                                        className="h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] w-auto object-contain flex-shrink-0"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



