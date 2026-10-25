
import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import {
  productCategories,
  productBrands,
  productSizes,
} from "../../../data/products";

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left font-bold text-[#181329]"
      >
        {title}
        {open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
      </button>

      {open && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  );
}

export default function StoreFilters({
  category,
  setCategory,
  selectedBrands,
  setSelectedBrands,
  selectedSizes,
  setSelectedSizes,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleValue = (value, selected, setter) => {
    setter(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  return (
    <aside className="w-full min-w-0 lg:w-56 lg:shrink-0">
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 font-bold text-[#181329] lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          Filters
        </span>
        {mobileOpen ? <X size={18} /> : <ChevronDown size={18} />}
      </button>

      <div
        className={`mt-3 rounded-xl border border-zinc-200 bg-white px-4 ${
          mobileOpen ? "block" : "hidden"
        } lg:mt-0 lg:block lg:border-0 lg:bg-transparent lg:px-0`}
      >
        <div className="flex items-center justify-between pt-4 lg:pt-0">
          <h2 className="text-lg font-extrabold text-[#181329]">Categories</h2>
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-[#5C47E8] hover:underline"
          >
            Clear all
          </button>
        </div>

        <FilterGroup title="Category">
          {productCategories.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 text-sm text-zinc-600"
            >
              <input
                type="radio"
                name="store-category"
                checked={category === item}
                onChange={() => setCategory(item)}
                className="accent-[#5C47E8]"
              />
              {item}
              {item === "Recently Added" && (
                <span className="rounded bg-fuchsia-100 px-1.5 py-0.5 text-[10px] font-bold text-fuchsia-700">
                  NEW
                </span>
              )}
            </label>
          ))}
        </FilterGroup>

        <FilterGroup title="Brands">
          {productBrands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-3 text-sm text-zinc-600"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  toggleValue(brand, selectedBrands, setSelectedBrands)
                }
                className="h-4 w-4 accent-[#5C47E8]"
              />
              {brand}
            </label>
          ))}
        </FilterGroup>

        <FilterGroup title="Size">
          <div className="grid grid-cols-4 gap-2">
            {productSizes.map((size) => (
              <button
                key={size}
                onClick={() =>
                  toggleValue(size, selectedSizes, setSelectedSizes)
                }
                className={`rounded-md px-1 py-2 text-xs font-semibold transition ${
                  selectedSizes.includes(size)
                    ? "bg-[#5C47E8] text-white"
                    : "bg-[#F1EFFA] text-zinc-700 hover:bg-violet-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Price">
          <div className="grid grid-cols-2 gap-3">
            <label className="min-w-0 text-xs text-zinc-500">
              Minimum
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="0"
                className="mt-1 w-full min-w-0 rounded-lg border border-zinc-200 px-2 py-2 text-sm text-zinc-800 outline-none focus:border-[#5C47E8]"
              />
            </label>

            <label className="min-w-0 text-xs text-zinc-500">
              Maximum
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="1000"
                className="mt-1 w-full min-w-0 rounded-lg border border-zinc-200 px-2 py-2 text-sm text-zinc-800 outline-none focus:border-[#5C47E8]"
              />
            </label>
          </div>
        </FilterGroup>

        <button
          onClick={() => {
            clearFilters();
            setMobileOpen(false);
          }}
          className="my-4 text-sm text-zinc-500 underline underline-offset-4 hover:text-[#5C47E8]"
        >
          Reset all filters
        </button>
      </div>
    </aside>
  );
}
