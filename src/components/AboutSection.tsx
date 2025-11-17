import { Building2, Shield, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Why Choose Sky Elite Real Estate
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We turn real estate into a structured journey of lasting growth, built on foresight, 
            verified by regulation, and strengthened by long-term partnership.
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
  );
};
