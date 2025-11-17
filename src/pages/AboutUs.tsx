import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Building2, Shield, TrendingUp, Users, Award, Globe, Heart, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We maintain the highest standards of honesty and transparency in every transaction",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Your success is our success. We prioritize your needs and goals above all",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We deliver exceptional service and results that exceed expectations",
  },
  {
    icon: Globe,
    title: "Global Vision",
    description: "Connecting international investors with Dubai's finest opportunities",
  },
];

const features = [
  {
    icon: Building2,
    title: "Premium Properties",
    description: "Exclusive access to Dubai's most sought-after real estate developments",
  },
  {
    icon: Shield,
    title: "RERA-Backed",
    description: "All properties verified and regulated by Dubai's Real Estate Regulatory Agency",
  },
  {
    icon: TrendingUp,
    title: "Guaranteed Returns",
    description: "Structured investments with guaranteed ROI up to 10% annually",
  },
  {
    icon: Users,
    title: "Global Network",
    description: "Trusted by international investors seeking long-term partnerships",
  },
];

const stats = [
  { value: "500+", label: "Properties Sold" },
  { value: "1000+", label: "Happy Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "$2B+", label: "Property Value" },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                About{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Sky Elite Real Estate
                </span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                We turn real estate into a structured journey of lasting growth, built on foresight,
                verified by regulation, and strengthened by long-term partnership.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg">Contact Us</Button>
                <Button size="lg" variant="outline">View Properties</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-muted/30 py-16">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded with a vision to transform Dubai's real estate landscape, Sky Elite Real Estate
                    has grown to become one of the most trusted names in luxury property investment.
                  </p>
                  <p>
                    Our journey began with a simple belief: that real estate investment should be transparent,
                    structured, and accessible to international investors seeking long-term value.
                  </p>
                  <p>
                    Today, we pride ourselves on our track record of delivering exceptional properties backed
                    by RERA regulation, offering guaranteed returns up to 10% annually, and building lasting
                    partnerships with clients from around the world.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800"
                    alt="Dubai Skyline"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Our Core Values
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Why Choose Sky Elite Real Estate
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                What sets us apart in Dubai's competitive real estate market
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-accent py-16 md:py-20 text-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Ready to Start Your Investment Journey?
              </h2>
              
              <p className="mb-8 text-lg md:text-xl opacity-90">
                Connect with our expert team today and discover exclusive opportunities
              </p>
              
              <Button size="lg" variant="secondary" className="text-base">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
