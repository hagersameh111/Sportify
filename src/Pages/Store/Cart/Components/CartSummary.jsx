import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CartSummary({
  items = [],
  itemCount = 0,
  subtotal = 0,
  shipping = 0,
  total = 0,
  hasSelection = false,
}) {
  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h2 className="text-xl font-extrabold text-[#222062]">Order Summary</h2>

      <div className="mt-5 flex items-center justify-between text-sm text-zinc-600">
        <span>Selected items</span>
        <span className="font-semibold text-zinc-900">{itemCount}</span>
      </div>

      {items.length > 0 && (
        <div className="mt-4 flex gap-2">
          {items.slice(0, 4).map((item, index) => (
            <div
              key={item.cartId ?? `${item.id}-${index}`}
              className="h-12 w-12 overflow-hidden rounded-lg bg-zinc-100"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
          {items.length > 4 && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-50 text-sm font-bold text-[#5C25DC]">
              +{items.length - 4}
            </div>
          )}
        </div>
      )}

      <div className="my-5 space-y-3 border-y border-zinc-100 py-5 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-zinc-500">Subtotal</span>
          <span className="font-semibold text-zinc-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-zinc-500">Shipping</span>
          <span className="font-semibold text-zinc-900">
            {shipping === 0 ? "—" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="font-bold text-[#222062]">Total</span>
        <span className="text-2xl font-extrabold text-[#C737E4]">
          ${total.toFixed(2)}
        </span>
      </div>

      <Link
        to="/checkout"
        aria-disabled={!hasSelection}
        onClick={(event) => {
          if (!hasSelection) event.preventDefault();
          else localStorage.setItem("sportify_checkout_items", JSON.stringify(items));
        }}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition ${
          hasSelection
            ? "bg-gradient-to-r from-[#5C47E8] to-[#5C25DC] hover:opacity-90"
            : "cursor-not-allowed bg-zinc-300"
        }`}
      >
        Proceed to Checkout
        <ArrowRight size={17} />
      </Link>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
        <ShieldCheck size={16} className="text-[#222062]" />
        Secure checkout
      </div>

      <p className="mt-3 text-center text-xs text-zinc-400">
        Shipping is calculated at a flat rate of $10 per order.
      </p>
    </aside>
  );
}