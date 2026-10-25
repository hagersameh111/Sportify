import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ArrowRight,
  Check,
} from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const COLORS = [
  {
    name: "Gradient",
    value: "linear-gradient(180deg, #222062 0%, #C737E4 100%)",
  },
  { name: "Navy Blue", value: "#222062" },
  { name: "Violet", value: "#5C47E8" },
];

export default function ProductInfo({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  onViewReviews,
}) {
  const [localCart, setLocalCart] = useState(false);

  const price = Number(product.price ?? 200);

  const description =
    product.description ||
    "Clean-cut sportswear with a comfortable fit. Breathable, versatile, and designed for training, running, and everyday wear.";

  const handleAddToCart = () => {
    if (!onAddToCart) return;

    onAddToCart(product, {
      selectedSize,
      selectedColor: COLORS[selectedColor]?.name ?? COLORS[0].name,
      quantity,
    });

    setLocalCart(true);
    window.setTimeout(() => setLocalCart(false), 1800);
  };

  const handleToggleWishlist = () => {
    if (!onToggleWishlist) return;
    onToggleWishlist(product);
  };

  return (
    <div className="min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#5C47E8]">
            {product.brand || "Sportify"}
          </p>

          <h1 className="mt-1 text-2xl font-extrabold text-[#222062] sm:text-3xl">
            {product.name}
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            {product.category || product.type || "Unisex"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-[#5C47E8] transition hover:bg-violet-50"
        >
          <Heart
            size={20}
            className={
              isWishlisted ? "fill-[#C737E4] text-[#C737E4]" : ""
            }
          />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <p className="text-2xl font-extrabold text-[#C737E4]">
          ${price.toFixed(2)}
        </p>
        <span className="text-xs text-zinc-400">
          Inclusive of applicable taxes
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={15} className="fill-current" />
          ))}
        </div>

        <span className="text-sm font-semibold">4.9/5</span>

        <button
          type="button"
          onClick={onViewReviews}
          className="text-sm text-zinc-500 underline underline-offset-2 hover:text-[#5C47E8]"
        >
          (100 reviews)
        </button>
      </div>

      <p className="mt-5 text-sm leading-6 text-zinc-600">
        {description}
      </p>

      <div className="my-5 border-t border-zinc-200" />

      {/* Size selection */}
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-[#222062]">Size</h2>

          <span className="text-xs text-zinc-500">
            Selected: {selectedSize}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={`rounded-lg px-2 py-3 text-xs font-semibold transition ${
                selectedSize === size
                  ? "bg-[#5C47E8] text-white shadow-sm"
                  : "bg-[#F1EFFA] text-zinc-600 hover:bg-violet-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color selection */}
      <div className="mt-5">
        <h2 className="mb-3 text-sm font-bold text-[#222062]">
          Color{" "}
          <span className="ml-1 font-normal text-zinc-500">
            {COLORS[selectedColor]?.name ?? COLORS[0].name}
          </span>
        </h2>

        <div className="flex items-center gap-3">
          {COLORS.map((color, index) => (
            <button
              key={color.name}
              type="button"
              title={color.name}
              aria-label={`Select ${color.name}`}
              aria-pressed={selectedColor === index}
              onClick={() => setSelectedColor(index)}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                selectedColor === index
                  ? "ring-2 ring-[#C737E4] ring-offset-2"
                  : ""
              }`}
            >
              <span
                className="h-6 w-6 rounded-full border border-black/10"
                style={{ background: color.value }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Quantity and stock */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="mb-3 text-sm font-bold text-[#222062]">
              Quantity
            </h2>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity((value) => Math.max(1, value - 1))
                }
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1EFFA] text-[#222062] transition hover:bg-violet-100 disabled:opacity-40"
              >
                <Minus size={15} />
              </button>

              <span className="min-w-5 text-center text-sm font-bold">
                {quantity}
              </span>

              <button
                type="button"
                disabled={quantity >= 10}
                onClick={() =>
                  setQuantity((value) => Math.min(10, value + 1))
                }
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1EFFA] text-[#222062] transition hover:bg-violet-100 disabled:opacity-40"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-500">
            <span className="font-bold text-[#222062]">Stock</span>
            <span className="mx-2 text-[#C737E4]">|</span>
            125 available
          </p>
        </div>
      </div>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#5C47E8] to-[#5C25DC] px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
      >
        {localCart ? <Check size={18} /> : <ShoppingCart size={18} />}
        {localCart ? "Added to cart" : "Add to cart"}
        <ArrowRight size={17} />
      </button>
    </div>
  );
}
