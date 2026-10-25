
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({
  product,
  activeImage,
  setActiveImage,
}) {
  const gallery =
    product.galleryImages?.length > 0
      ? product.galleryImages
      : [product.image, product.image, product.image];

  const showPrevious = () => {
    setActiveImage(
      (current) => (current - 1 + gallery.length) % gallery.length
    );
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % gallery.length);
  };

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_100px] lg:grid-cols-[minmax(0,1fr)_120px]">
      <div className="relative flex aspect-[4/5] min-w-0 items-center justify-center overflow-hidden rounded-xl bg-[#F1EFFA]">
        <img
          key={`${product.id}-${activeImage}`}
          src={gallery[activeImage]}
          alt={product.name}
          className="h-full w-full object-contain"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#5C47E8]">
          Club Collection
        </span>

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous product image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#222062] shadow-sm transition hover:bg-white sm:hidden"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next product image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#222062] shadow-sm transition hover:bg-white sm:hidden"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
        {gallery.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(index)}
            aria-label={`View product image ${index + 1}`}
            aria-pressed={activeImage === index}
            className={`aspect-square overflow-hidden rounded-lg bg-[#F1EFFA] transition ${
              activeImage === index
                ? "ring-2 ring-[#C737E4] ring-offset-1"
                : "border border-transparent hover:border-violet-200"
            }`}
          >
            <img
              src={image}
              alt={`${product.name} view ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
