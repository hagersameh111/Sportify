import { Heart, Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({
  item,
  selected,
  onToggle,
  onQuantityChange,
  onRemove,
  onToggleWishlist,
}) {
  return (
    <article className="flex gap-3 p-4 sm:gap-5 sm:p-6">
      <input
        type="checkbox"
        checked={selected}
        onChange={onToggle}
        aria-label={`Select ${item.name}`}
        className="mt-2 h-4 w-4 shrink-0 accent-[#5C47E8]"
      />

      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:h-32 sm:w-32">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400">
            No image
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-[#222062]">{item.name}</h3>
            {item.category && (
              <p className="mt-1 text-xs text-zinc-500">{item.category}</p>
            )}
          </div>

          <p className="shrink-0 font-extrabold text-[#5C25DC]">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600">
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            Size: {item.selectedSize}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            Color: {item.selectedColor}
          </span>
        </div>

        <p className="mt-2 text-sm text-zinc-500">
          ${item.price.toFixed(2)} each
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center rounded-full border border-zinc-200">
            <button
              type="button"
              onClick={() => onQuantityChange(-1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="p-2 text-[#222062] disabled:opacity-30"
            >
              <Minus size={14} />
            </button>
            <span className="min-w-8 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(1)}
              disabled={item.quantity >= 10}
              aria-label="Increase quantity"
              className="p-2 text-[#222062] disabled:opacity-30"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onToggleWishlist}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#5C47E8] hover:text-[#C737E4]"
            >
              <Heart size={15} />
              Save
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-red-600"
            >
              <Trash2 size={15} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}