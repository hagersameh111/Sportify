import { Link } from "react-router-dom";
import { ArrowRight, Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function WishlistItem({ product, onRemove, onMoveToCart }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            No image available
          </div>
        )}

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${product.name} from wishlist`}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-violet-50"
        >
          <Heart size={19} fill="#5C47E8" className="text-[#5C47E8]" />
        </button>
      </div>

      <div className="p-5">
        {product.category && (
          <p className="text-xs font-bold uppercase tracking-wider text-[#5C47E8]">
            {product.category}
          </p>
        )}

        <h3 className="mt-2 line-clamp-2 text-lg font-extrabold text-[#222062]">
          {product.name}
        </h3>

        {product.brand && (
          <p className="mt-1 text-sm text-zinc-500">{product.brand}</p>
        )}

        <p className="mt-3 text-xl font-extrabold text-[#5C25DC]">
          ${Number(product.price || 0).toFixed(2)}
        </p>

        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={onMoveToCart}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5C47E8] to-[#5C25DC] px-3 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            <ShoppingCart size={17} />
            Add to Cart
          </button>

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Delete ${product.name}`}
            className="flex items-center justify-center rounded-xl border border-zinc-200 px-3 text-zinc-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-[#5C25DC]"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <Link
          to={`/store/${product.id}`}
          className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#222062] transition hover:text-[#C737E4]"
        >
          View product
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}