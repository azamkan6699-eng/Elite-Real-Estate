import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertiesSection } from "@/components/PropertiesSection";
import { InvestmentBanner } from "@/components/InvestmentBanner";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/rendere/renderer";




// Page-specific meta
export { pageContext }

const pageContext = {
  pageMeta: {
    title: "Sky Elite Real Estate | Dubai Property Investment & Luxury Real Estate",
    description: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors.",
    keywords: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments",
    author: "Sky Elite Real Estate",
    ogTitle: "Luxurious 3-Bedroom Apartment in Downtown Dubai",
    ogDescription: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns.",
    ogType: "website",
    ogUrl: "https://elite-real-estate-five.vercel.app/?v=2",
    ogImage: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    twitterCard: "summary_large_image",
    twitterTitle: "Sky Elite Real Estate | Dubai Property Investment",
    twitterDescription: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas.",
    twitterImage: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2",
    canonical: "https://elite-real-estate-five.vercel.app/?v=2",
    favicon: "/favicon.png"
  }
}


const Index = () => {
  return (
    <>
      <PageShell pageContext={pageContext}>
        <div className="min-h-screen bg-background">

          <Navbar />
          <main>
            <h1>This Chick</h1>
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
      </PageShell>

    </>
  );
};

export default Index;
