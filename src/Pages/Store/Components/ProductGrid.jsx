
import StoreProductCard from "./StoreProductCard";

export default function ProductGrid({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}) {
  if (!products.length) {
    return (
      <div className="col-span-full rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-16 text-center">
        <h3 className="text-lg font-bold text-[#181329]">
          No products found
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-2 items-stretch gap-3 sm:gap-4 xl:grid-cols-3">
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
  );
}
