import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

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

const OffPlan = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="max-w-3xl">
              <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Services
              </div>
              <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                Off-Plan Properties
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Secure your future with off-plan properties with high returns and flexible payment plans. 
                Explore premium developments that align with your investment goals.
              </p>
              <Button size="lg" className="gap-2">
                Get Expert Advice
              </Button>
            </div>
          </div>
        </section>

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
  );
};

export default OffPlan;
