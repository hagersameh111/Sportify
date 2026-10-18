
import { brands } from "../../../data/teams";

export default function BrandsSection() {
  const repeatedBrands = [...brands, ...brands];

  return (
    <section className="overflow-hidden border-y border-black/5 bg-white py-8">
     

      <div className="relative overflow-hidden">
        {/* Fading edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

        <div className="brands-marquee flex w-max items-center gap-12 md:gap-20">
          {repeatedBrands.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              aria-hidden={i >= brands.length}
              className="shrink-0 font-display text-lg font-bold tracking-tight text-zinc-500/80 transition-colors duration-300 hover:text-violet-600 md:text-xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .brands-marquee {
          animation: brands-scroll 30s linear infinite;
        }

        .brands-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes brands-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .brands-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
