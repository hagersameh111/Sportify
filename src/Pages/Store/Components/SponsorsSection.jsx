
import { sponsors } from "../../../data/products";

export default function SponsorsSection() {
  const repeatedSponsors = [...sponsors, ...sponsors];

  return (
    <section className="overflow-hidden border-t border-zinc-100 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-sm font-bold text-zinc-700">
          Sponsored By
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <div className="sponsors-marquee flex w-max items-center gap-12 sm:gap-20">
          {repeatedSponsors.map((sponsor, index) => (
            <span
              key={`${sponsor}-${index}`}
              aria-hidden={index >= sponsors.length}
              className="shrink-0 text-xl font-black tracking-tight text-[#222062]/70 transition-colors hover:text-[#5C47E8] sm:text-2xl"
            >
              {sponsor}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .sponsors-marquee {
          animation: sponsors-scroll 28s linear infinite;
        }

        .sponsors-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes sponsors-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sponsors-marquee {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  );
}
