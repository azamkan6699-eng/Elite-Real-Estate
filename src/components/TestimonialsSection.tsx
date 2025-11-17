import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Saad Hussain",
    content: "Sky Elite Real Estate made my property purchase seamless with their professionalism, honesty, and market expertise. They supported me throughout and treated my goals as their own. Highly recommended!",
    rating: 5,
  },
  {
    name: "Ahmed Al-Mansoori",
    content: "Outstanding service and exceptional properties. The team's knowledge of Dubai's real estate market is impressive. They helped me secure an investment with guaranteed returns.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    content: "As an international investor, I needed a partner I could trust. Sky Elite provided transparent guidance throughout the entire process. Very satisfied with my investment.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Reviews From Our Happy Clients
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Trusted by investors worldwide for our commitment to excellence
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">
                  "{testimonial.content}"
                </p>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
