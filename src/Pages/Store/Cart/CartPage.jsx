import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import CartItem from "./Components/CartItem";
import CartSummary from "./Components/CartSummary";
import CartEmptyState from "./Components/CartEmptyState";

const CART_KEY = "sportify_cart";
const WISHLIST_KEY = "sportify_wishlist";

const readStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const normalizeItem = (item, index) => {
  const product = typeof item === "object" && item !== null ? item : {};

  return {
    ...product,
    id: product.id ?? item,
    cartId:
      product.cartId ??
      `${product.id ?? item}-${product.selectedSize ?? "L"}-${product.selectedColor ?? "Gradient"}-${index}`,
    name: product.name ?? "Sportify product",
    image: product.image ?? product.imageUrl ?? "",
    price: Number(product.price) || 0,
    selectedSize: product.selectedSize ?? "L",
    selectedColor: product.selectedColor ?? "Gradient",
    quantity: Math.max(1, Number(product.quantity) || 1),
  };
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState(() =>
    readStorage(CART_KEY).map(normalizeItem)
  );
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) => cartItems.some((item) => item.cartId === id))
    );
  }, [cartItems]);

  const selectedItems = useMemo(
    () => cartItems.filter((item) => selectedIds.includes(item.cartId)),
    [cartItems, selectedIds]
  );

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = selectedItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;
  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => selectedIds.includes(item.cartId));

  const toggleItem = (cartId) => {
    setSelectedIds((current) =>
      current.includes(cartId)
        ? current.filter((id) => id !== cartId)
        : [...current, cartId]
    );
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : cartItems.map((item) => item.cartId));
  };

  const updateQuantity = (cartId, change) => {
    setCartItems((current) =>
      current.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: Math.min(10, Math.max(1, item.quantity + change)) }
          : item
      )
    );
  };

  const removeItem = (cartId) => {
    setCartItems((current) => current.filter((item) => item.cartId !== cartId));
    setSelectedIds((current) => current.filter((id) => id !== cartId));
  };

  const removeSelected = () => {
    setCartItems((current) =>
      current.filter((item) => !selectedIds.includes(item.cartId))
    );
    setSelectedIds([]);
  };

  const toggleWishlist = (product) => {
    const wishlist = readStorage(WISHLIST_KEY);
    const exists = wishlist.some(
      (item) => String(typeof item === "object" ? item.id : item) === String(product.id)
    );

    const updated = exists
      ? wishlist.filter(
          (item) =>
            String(typeof item === "object" ? item.id : item) !== String(product.id)
        )
      : [...wishlist, product.id];

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  if (cartItems.length === 0) {
    return <CartEmptyState />;
  }

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

        <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#222062] via-[#5C25DC] to-[#C737E4] p-7 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <ShoppingBag size={30} />
            <div>
              <p className="text-sm text-white/75">SPORTIFY STORE</p>
              <h1 className="text-3xl font-extrabold sm:text-4xl">Your Cart</h1>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/85">
            Review your items and choose what you want to order.
          </p>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[1fr_360px]">
          <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 p-5">
              <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-zinc-800">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 accent-[#5C47E8]"
                />
                Select all ({cartItems.length} items)
              </label>

              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={removeSelected}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#5C25DC] hover:text-[#C737E4]"
                >
                  <Trash2 size={16} />
                  Remove selected ({selectedIds.length})
                </button>
              )}
            </div>

            <div className="divide-y divide-zinc-100">
              {cartItems.map((item) => (
                <CartItem
                  key={item.cartId}
                  item={item}
                  selected={selectedIds.includes(item.cartId)}
                  onToggle={() => toggleItem(item.cartId)}
                  onQuantityChange={(change) => updateQuantity(item.cartId, change)}
                  onRemove={() => removeItem(item.cartId)}
                  onToggleWishlist={() => toggleWishlist(item)}
                />
              ))}
            </div>
          </section>

          <CartSummary
            items={selectedItems}
            itemCount={selectedItems.reduce((sum, item) => sum + item.quantity, 0)}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            hasSelection={selectedItems.length > 0}
          />
        </div>
      </div>
    </main>
  );
}