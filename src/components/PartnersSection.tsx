import { useEffect, useRef } from "react";

import emaarLogo from "@/assets/Logo-1.png";
import damacLogo from "@/assets/Logo-2.png";
import nakheelLogo from "@/assets/Logo-3.png";
import binghattiLogo from "@/assets/Logo-4.png";
import aziziLogo from "@/assets/Logo-5.png";
import aldarLogo from "@/assets/Logo-6.png";

export const PartnersSection = () => {
  const trackRef = useRef(null);

  const partners = [
    { name: "EMAAR", logo: emaarLogo },
    { name: "DAMAC", logo: damacLogo },
    { name: "NAKHEEL", logo: nakheelLogo },
    { name: "BINGHATTI", logo: binghattiLogo },
    { name: "AZIZI", logo: aziziLogo },
    { name: "ALDAR", logo: aldarLogo },
  ];

  // Duplicate partners to create infinite scroll
  const sliderItems = [...partners, ...partners];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    const speed = 0.6; // Adjust for faster/slower scrolling
    const totalWidth = track.scrollWidth / 2;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="border-y border-border bg-muted/30 py-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">

        <h3 className="mb-8 text-center text-xl font-semibold text-muted-foreground">
          Our Official Partners
        </h3>

        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 items-center w-max"
          >
            {sliderItems.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-lg bg-card p-2 transition-all hover:shadow-md min-w-[140px]"
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

      </div>
    </section>
  );
};
