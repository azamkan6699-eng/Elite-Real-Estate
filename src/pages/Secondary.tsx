import { Navbar } from '@/components/Navbar'
import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '@/components/Footer';

export default function Secondary() {
  return (
    <div>
      <Navbar />
      <SecondaryPropertiesHero />
      <PropertySearchForm />
      <PropertyCard />
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




const PropertyCard = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl">
        <h4 className="mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
          Apartments for Sale in Dubai
        </h4>

        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="w-full">
              <div className="overflow-hidden rounded-lg shadow-md bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full">
                {/* Image Section */}
                <div className="relative w-full">
                  <a href="/secondry/al-haseeb-apartments" className="block">
                    <div className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
                      <img
                        src="https://cms.skyeliterealestate.com/EliteFiles/Propertiesfiles/1.jpg"
                        alt="Ready Investment | 10% Annual Returns | Dugasta Al Haseen 4 | No Service Fees"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </a>

                  <span className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded shadow-sm text-blue-600 text-xs sm:text-sm font-medium">
                    For Sale
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 lg:p-6 text-left flex flex-col flex-1">
                  <h3 className="mb-2">
                    <a
                      href="/secondry/al-haseeb-apartments"
                      className="block leading-tight text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-800 hover:text-amber-600 transition-colors font-medium line-clamp-2"
                    >
                      Ready Investment | 10% Annual Returns | Dugasta Al Haseen 4 | No Service Fees
                    </a>
                  </h3>

                  <h4 className="mb-3">
                    <a
                      href="/secondry/al-haseeb-apartments"
                      className="font-light text-xs sm:text-sm text-gray-600 hover:text-blue-600 underline"
                    >
                      Dugasta, Dubai
                    </a>
                  </h4>

                  <span className="font-light text-xs sm:text-sm text-gray-500 mb-3">
                    Added: 06 Nov 2025
                  </span>

                  {/* Property Features */}
                  <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm mb-4 pb-4 border-b border-gray-200">
                    <li className="flex items-center gap-1.5 pr-3 border-r border-gray-300">
                      <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.8125 9.68709V4.31285C12.111 4.23634 12.384 4.0822 12.6037 3.86607C12.8234 3.64994 12.982 3.37951 13.0634 3.08226C13.1448 2.78501 13.1461 2.47151 13.0671 2.1736C12.9882 1.87569 12.8318 1.60398 12.6139 1.38605C12.396 1.16812 12.1243 1.01174 11.8263 0.932792C11.5284 0.85384 11.2149 0.855126 10.9177 0.936521C10.6204 1.01792 10.35 1.17652 10.1339 1.39623C9.91774 1.61593 9.7636 1.88892 9.68709 2.18747H4.31285C4.23634 1.88892 4.0822 1.61593 3.86607 1.39623C3.64994 1.17652 3.37951 1.01792 3.08226 0.936521C2.78501 0.855126 2.47151 0.85384 2.1736 0.932792C1.87569 1.01174 1.60398 1.16812 1.38605 1.38605C1.16812 1.60398 1.01174 1.87569 0.932792 2.1736C0.85384 2.47151 0.855126 2.78501 0.936521 3.08226C1.01792 3.37951 1.17652 3.64994 1.39623 3.86607C1.61593 4.0822 1.88892 4.23634 2.18747 4.31285V9.68709C1.88892 9.7636 1.61593 9.91774 1.39623 10.1339C1.17652 10.35 1.01792 10.6204 0.936521 10.9177C0.855126 11.2149 0.85384 11.5284 0.932792 11.8263C1.01174 12.1243 1.16812 12.396 1.38605 12.6139C1.60398 12.8318 1.87569 12.9882 2.1736 13.0671C2.47151 13.1461 2.78501 13.1448 3.08226 13.0634C3.37951 12.982 3.64994 12.8234 3.86607 12.6037C4.0822 12.384 4.23634 12.111 4.31285 11.8125H9.68709C9.7636 12.111 9.91774 12.384 10.1339 12.6037C10.35 12.8234 10.6204 12.982 10.9177 13.0634C11.2149 13.1448 11.5284 13.1461 11.8263 13.0671C12.1243 12.9882 12.396 12.8318 12.6139 12.6139C12.8318 12.396 12.9882 12.1243 13.0671 11.8263C13.1461 11.5284 13.1448 11.2149 13.0634 10.9177C12.982 10.6204 12.8234 10.35 12.6037 10.1339C12.384 9.91774 12.111 9.7636 11.8125 9.68709ZM11.375 1.74997C11.548 1.74997 11.7172 1.80129 11.8611 1.89744C12.005 1.99358 12.1171 2.13024 12.1834 2.29012C12.2496 2.45001 12.2669 2.62594 12.2332 2.79568C12.1994 2.96541 12.1161 3.12132 11.9937 3.24369C11.8713 3.36606 11.7154 3.4494 11.5457 3.48316C11.3759 3.51692 11.2 3.49959 11.0401 3.43337C10.8802 3.36714 10.7436 3.25499 10.6474 3.11109C10.5513 2.9672 10.5 2.79803 10.5 2.62497C10.5002 2.39298 10.5925 2.17055 10.7565 2.00651C10.9206 1.84246 11.143 1.7502 11.375 1.74997ZM1.74997 2.62497C1.74997 2.45191 1.80129 2.28274 1.89744 2.13885C1.99358 1.99495 2.13024 1.8828 2.29012 1.81658C2.45001 1.75035 2.62594 1.73302 2.79568 1.76678C2.96541 1.80055 3.12132 1.88388 3.24369 2.00625C3.36606 2.12862 3.4494 2.28453 3.48316 2.45427C3.51692 2.624 3.49959 2.79993 3.43337 2.95982C3.36714 3.1197 3.25499 3.25636 3.11109 3.35251C2.9672 3.44865 2.79803 3.49997 2.62497 3.49997C2.39298 3.49974 2.17055 3.40748 2.00651 3.24343C1.84246 3.07939 1.7502 2.85696 1.74997 2.62497ZM2.62497 12.25C2.45191 12.25 2.28274 12.1987 2.13885 12.1025C1.99495 12.0064 1.8828 11.8697 1.81658 11.7098C1.75035 11.5499 1.73302 11.374 1.76678 11.2043C1.80055 11.0345 1.88388 10.8786 2.00625 10.7563C2.12862 10.6339 2.28453 10.5505 2.45427 10.5168C2.624 10.483 2.79993 10.5003 2.95982 10.5666C3.1197 10.6328 3.25636 10.745 3.35251 10.8888C3.44865 11.0327 3.49997 11.2019 3.49997 11.375C3.49974 11.607 3.40748 11.8294 3.24343 11.9934C3.07939 12.1575 2.85696 12.2497 2.62497 12.25ZM9.68709 10.9375H4.31285C4.23448 10.6367 4.07729 10.3622 3.8575 10.1424C3.63771 9.92265 3.36326 9.76546 3.06247 9.68709V4.31285C3.36324 4.23444 3.63766 4.07724 3.85745 3.85745C4.07724 3.63766 4.23444 3.36324 4.31285 3.06247H9.68709C9.76546 3.36326 9.92265 3.63771 10.1424 3.8575C10.3622 4.07729 10.6367 4.23448 10.9375 4.31285V9.68709C10.6367 9.76542 10.3622 9.92259 10.1424 10.1424C9.92259 10.3622 9.76542 10.6367 9.68709 10.9375ZM11.375 12.25C11.2019 12.25 11.0327 12.1987 10.8888 12.1025C10.745 12.0064 10.6328 11.8697 10.5666 11.7098C10.5003 11.5499 10.483 11.374 10.5168 11.2043C10.5505 11.0345 10.6339 10.8786 10.7563 10.7563C10.8786 10.6339 11.0345 10.5505 11.2043 10.5168C11.374 10.483 11.5499 10.5003 11.7098 10.5666C11.8697 10.6328 12.0064 10.745 12.1025 10.8888C12.1987 11.0327 12.25 11.2019 12.25 11.375C12.2496 11.6069 12.1573 11.8293 11.9933 11.9933C11.8293 12.1573 11.6069 12.2496 11.375 12.25Z"></path>
                      </svg>
                      <span className="whitespace-nowrap">379 sq.ft</span>
                    </li>

                    <li className="flex items-center gap-1.5 pr-3 border-r border-gray-300">
                      <svg className="flex-shrink-0" width="14" height="10" viewBox="0 0 14 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0002 4.18665V2.33331C13.0002 1.23331 12.1002 0.333313 11.0002 0.333313H8.3335C7.82016 0.333313 7.3535 0.533313 7.00016 0.853313C6.64683 0.533313 6.18016 0.333313 5.66683 0.333313H3.00016C1.90016 0.333313 1.00016 1.23331 1.00016 2.33331V4.18665C0.593496 4.55331 0.333496 5.07998 0.333496 5.66665V9.66665H1.66683V8.33331H12.3335V9.66665H13.6668V5.66665C13.6668 5.07998 13.4068 4.55331 13.0002 4.18665ZM8.3335 1.66665H11.0002C11.3668 1.66665 11.6668 1.96665 11.6668 2.33331V3.66665H7.66683V2.33331C7.66683 1.96665 7.96683 1.66665 8.3335 1.66665ZM2.3335 2.33331C2.3335 1.96665 2.6335 1.66665 3.00016 1.66665H5.66683C6.0335 1.66665 6.3335 1.96665 6.3335 2.33331V3.66665H2.3335V2.33331ZM1.66683 6.99998V5.66665C1.66683 5.29998 1.96683 4.99998 2.3335 4.99998H11.6668C12.0335 4.99998 12.3335 5.29998 12.3335 5.66665V6.99998H1.66683Z"></path>
                      </svg>
                      <span>1</span>
                    </li>

                    <li className="flex items-center gap-1.5 pr-3 border-r border-gray-300">
                      <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6875 7.65627H2.1875V2.7344C2.18699 2.54904 2.22326 2.36543 2.29419 2.19418C2.36512 2.02294 2.46932 1.86746 2.60075 1.73676L2.61168 1.72582C2.81765 1.52015 3.0821 1.38309 3.36889 1.33336C3.65568 1.28362 3.95083 1.32364 4.21403 1.44795C3.96546 1.86122 3.86215 2.34571 3.9205 2.82443C3.97885 3.30315 4.19552 3.74864 4.53608 4.0901L4.83552 4.38954L4.28436 4.94073L4.90304 5.55941L5.4542 5.00825L8.5082 1.95431L9.05937 1.40314L8.44066 0.78443L7.88946 1.3356L7.59002 1.03616C7.23151 0.678646 6.75892 0.458263 6.2546 0.413412C5.75029 0.368561 5.24622 0.502086 4.83025 0.790719C4.3916 0.513704 3.87178 0.394114 3.35619 0.451596C2.84059 0.509078 2.35987 0.740213 1.993 1.10703L1.98207 1.11797C1.76912 1.32975 1.6003 1.58165 1.48537 1.85911C1.37044 2.13657 1.31168 2.43407 1.3125 2.7344V7.65627H0.4375V8.53127H1.3125V9.37072C1.31248 9.44126 1.32386 9.51133 1.34619 9.57823L2.16016 12.02C2.20359 12.1508 2.28712 12.2645 2.39887 12.345C2.51062 12.4256 2.64491 12.4689 2.78266 12.4688H3.1354L2.81641 13.5625H3.72786L4.04688 12.4688H9.73711L10.0652 13.5625H10.9785L10.6504 12.4688H11.2172C11.355 12.4689 11.4893 12.4256 11.6011 12.3451C11.7129 12.2645 11.7964 12.1508 11.8398 12.02L12.6538 9.57823C12.6761 9.51133 12.6875 9.44126 12.6875 9.37072V8.53127H13.5625V7.65627H12.6875ZM5.15484 1.65486C5.3959 1.41433 5.72254 1.27924 6.06308 1.27924C6.40362 1.27924 6.73026 1.41433 6.97132 1.65486L7.2707 1.95431L5.45429 3.77072L5.15484 3.47134C4.91432 3.23027 4.77924 2.90364 4.77924 2.5631C4.77924 2.22256 4.91432 1.89593 5.15484 1.65486ZM11.8125 9.33518L11.0597 11.5938H2.94033L2.1875 9.33518V8.53127H11.8125V9.33518Z"></path>
                      </svg>
                      <span>1</span>
                    </li>

                    <li className="flex items-center gap-1.5">
                      <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.25 6.98507H12.236L11.1307 4.49805C11.0275 4.26615 10.8592 4.06913 10.6464 3.93083C10.4335 3.79253 10.1851 3.71887 9.93125 3.71875H4.06875C3.81491 3.71888 3.56655 3.79256 3.3537 3.93086C3.14085 4.06916 2.97263 4.26616 2.86937 4.49805L1.76397 6.98507H1.75C1.51802 6.98533 1.29561 7.0776 1.13157 7.24164C0.967531 7.40568 0.875261 7.62809 0.875 7.86007V10.9226C0.875261 11.1546 0.967531 11.377 1.13157 11.541C1.29561 11.705 1.51802 11.7973 1.75 11.7976V12.9062C1.7502 13.0802 1.81941 13.247 1.94243 13.3701C2.06546 13.4931 2.23226 13.5623 2.40625 13.5625H3.9375C4.11149 13.5623 4.27829 13.4931 4.40131 13.3701C4.52434 13.247 4.59355 13.0802 4.59375 12.9062V11.7976H9.40625V12.9062C9.40645 13.0802 9.47566 13.247 9.59869 13.3701C9.72171 13.4931 9.88851 13.5623 10.0625 13.5625H11.5938C11.7677 13.5623 11.9345 13.4931 12.0576 13.3701C12.1806 13.247 12.2498 13.0802 12.25 12.9062V11.7976C12.482 11.7973 12.7044 11.705 12.8684 11.541C13.0325 11.377 13.1247 11.1546 13.125 10.9226V7.86007C13.1247 7.62809 13.0325 7.40568 12.8684 7.24164C12.7044 7.0776 12.482 6.98533 12.25 6.98507ZM3.66885 4.85352C3.70327 4.7762 3.75936 4.71052 3.83033 4.66442C3.90131 4.61831 3.98412 4.59377 4.06875 4.59375H9.93125C10.0159 4.59379 10.0986 4.61835 10.1696 4.66445C10.2406 4.71055 10.2966 4.77622 10.331 4.85352L11.2784 6.98504H2.7215L3.66885 4.85352ZM3.71875 12.6875H2.625V11.7976H3.71875V12.6875ZM11.375 12.6875H10.2812V11.7976H11.375V12.6875ZM12.25 10.9226H1.75V7.86007H12.25V10.9226Z"></path>
                        <path d="M2.625 8.96875H4.8125V9.84375H2.625V8.96875Z"></path>
                        <path d="M9.1875 8.96875H11.375V9.84375H9.1875V8.96875Z"></path>
                        <path d="M7 0.403564L0.4375 3.03849V3.98139L7 1.34649L13.5625 3.98139V3.03849L7 0.403564Z"></path>
                      </svg>
                      <span>Yes</span>
                    </li>
                  </ul>

                  {/* Price and Wishlist */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm sm:text-base lg:text-lg text-blue-600 font-semibold">
                      AED 552,204
                    </span>

                    <button
                      className="wishlist-icon cursor-pointer p-1 hover:scale-110 transition-transform"
                      aria-label="Add to wishlist"
                      onClick={toggleWishlist}
                    >
                      {!isWishlisted ? (
                        <svg
                          className="transition-all duration-300 text-gray-400 hover:text-blue-900"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 21C12 21 4 13.8667 4 8.93333C4 6.29142 6.23858 4 9 4C10.6571 4 12 5 12 5C12 5 13.3429 4 15 4C17.7614 4 20 6.29142 20 8.93333C20 13.8667 12 21 12 21Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="transition-all duration-300 text-blue-900"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 21C12 21 4 13.8667 4 8.93333C4 6.29142 6.23858 4 9 4C10.6571 4 12 5 12 5C12 5 13.3429 4 15 4C17.7614 4 20 6.29142 20 8.93333C20 13.8667 12 21 12 21Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



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