
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StoreProductCard from "./StoreProductCard";

export default function RelatedProducts({
  products = [],
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}) {
  return (
    <section className="mt-5">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-zinc-200 pb-3">
        <h2 className="text-lg font-extrabold">Related Products</h2>

        <Link
          to="/store"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#5C47E8] hover:text-[#C737E4]"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-4">
          {products.map((product) => (
            <StoreProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-[#F5F4FA] p-6 text-sm text-zinc-500">
          No related products available yet.
        </p>
      )}
    </section>
  );
}
