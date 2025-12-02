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
        <title>Sky Elite Real Estate | Dubai Property Investment & Luxury Real Estate</title>
        <link rel="icon" href="/favicon.png" />

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
