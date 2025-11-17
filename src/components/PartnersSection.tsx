import emaarLogo from "@/assets/Logo-1.png";
import damacLogo from "@/assets/Logo-2.png";
import nakheelLogo from "@/assets/Logo-3.png";
import binghattiLogo from "@/assets/Logo-4.png";
import aziziLogo from "@/assets/Logo-5.png";
import aldarLogo from "@/assets/Logo-6.png";

export const PartnersSection = () => {
  const partners = [
    { name: "EMAAR", logo: emaarLogo },
    { name: "DAMAC", logo: damacLogo },
    { name: "NAKHEEL", logo: nakheelLogo },
    { name: "BINGHATTI", logo: binghattiLogo },
    { name: "AZIZI", logo: aziziLogo },
    { name: "ALDAR", logo: aldarLogo },
  ];

  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        
        <h3 className="mb-8 text-center text-xl font-semibold text-muted-foreground">
          Our Official Partners
        </h3>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg bg-card p-2 transition-all hover:shadow-md"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-[80px] object-contain opacity-80 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
