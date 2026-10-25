
import { useState } from "react";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function FeaturedProducts({ products, onAddToCart, onToggleWishlist, wishlist }) {
  const featured = products.filter((product) => product.featured);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!featured.length) return null;

  const current = featured[activeIndex];
  const previous = featured[(activeIndex - 1 + featured.length) % featured.length];
  const next = featured[(activeIndex + 1) % featured.length];

  const changeSlide = (direction) => {
    setActiveIndex((index) => (index + direction + featured.length) % featured.length);
  };

  const featuredCard = (product, side) => (
    <button
      key={`${side}-${product.id}`}
      onClick={() => setActiveIndex(featured.findIndex((item) => item.id === product.id))}
      className={`group relative hidden overflow-hidden rounded-2xl bg-[#292440] transition duration-300 md:block ${
        side === "center"
          ? "w-full max-w-3xl p-5 text-left lg:p-7"
          : "w-full max-w-xs p-4 opacity-75 hover:opacity-100"
      }`}
    >
      <img
        src={product.image}
        alt={product.name}
        className={`w-full object-contain transition duration-500 group-hover:scale-105 ${
          side === "center" ? "h-52 lg:h-64" : "h-40"
        }`}
      />
      {side === "center" && (
        <div className="mt-4">
          <p className="text-xl font-bold text-white">{product.name}</p>
          <p className="mt-1 text-sm text-zinc-300">{product.category}</p>
          <p className="mt-3 text-2xl font-extrabold text-[#C737E4]">
            ${product.price}
          </p>
        </div>
      )}
    </button>
  );

  return (
    <section className="overflow-hidden bg-[#17132D] py-10 text-white sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C737E4]">
              The club collection
            </p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Featured Products
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => changeSlide(-1)}
              aria-label="Previous product"
              className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => changeSlide(1)}
              aria-label="Next product"
              className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid items-center gap-4 md:grid-cols-[1fr_2fr_1fr]">
          {featuredCard(previous, "side")}

          <div className="grid items-center gap-5 rounded-2xl bg-[#292440] p-4 sm:p-6 md:grid-cols-2 lg:p-8">
            <div className="order-2 md:order-1">
              <p className="text-2xl font-extrabold sm:text-3xl">{current.name}</p>
              <p className="mt-1 text-sm text-zinc-300">{current.category}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                {current.description}
              </p>
              <p className="mt-4 text-3xl font-extrabold text-[#C737E4]">
                ${current.price}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => onAddToCart(current)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5C47E8] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#4935CE]"
                >
                  <ShoppingCart size={17} />
                  Add to cart
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => onToggleWishlist(current.id)}
                  aria-label="Toggle wishlist"
                  className="rounded-lg bg-white/10 p-3 transition hover:bg-white/20"
                >
                  <Heart
                    size={18}
                    className={wishlist.includes(current.id) ? "fill-[#C737E4] text-[#C737E4]" : ""}
                  />
                </button>
              </div>
            </div>

            <img
              src={current.image}
              alt={current.name}
              className="order-1 h-52 w-full object-contain sm:h-64 md:order-2"
            />
          </div>

          {featuredCard(next, "side")}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {featured.map((product, index) => (
            <button
              key={product.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${product.name}`}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? "w-8 bg-[#C737E4]" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
