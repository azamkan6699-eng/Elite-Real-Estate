import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import {
  MapPin, Share2, Heart, Bed, Bath, Square, Calendar, Building2,
  Car, Phone, Mail, MessageSquare, Wifi, Dumbbell, Shield,
  Droplets, Wind, TreePine, Users, Package, Camera
} from "lucide-react";

import { EnvelopeIcon } from '@heroicons/react/24/solid';

import { useParams, Link } from "react-router-dom";
import heroProperty1 from "@/assets/hero-property-1.jpg";
import heroProperty2 from "@/assets/hero-property-2.jpg";
import heroProperty3 from "@/assets/hero-property-3.jpg";
import heroProperty4 from "@/assets/hero-property-4.jpg";
import heroProperty5 from "@/assets/hero-property-5.jpg";



import SuccessModal from "@/components/SuccessModal";
import { Helmet } from "react-helmet-async";

const PropertyDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<number>(0);

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Mock property data - in a real app, this would come from an API
  const property = {
    id: id,
    title: "Luxurious 3-Bedroom Apartment in Downtown Dubai",
    location: "Business Bay, Dubai",
    price: "AED 2,850,000",
    type: "Off-Plan",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,150 sqft",
    parkingSpaces: 2,
    completionDate: "Q4 2025",
    featured: true,
    roi: "8.5%",
    images: [heroProperty1, heroProperty2, heroProperty3, heroProperty4, heroProperty5],
    description: `Experience luxury living in this stunning 3-bedroom apartment located in the heart of Dubai's prestigious Business Bay. This modern residence offers breathtaking views of the Dubai skyline and combines contemporary design with exceptional comfort.

The spacious layout features floor-to-ceiling windows that flood the space with natural light, premium finishes throughout, and a thoughtfully designed floor plan that maximizes both space and functionality. The open-concept living and dining area seamlessly flows to a private balcony, perfect for entertaining or relaxing while enjoying panoramic city views.`,
    details: {
      propertyType: "Apartment",
      listingType: "Off-Plan",
      developer: "Emaar Properties",
      bedrooms: 3,
      bathrooms: 3,
      size: "2,150 sqft",
      parkingSpaces: 2,
      furnished: "Unfurnished",
      floor: "15th Floor",
      buildingFloors: "35 Floors",
      completionDate: "Q4 2025",
      paymentPlan: "60/40",
    },
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Dumbbell, name: "State-of-the-art Gym" },
      { icon: Droplets, name: "Swimming Pool" },
      { icon: Shield, name: "24/7 Security" },
      { icon: Car, name: "Covered Parking" },
      { icon: Wind, name: "Central AC" },
      { icon: TreePine, name: "Landscaped Gardens" },
      { icon: Users, name: "Kids Play Area" },
      { icon: Package, name: "Concierge Service" },
      { icon: Camera, name: "CCTV Surveillance" },
    ],
    locationDetails: {
      community: "Business Bay",
      city: "Dubai",
      nearbyLandmarks: ["Burj Khalifa (5 min)", "Dubai Mall (7 min)", "Dubai Marina (15 min)"],
      schoolsHospitals: "10-15 minutes drive",
    },
    agent: {
      name: "Muhammad Shahbaz Khan",
      role: "Senior Property Consultant",
      phone: "+971 58 827 3634",
      email: "shahbaz@skyelite.com",
      image: "",
      initials: "MS",
    },
  };



  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    agentEmail: "talalkhan@eliteconsultingsllc.com",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // API CALL here…
    // await axios.post("/api/contact", formData);

    alert("Message Sent!");

    // Close modal + reset form
    setIsOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
      agentEmail: "talalkhan@eliteconsultingsllc.com",
    });
  };



  const [open, setOpen] = useState(false);



  return (
    <>
      <Helmet>
        <title>Sky Elite Real Estate | Dubai Property Investment & Luxury Real Estate</title>

        {/* SEO Meta */}
        <meta
          name="description"
          content="Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        />
        <meta
          name="keywords"
          content="Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        />
        <meta name="author" content="Sky Elite Real Estate" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Luxurious 3-Bedroom Apartment in Downtown Dubai" />
        <meta
          property="og:description"
          content="Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elite-real-estate-five.vercel.app/?v=2" />
        <meta property="og:image" content="https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sky Elite Real Estate | Dubai Property Investment" />
        <meta
          name="twitter:description"
          content="Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        />
        <meta name="twitter:image" content="https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" />

        {/* Canonical */}
        <link rel="canonical" href="https://elite-real-estate-five.vercel.app/?v=2" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-[25px] sm:px-4 md:px-[58px] py-8 max-w-7xl">
          {/* Image Gallery & Map */}
          <section className="mb-8">
            <div className="grid lg:grid-cols-[1fr_350px] gap-6">
              {/* Large Image Gallery */}
              <div className="space-y-3">
                {/* Main Image */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="relative aspect-[16/9] w-full overflow-hidden rounded-xl cursor-pointer hover:opacity-90 transition-opacity group"
                      onClick={() => setSelectedImage(0)}
                    >
                      <img
                        src={property.images[0]}
                        alt={`${property.title} - Main`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Camera className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl w-full p-0">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {property.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative aspect-[16/9] w-full overflow-hidden">
                              <img
                                src={image}
                                alt={`${property.title} - Image ${index + 1}`}
                                className="h-full w-full object-contain bg-black"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </Carousel>
                  </DialogContent>
                </Dialog>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {property.images.slice(1, 5).map((image, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div
                          className="relative aspect-[4/3] w-full overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity group"
                          onClick={() => setSelectedImage(index + 1)}
                        >
                          <img
                            src={image}
                            alt={`${property.title} - ${index + 2}`}
                            className="h-full w-full object-cover"
                          />
                          {index === 3 && property.images.length > 5 && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                +{property.images.length - 5}
                              </span>
                            </div>
                          )}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl w-full p-0">
                        <Carousel className="w-full">
                          <CarouselContent>
                            {property.images.map((img, idx) => (
                              <CarouselItem key={idx}>
                                <div className="relative aspect-[16/9] w-full overflow-hidden">
                                  <img
                                    src={img}
                                    alt={`${property.title} - Image ${idx + 1}`}
                                    className="h-full w-full object-contain bg-black"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-4" />
                          <CarouselNext className="right-4" />
                        </Carousel>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>

              {/* Google Map - Compact */}
              {/* Google Map - Responsive & Perfectly Sized */}
              <div className="relative w-full overflow-hidden rounded-xl bg-muted h-[230px] md:h-[350px] lg:h-[445px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14437.869987554975!2d55.26578!3d25.186336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85bf9%3A0x4a3e9e3e8c8e8e8e!2sBusiness%20Bay%2C%20Dubai!5e0!3m2!1sen!2sae!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location Map"
                  className="absolute inset-0"
                />
              </div>

            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-primary text-primary-foreground">{property.type}</Badge>
                  {property.featured && (
                    <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
                  )}
                  {property.roi && (
                    <Badge className="bg-accent text-accent-foreground">ROI {property.roi}</Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{property.price}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Bed className="h-8 w-8 text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{property.bedrooms}</p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Bath className="h-8 w-8 text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{property.bathrooms}</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Square className="h-8 w-8 text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{property.area}</p>
                    <p className="text-sm text-muted-foreground">Area</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Car className="h-8 w-8 text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{property.parkingSpaces}</p>
                    <p className="text-sm text-muted-foreground">Parking</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-6 bg-muted/40 rounded-lg p-1">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium rounded-md transition-all"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium rounded-md transition-all"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="amenities"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium rounded-md transition-all"
                  >
                    Amenities
                  </TabsTrigger>
                </TabsList>


                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-foreground mb-4">Property Description</h2>
                      <div className="text-muted-foreground space-y-4 leading-relaxed">
                        {property.description.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Location & Community
                      </h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Community</p>
                            <p className="font-semibold text-foreground">{property.locationDetails.community}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">City</p>
                            <p className="font-semibold text-foreground">{property.locationDetails.city}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Nearby Landmarks</p>
                          <ul className="space-y-1">
                            {property.locationDetails.nearbyLandmarks.map((landmark, index) => (
                              <li key={index} className="text-foreground flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                {landmark}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Schools & Hospitals</p>
                          <p className="font-semibold text-foreground">{property.locationDetails.schoolsHospitals}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-foreground mb-4">Property Details</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(property.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-3 border-b border-border">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-semibold text-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="amenities">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-foreground mb-4">Amenities & Features</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <amenity.icon className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-sm font-medium text-foreground">{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Agent Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Contact Agent</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={property.agent.image} alt={property.agent.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {property.agent.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-foreground">{property.agent.name}</p>
                      <p className="text-sm text-muted-foreground">{property.agent.role}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3 mb-6">
                    <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                      <Phone className="h-5 w-5" />
                      <span>{property.agent.phone}</span>
                    </a>
                    <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                      <Mail className="h-5 w-5" />
                      <span className="break-all">{property.agent.email}</span>
                    </a>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" onClick={() => setOpen(true)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      onClick={() => setIsOpen(true)}   // <-- OPEN MODAL
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email Agent
                    </Button>

                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Property Reference</p>
                    <p className="text-sm text-muted-foreground">SKY-{property.id}</p>
                  </div>
                </CardContent>
              </Card>
            </div>


            {/* Contact Agent Modal */}
            {isOpen && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg animate-fadeIn">
                  {/* Header */}
                  <div className="bg-[#3f547d] text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Mail className="h-7 w-7 mr-2" />
                      Contact Agent
                    </h2>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:text-gray-300"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 bg-gray-50 rounded-b-2xl">
                    <form className="space-y-3" onSubmit={handleSubmit}>

                      {/* Full Name */}
                      <div>
                        <label className="font-semibold block mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="w-full p-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-blue-500 outline-none"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="font-semibold block mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full p-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-blue-500 outline-none"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="font-semibold block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+971 5X XXX XXXX"
                          className="w-full p-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-blue-500 outline-none"
                          required
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="font-semibold block mb-1">Your Message</label>
                        <textarea
                          name="message"

                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Write your message here..."
                          className="w-full p-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                          required
                        ></textarea>
                      </div>

                      {/* Hidden email */}
                      <input type="hidden" name="agentEmail" value={formData.agentEmail} />

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full bg-[#3f547d] text-white py-2 rounded-lg font-medium hover:bg-[#4a69a3] transition"
                      >
                        Contact Us
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}




            {/* Modal */}
            {open && (
              <SuccessModal isOpen={open} onClose={() => setOpen(false)} />
            )}


          </div>

          {/* Similar Properties */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Similar Properties</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={heroProperty1}
                      alt="Similar property"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Off-Plan
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-foreground mb-2 line-clamp-1">
                      Modern Apartment in Business Bay
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">Business Bay, Dubai</p>
                    <p className="text-xl font-bold text-primary mb-3">AED 2,500,000</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>3 Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        <span>2,000 sqft</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PropertyDetails;