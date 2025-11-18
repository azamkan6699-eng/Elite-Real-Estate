import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import heroProperty1 from "@/assets/hero-property-1.jpg";
import heroProperty2 from "@/assets/hero-property-2.jpg";
import heroProperty3 from "@/assets/hero-property-3.jpg";
import heroProperty4 from "@/assets/hero-property-4.jpg";


import emaarLogo from "@/assets/Logo-1.png";
import damacLogo from "@/assets/Logo-3.png";
import nakheelLogo from "@/assets/Logo-10.png";



const visualShowcase = [
  {
    image: heroProperty1,
    title: "Waterfront Luxury",
    subtitle: "Premium Properties"
  },
  {
    image: heroProperty2,
    title: "Urban Excellence",
    subtitle: "Dubai Marina"
  },
  {
    image: heroProperty3,
    title: "Sky-High Living",
    subtitle: "Penthouse Collection"
  },
  {
    image: heroProperty4,
    title: "Iconic Locations",
    subtitle: "Palm Jumeirah"
  },
];

const highlights = [
  "Tax-Efficient Structures",
  "Long-Term Partnership",
  "Performance-Driven Selection",
  "Regulatory Compliance",
];

export const Hero = () => {
  const scrollToProperties = () => {
    const element = document.getElementById('properties');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <TrendingUp className="h-4 w-4" />
              <span>Structured Real Estate Investment</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Invest with{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Foresight
              </span>
              , Built on Structure
            </h1>

            <p className="mb-6 text-lg text-muted-foreground md:text-xl">
              Transform your wealth through Dubai's most promising real estate opportunities
            </p>

            {/* Highlights Grid */}
            <div className="mb-8 grid grid-cols-2 gap-3">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-card p-3 shadow-sm transition-all hover:shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-foreground">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" onClick={scrollToProperties} className="gap-2 text-base shadow-lg hover:shadow-xl transition-all">
                Explore Opportunities
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base border-2">
                Schedule Consultation
              </Button>
            </div>
          </div>

          {/* Right Content - Visual Showcase */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {visualShowcase.map((visual, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 aspect-[4/3]"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Property Image */}
                <img
                  src={visual.image}
                  alt={visual.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{visual.title}</h3>
                  <p className="text-sm text-white/90">{visual.subtitle}</p>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View More
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-border pt-8 opacity-70">
          <p className="text-sm font-medium text-muted-foreground">Trusted Partners:</p>

          <div className="flex flex-wrap items-center gap-8">
            {[emaarLogo, damacLogo, nakheelLogo].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Partner Logo"
                className="h-[110px] object-contain opacity-70 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

