import { galleryImages } from '../../../data/teams'

export default function GallerySection() {
  return (
    <section id="community" className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <p className="eyebrow">Gallery</p>
          <h2 className="font-display text-3xl md:text-4xl mt-2">
            COMMUNITY IN <span className="bg-gradient-to-r from-[#5c47e8]  via-[#5c25dc] to-[#C737E4] bg-clip-text text-transparent">MOTION</span>
          </h2>
          <p className="text-surface-dark/60 mt-2 italic">
            Moments captured from our training sessions and events.
          </p>
        </div>
        <a href="#all-photos" className="explore-link shrink-0">
          Explore More
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((src, i) => (
          <div key={i} className="aspect-square rounded-sm overflow-hidden">
            <img
              src={src}
              alt="Community training moment"
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
