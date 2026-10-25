import { useState } from "react";
import { Heart, ShoppingCart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
export default function StoreProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) {
  const [selectedColor, setSelectedColor] = useState(0);

  const colors = product.colors?.length
    ? product.colors
    : [
        { name: "Gradient", value: "linear-gradient(180deg, #222062, #E12427)" },
        { name: "Navy Blue", value: "#222062" },
        { name: "Red", value: "#E12427" },
      ];

  return (
    <article className="group block min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-950/5">
      {/* Product image */}
  {/* Product image */}
<div className="relative aspect-square w-full overflow-hidden bg-[#F5F4FA]">
  <Link
  to={`/store/${product.id}`}
  className="block aspect-square overflow-hidden bg-[#F1EFFA]"
>
  <img
    src={product.image}
    alt={product.name}
    loading="lazy"
    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
  />
</Link>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => onToggleWishlist?.(product.id)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#5C47E8] shadow-sm transition hover:bg-violet-50 sm:right-3 sm:top-3"
        >
          <Heart
            size={18}
            className={
              isWishlisted
                ? "fill-[#C737E4] text-[#C737E4]"
                : ""
            }
          />
        </button>

        {/* Add to cart */}
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          aria-label={`Add ${product.name} to cart`}
          className="absolute right-2 top-12 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#222062] shadow-sm transition hover:bg-[#5C47E8] hover:text-white sm:right-3 sm:top-14"
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      {/* Product details */}
      <div className="p-3 sm:p-3.5">
        <p className="text-xs font-semibold text-[#5C47E8]">
          {product.category || product.type || "Training Gear"}
        </p>

        <h3 className="mt-1 truncate font-bold text-zinc-900 transition-colors group-hover:text-[#5C47E8]">
<Link
  to={`/store/${product.id}`}
  className="truncate font-bold text-zinc-900 transition-colors hover:text-[#5C47E8]"
>
  {product.name}
</Link>
        </h3>

        <p className="mt-0.5 text-xs text-zinc-500">
          {product.brand || "ADRT"}
        </p>

        {/* Price and colors */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-base font-extrabold text-[#C737E4] sm:text-lg">
            ${product.price ?? 200}
          </p>

          <div className="flex items-center gap-1.5">
            {colors.map((color, index) => {
              const colorName =
                typeof color === "string" ? color : color.name;

              const colorValue =
                typeof color === "string" ? color : color.value;

              return (
                <button
                  key={`${colorName}-${index}`}
                  type="button"
                  title={colorName}
                  aria-label={`Select ${colorName}`}
                  aria-pressed={selectedColor === index}
                  onClick={() => setSelectedColor(index)}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition ${
                    selectedColor === index
                      ? "ring-2 ring-[#C737E4] ring-offset-1"
                      : ""
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-black/10"
                    style={{ background: colorValue }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile-friendly product action */}
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#5C47E8] to-[#5C25DC] px-3 py-2.5 text-xs font-bold text-white transition hover:from-[#4935CE] hover:to-[#4B19C8] sm:hidden"
        >
          <ShoppingBag size={15} />
          Add to cart
        </button>
      </div>
    </article>
  );
}