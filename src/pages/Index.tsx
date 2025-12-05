import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertiesSection } from "@/components/PropertiesSection";
import { InvestmentBanner } from "@/components/InvestmentBanner";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";










const Index = () => {
  return (
    <>
      
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
