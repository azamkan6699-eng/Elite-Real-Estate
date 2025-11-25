import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertiesSection } from "@/components/PropertiesSection";
import { InvestmentBanner } from "@/components/InvestmentBanner";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Elite Real Estate - Dubai Properties</title>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Invest with Foresight, Built on Structure" />
        <meta
          property="og:description"
          content="Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elite-real-estate-five.vercel.app/?v=2" />
        <meta property="og:image" content="https://elite-real-estate-five.vercel.app/Thumbnail.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* SEO Meta Tags */}
        <meta name="description" content="Dubai luxury real estate listings with verified investment opportunities." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <PropertyFilters />
          <PropertiesSection />
          <InvestmentBanner />
          <AboutSection />
          <TestimonialsSection />
          <PartnersSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
