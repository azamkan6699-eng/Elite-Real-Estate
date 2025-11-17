import { PropertyCard } from "./PropertyCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const properties = {
  all: [
    {
      id: "1",
      title: "Stylish Studio in Al Haseen 4",
      location: "Dugasta, Dubai",
      price: "AED 379,000",
      type: "For Sale",
      area: "379 sq.ft",
      addedDate: "06 Nov 2025",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    },
    {
      id: "2",
      title: "1 BHK in Dugasta Al Haseen 4",
      location: "Al Haseen-4, Dubai",
      price: "AED 552,204",
      type: "Off-Plan",
      bedrooms: 1,
      area: "550 sq.ft",
      addedDate: "03 Sep 2025",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    },
    {
      id: "3",
      title: "Annual Returns 10%",
      location: "Al Haseen-4, Dubai",
      price: "AED 1,427,989",
      type: "Ready Investment",
      bedrooms: 1,
      area: "650 sq.ft",
      addedDate: "03 Sep 2025",
      roi: "10%",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      featured: true,
    },
    {
      id: "4",
      title: "Luxury Villas Handing Over In 2029",
      location: "Selvara, Grand Polo Club & Resort, Dubai",
      price: "AED 6,286,888",
      type: "Off-Plan",
      bedrooms: 4,
      area: "3500 sq.ft",
      addedDate: "30 Jul 2025",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      featured: true,
    },
  ],
};

export const PropertiesSection = () => {
  return (
    <section id="properties" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Featured Properties
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover premium Dubai properties with guaranteed returns and long-term value
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sale">For Sale</TabsTrigger>
            <TabsTrigger value="offplan">Off-Plan</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.all.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sale">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.all.filter(p => p.type === "For Sale").map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offplan">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.all.filter(p => p.type === "Off-Plan").map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investment">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.all.filter(p => p.type === "Ready Investment").map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
