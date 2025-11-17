import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const InvestmentBanner = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-accent py-16 md:py-20 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <TrendingUp className="h-16 w-16" />
          </div>
          
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Invest Once. Earn 10% Net ROI for 10 Years
          </h2>
          
          <p className="mb-8 text-lg md:text-xl opacity-90">
            Al Haseen Residences - the new standard of structured investing
          </p>
          
          <Button size="lg" variant="secondary" className="text-base" asChild>
            <Link to="/al-haseen-residences">
              Explore The Investment Details
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
