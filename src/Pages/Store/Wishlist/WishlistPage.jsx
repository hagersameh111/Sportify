import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { products } from "../../../data/products";
import WishlistItem from "./Components/WishlistItem";
import WishlistEmptyState from "./Components/WishlistEmptyState";

const WISHLIST_KEY = "sportify_wishlist";
const CART_KEY = "sportify_cart";

const readStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const getId = (item) =>
  typeof item === "object" && item !== null ? item.id : item;

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY));

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const wishlistProducts = wishlist
    .map((savedItem) => {
      const savedId = getId(savedItem);

      // Keep the saved product details if the item is stored as an object.
      const savedProduct =
        typeof savedItem === "object" && savedItem !== null ? savedItem : null;

      return (
        products.find((product) => String(product.id) === String(savedId)) ??
        savedProduct
      );
    })
    .filter(Boolean);

  const removeFromWishlist = (productId) => {
    setWishlist((current) =>
      current.filter((item) => String(getId(item)) !== String(productId))
    );
  };

  const moveToCart = (product) => {
    const cart = readStorage(CART_KEY);
    const selectedSize = product.selectedSize ?? "L";
    const selectedColor = product.selectedColor ?? "Gradient";

    const existingItem = cart.find(
      (item) =>
        String(item.id) === String(product.id) &&
        (item.selectedSize ?? "L") === selectedSize &&
        (item.selectedColor ?? "Gradient") === selectedColor
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item === existingItem
          ? { ...item, quantity: Math.min(10, (Number(item.quantity) || 1) + 1) }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          selectedSize,
          selectedColor,
          quantity: 1,
          cartId: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
        },
      ];
    }

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    removeFromWishlist(product.id);
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/store"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#222062] transition hover:text-[#5C47E8]"
        >
          <ArrowLeft size={17} />
          Continue shopping
        </Link>

        <section className="mb-8 rounded-3xl bg-gradient-to-r from-[#222062] via-[#5C25DC] to-[#C737E4] p-7 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <Heart size={30} />
            <div>
              <p className="text-sm text-white/75">YOUR FAVORITES</p>
              <h1 className="text-3xl font-extrabold sm:text-4xl">My Wishlist</h1>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/85">
            Keep your favorite products together and add them to your cart when
            you’re ready.
          </p>
        </section>

        {wishlistProducts.length === 0 ? (
          <WishlistEmptyState />
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold text-[#222062]">
                Saved Products
              </h2>
              <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-[#5C25DC]">
                {wishlistProducts.length}{" "}
                {wishlistProducts.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {wishlistProducts.map((product) => (
                <WishlistItem
                  key={product.id}
                  product={product}
                  onRemove={() => removeFromWishlist(product.id)}
                  onMoveToCart={() => moveToCart(product)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}