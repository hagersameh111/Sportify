import { brands } from '../../../data/teams'

export default function BrandsSection() {
  return (
    <section className="border-y border-black/5 py-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-wrap items-center justify-between gap-8">
        {brands.map((brand, i) => (
          <span
            key={i}
            className="font-display text-lg md:text-xl tracking-tight text-surface-dark/70"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  )
}
