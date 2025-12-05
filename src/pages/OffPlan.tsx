import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

import { PageShell } from "@/Renderer";

const offPlanProperties = [
  {
    id: "1",
    title: "Stylish Studio in Al Haseen 4",
    location: "Al Haseen-4, Dubai",
    price: "AED 379,000",
    type: "Off-Plan",
    area: "379 sq.ft",
    addedDate: "03 Sep 2025",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    id: "2",
    title: "1 BHK in Dugasta Al Haseen 4",
    location: "Al Haseen-4, Dubai",
    price: "AED 1,427,989",
    type: "Off-Plan",
    bedrooms: 1,
    area: "650 sq.ft",
    addedDate: "03 Sep 2025",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    id: "3",
    title: "Affordable Luxury Apartment",
    location: "Al Haseen-4, Dubai",
    price: "AED 538,888",
    type: "Off-Plan",
    bedrooms: 1,
    area: "550 sq.ft",
    addedDate: "30 Jul 2025",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    id: "4",
    title: "Premium 1 BHK with High Floor Views",
    location: "Al Haseen-4, Dubai",
    price: "AED 521,125",
    type: "Off-Plan",
    bedrooms: 1,
    area: "580 sq.ft",
    addedDate: "30 Jul 2025",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: "5",
    title: "Luxury Villas Handing Over In 2029",
    location: "Selvara, Grand Polo Club & Resort, Dubai",
    price: "AED 6,286,888",
    type: "Off-Plan",
    bedrooms: 4,
    area: "3500 sq.ft",
    addedDate: "30 Jul 2025",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    featured: true,
  },
];

export const pageContext = {
  pageMeta: {
    title: "Off-Plan Properties",
    description: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors.",
    keywords: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments",
    author: "Sky Elite Real Estate",
    ogTitle: "Luxurious 3-Bedroom Apartment in Downtown Dubai",
    ogDescription: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns.",
    ogType: "website",
    ogUrl: "https://elite-real-estate-five.vercel.app/?v=2",
    ogImage: "https://elite-real-estate-five.vercel.app/Thumbnail.jpg?v=2",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    twitterCard: "summary_large_image",
    twitterTitle: "Sky Elite Real Estate | Dubai Property Investment",
    twitterDescription: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas.",
    twitterImage: "https://elite-real-estate-five.vercel.app/Thumbnail.jpg?v=2",
    canonical: "https://elite-real-estate-five.vercel.app/?v=2",
    favicon: "/favicon.png"
  }
}



const OffPlan = () => {
  return (
    <>
      <PageShell pageContext={pageContext}>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            {/* Hero Section */}
            <SecondaryPropertiesHero />

            {/* Property Filters */}
            <section className="border-b border-border/40 bg-background/95 backdrop-blur">
              <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-8">
                <div className="grid gap-4 md:grid-cols-5 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Select City</label>
                    <Select defaultValue="dubai">
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dubai">Dubai</SelectItem>
                        <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="sharjah">Sharjah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Property Type</label>
                    <Select defaultValue="apartment">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose property" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Bedrooms</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose bedroom" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4+">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Price Range</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-500k">AED 0 - 500k</SelectItem>
                        <SelectItem value="500k-1m">AED 500k - 1M</SelectItem>
                        <SelectItem value="1m-2m">AED 1M - 2M</SelectItem>
                        <SelectItem value="2m+">AED 2M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="gap-2">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </section>

            {/* Properties Grid */}
            <section className="py-16 md:py-24 bg-background">
              <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                      Apartments for Sale in Dubai
                    </h2>
                    <p className="text-muted-foreground mt-1">Dubai South</p>
                  </div>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="area">Area: Largest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {offPlanProperties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </PageShell>

    </>
  );
};

export default OffPlan;


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
        className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10"

      >
        <div className="container mx-auto px-[25px] sm:px-4 md:px-[90px]">
          <div className="text-white relative z-[1] max-w-[650px] ">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Services</span>
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Off-Plan Properties
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Secure your future with off-plan properties with high returns and flexible payment plans.
              Explore premium developments that align with your investment goals.
            </p>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="mt-6 px-5 py-3 bg-[#2a416f] hover:bg-[#35528d] text-white rounded-lg transition-all"
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
          <div className="bg-white rounded-lg w-[90%] max-w-[650px] h-[530px] mt-10 flex flex-col md:flex-row relative shadow-lg transition-all duration-500 transform animate-slideDown p-2">

            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-3xl font-light z-10"
            >
              ×
            </button>

            {/* Image Section */}
            <div className="hidden md:block md:w-1/2 h-full">
              <img
                src="https://skyeliterealestate.com/assets/images/home/Mask%20group.png"
                alt="House"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-4 flex flex-col justify-between h-full">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">Let's Connect!</h2>

              <form onSubmit={handleSubmit} className="space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
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
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1FA7E1] text-white py-3 rounded-md hover:bg-[#1890c9] transition-all mt-2"
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

