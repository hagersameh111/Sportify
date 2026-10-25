
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  Heart,
  ShoppingCart,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { products } from "../../../data/products";

const CART_KEY = "sportify_cart";
const WISHLIST_KEY = "sportify_wishlist";

const readItems = (key) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getId = (item) =>
  item && typeof item === "object" ? item.id : item;

const getProduct = (item) => {
  const id = getId(item);
  return products.find((product) => String(product.id) === String(id)) || item;
};

const money = (value) => `$${Number(value || 0).toFixed(2)}`;

export default function StoreQuickDrawer() {
  const location = useLocation();

  const [cart, setCart] = useState(() => readItems(CART_KEY));
  const [wishlist, setWishlist] = useState(() => readItems(WISHLIST_KEY));
  const [activeDrawer, setActiveDrawer] = useState(null);

  const isStoreRoute =
    location.pathname === "/store" ||
    location.pathname.startsWith("/store/");

  useEffect(() => {
    const syncItems = () => {
      setCart(readItems(CART_KEY));
      setWishlist(readItems(WISHLIST_KEY));
    };

    window.addEventListener("storage", syncItems);
    window.addEventListener("sportify-cart-updated", syncItems);
    window.addEventListener("sportify-wishlist-updated", syncItems);

    syncItems();

    return () => {
      window.removeEventListener("storage", syncItems);
      window.removeEventListener("sportify-cart-updated", syncItems);
      window.removeEventListener("sportify-wishlist-updated", syncItems);
    };
  }, [location.pathname]);

  useEffect(() => {
    setActiveDrawer(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!activeDrawer) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveDrawer(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeDrawer]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + Math.max(1, Number(item.quantity) || 1), 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProduct(item);
        return sum + Number(product.price || item.price || 0) * Math.max(1, Number(item.quantity) || 1);
      }, 0),
    [cart]
  );

  const saveCart = (updated) => {
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    setCart(updated);
    window.dispatchEvent(new Event("sportify-cart-updated"));
  };

  const saveWishlist = (updated) => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    setWishlist(updated);
    window.dispatchEvent(new Event("sportify-wishlist-updated"));
  };

  const removeFromCart = (itemToRemove, indexToRemove) => {
    const updated = cart.filter((item, index) => {
      if (itemToRemove.cartId && item.cartId) {
        return item.cartId !== itemToRemove.cartId;
      }

      return index !== indexToRemove;
    });

    saveCart(updated);
  };

  const changeQuantity = (index, change) => {
    const updated = cart
      .map((item, itemIndex) => {
        if (itemIndex !== index) return item;

        return {
          ...item,
          quantity: Math.max(1, Math.min(10, (Number(item.quantity) || 1) + change)),
        };
      });

    saveCart(updated);
  };

  const removeFromWishlist = (item) => {
    const id = getId(item);
    const updated = wishlist.filter(
      (saved) => String(getId(saved)) !== String(id)
    );
    saveWishlist(updated);
  };

  const moveToCart = (item) => {
    const product = getProduct(item);
    const id = getId(item);

    if (!product?.id) return;

    const selectedSize = item.selectedSize || product.selectedSize || "L";
    const selectedColor = item.selectedColor || product.selectedColor || "Gradient";

    const existingIndex = cart.findIndex(
      (saved) =>
        String(saved.id) === String(product.id) &&
        String(saved.selectedSize || "L") === String(selectedSize) &&
        String(saved.selectedColor || "Gradient") === String(selectedColor)
    );

    let updatedCart;

    if (existingIndex >= 0) {
      updatedCart = cart.map((saved, index) =>
        index === existingIndex
          ? {
              ...saved,
              quantity: Math.min(10, (Number(saved.quantity) || 1) + 1),
            }
          : saved
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

    saveCart(updatedCart);
    removeFromWishlist(item);
  };

  if (!isStoreRoute) return null;

  const drawerItems = activeDrawer === "cart" ? cart : wishlist;
  const fullPagePath = activeDrawer === "cart" ? "/cart" : "/wishlist";

  return (
    <>
      {/* Floating controls */}
      <div className="fixed bottom-6 right-5 z-[80] flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setActiveDrawer("wishlist")}
          aria-label="Open wishlist"
          className="relative flex h-14 w-14 items-center justify-center rounded-full
            bg-[#222062] text-white shadow-xl transition hover:bg-[#5C47E8]"
        >
          <Heart size={23} />
          {wishlist.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center
              rounded-full bg-[#C737E4] px-1 text-xs font-bold text-white">
              {wishlist.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveDrawer("cart")}
          aria-label="Open cart"
          className="relative flex h-14 w-14 items-center justify-center rounded-full
            bg-[#5C47E8] text-white shadow-xl transition hover:bg-[#222062]"
        >
          <ShoppingCart size={23} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center
              rounded-full bg-[#C737E4] px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Drawer backdrop */}
      {activeDrawer && (
        <div
          className="fixed inset-0 z-[100] bg-black/45"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveDrawer(null);
          }}
        >
          {/* Half-page drawer */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={activeDrawer === "cart" ? "Shopping cart" : "Wishlist"}
            className="absolute right-0 top-0 flex h-full w-full max-w-[560px] flex-col
              bg-white shadow-2xl sm:w-[50vw]"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-5 sm:px-7">
              <div className="flex items-center gap-2">
                {activeDrawer === "cart" ? (
                  <ShoppingCart size={22} className="text-[#5C47E8]" />
                ) : (
                  <Heart size={22} className="text-[#5C47E8]" />
                )}

                <h2 className="text-xl font-bold text-[#222062]">
                  {activeDrawer === "cart" ? "My Cart" : "Wishlist"}
                </h2>

                <span className="text-sm text-zinc-500">
                  ({activeDrawer === "cart" ? cartCount : wishlist.length} items)
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveDrawer(null)}
                aria-label="Close drawer"
                className="rounded-full p-2 text-zinc-500 transition hover:bg-violet-50 hover:text-[#222062]"
              >
                <X size={23} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-7">
              {drawerItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-violet-50 p-5 text-[#5C47E8]">
                    {activeDrawer === "cart" ? (
                      <ShoppingCart size={32} />
                    ) : (
                      <Heart size={32} />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#222062]">
                    {activeDrawer === "cart" ? "Your cart is empty" : "Your wishlist is empty"}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {activeDrawer === "cart"
                      ? "Add something you love from the store."
                      : "Save your favorite products to find them here."}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveDrawer(null)}
                    className="mt-5 rounded-lg bg-[#5C47E8] px-5 py-3 font-semibold text-white transition hover:bg-[#222062]"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {drawerItems.map((item, index) => {
                    const product = getProduct(item);
                    const productId = getId(item);
                    const image =
                      product.image ||
                      product.images?.[0] ||
                      item.image ||
                      item.images?.[0];

                    return (
                      <div
                        key={item.cartId || `${productId}-${index}`}
                        className="flex gap-3 py-5 sm:gap-4"
                      >
                        <div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 sm:h-28 sm:w-24">
                          {image ? (
                            <img
                              src={image}
                              alt={product.name || product.title || "Product"}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <ShoppingCart className="text-zinc-400" size={25} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="line-clamp-2 font-bold text-[#222062]">
                                {product.name || product.title || "Product"}
                              </h3>
                              <p className="mt-1 font-semibold text-[#5C47E8]">
                                {money(product.price ?? item.price)}
                              </p>
                            </div>

                            {activeDrawer === "cart" && (
                              <button
                                type="button"
                                onClick={() => removeFromCart(item, index)}
                                aria-label="Remove item from cart"
                                className="rounded-md p-1.5 text-zinc-400 hover:bg-violet-50 hover:text-[#5C47E8]"
                              >
                                <Trash2 size={17} />
                              </button>
                            )}
                          </div>

                          {activeDrawer === "cart" ? (
                            <>
                              <p className="mt-1 text-xs text-zinc-500">
                                Size: {item.selectedSize || "L"} · Color: {item.selectedColor || "Gradient"}
                              </p>

                              <div className="mt-3 inline-flex items-center gap-3 rounded-lg border border-zinc-200 px-2 py-1.5">
                                <button
                                  type="button"
                                  onClick={() => changeQuantity(index, -1)}
                                  aria-label="Decrease quantity"
                                  className="text-[#222062]"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="min-w-4 text-center text-sm font-semibold">
                                  {Number(item.quantity) || 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => changeQuantity(index, 1)}
                                  aria-label="Increase quantity"
                                  className="text-[#222062]"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => moveToCart(item)}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#5C47E8] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#222062] sm:text-sm"
                              >
                                <ShoppingCart size={15} />
                                Move to Cart
                              </button>

                              <button
                                type="button"
                                onClick={() => removeFromWishlist(item)}
                                className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-[#222062] transition hover:bg-violet-100 sm:text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {drawerItems.length > 0 && (
              <div className="border-t border-zinc-200 bg-white px-5 py-5 sm:px-7">
                {activeDrawer === "cart" && (
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-bold text-zinc-800">Subtotal</span>
                    <span className="text-xl font-bold text-[#222062]">
                      {money(cartTotal)}
                    </span>
                  </div>
                )}

                <Link
                  to={fullPagePath}
                  onClick={() => setActiveDrawer(null)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r
                    from-[#222062] via-[#5C47E8] to-[#C737E4] px-5 py-3.5 font-semibold text-white
                    shadow-md transition hover:brightness-110"
                >
                  {activeDrawer === "cart" ? "Go to Cart" : "Go to Wishlist"}
                  <ArrowRight size={19} />
                </Link>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
