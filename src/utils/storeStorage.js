
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, SlidersHorizontal } from "lucide-react";

import { products } from "../../data/products";

import FeaturedProducts from "./Components/FeaturedProducts";
import StoreFilters from "./Components/StoreFilters";
import ProductGrid from "./Components/ProductGrid";
import StorePagination from "./Components/StorePagination";
import SponsorsSection from "./Components/SponsorsSection";

import {
  readCart,
  readWishlist,
  addProductToCart,
  toggleWishlistProduct,
  subscribeToStoreUpdates,
} from "../../utils/storeStorage";

const PRODUCTS_PER_PAGE = 9;

export default function StorePage() {
  const [category, setCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  // Shared cart and wishlist state
  const [wishlist, setWishlist] = useState(() => readWishlist());
  const [cart, setCart] = useState(() => readCart());

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Keep counters and product states synchronized across pages.
  useEffect(() => {
    const syncStore = () => {
      setWishlist(readWishlist());
      setCart(readCart());
    };

    return subscribeToStoreUpdates(syncStore);
  }, []);

  const normalizedWishlist = wishlist.map((item) =>
    typeof item === "object" && item !== null ? item.id : item
  );

  const cartCount = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  const clearFilters = () => {
    setCategory("All");
    setSelectedBrands([]);
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    setSortBy("popular");
    setCurrentPage(1);
  };

  // Accept either a product object or a product ID.
  const toggleWishlist = (productOrId) => {
    const product =
      typeof productOrId === "object" && productOrId !== null
        ? productOrId
        : products.find(
            (item) => String(item.id) === String(productOrId)
          );

    if (!product) return;

    setWishlist(toggleWishlistProduct(product));
  };

  // Supports both simple product cards and product-detail variants.
  const addToCart = (product, options = {}) => {
    if (!product) return;

    setCart(addProductToCart(product, options));
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category === "Featured Items") {
      result = result.filter((product) => product.featured);
    } else if (category === "Recently Added") {
      result = result.filter((product) => Number(product.id) >= 7);
    } else if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (selectedBrands.length) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedSizes.length) {
      result = result.filter((product) =>
        (product.sizes || []).some((size) =>
          selectedSizes.includes(size)
        )
      );
    }

    if (minPrice !== "") {
      result = result.filter(
        (product) => Number(product.price) >= Number(minPrice)
      );
    }

    if (maxPrice !== "") {
      result = result.filter(
        (product) => Number(product.price) <= Number(maxPrice)
      );
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((product) =>
        [product.name, product.category, product.brand]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "newest") {
      result.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return result;
  }, [
    category,
    selectedBrands,
    selectedSizes,
    minPrice,
    maxPrice,
    search,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const visibleProducts = filteredProducts.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  const updateFilter = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#181329]">
      <main className="flex-1">
        {/* Featured products */}
        <FeaturedProducts
          products={products}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          wishlist={normalizedWishlist}
        />

        {/* Product catalog */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#5C47E8]">
                Explore the collection
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-[#222062] sm:text-3xl">
                Shop Products
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowMobileFilters((current) => !current)
              }
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-semibold transition hover:border-[#5C47E8] lg:hidden"
            >
              <SlidersHorizontal size={17} />
              {showMobileFilters ? "Hide filters" : "Filters"}
            </button>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
            {/* Filters */}
            <div
              className={
                showMobileFilters ? "block" : "hidden lg:block"
              }
            >
              <StoreFilters
                category={category}
                setCategory={(value) =>
                  updateFilter(setCategory, value)
                }
                selectedBrands={selectedBrands}
                setSelectedBrands={(value) =>
                  updateFilter(setSelectedBrands, value)
                }
                selectedSizes={selectedSizes}
                setSelectedSizes={(value) =>
                  updateFilter(setSelectedSizes, value)
                }
                minPrice={minPrice}
                setMinPrice={(value) =>
                  updateFilter(setMinPrice, value)
                }
                maxPrice={maxPrice}
                setMaxPrice={(value) =>
                  updateFilter(setMaxPrice, value)
                }
                clearFilters={clearFilters}
              />
            </div>

            {/* Search, sorting, and products */}
            <div className="min-w-0">
              <div className="mb-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <p className="text-sm text-zinc-500">
                  Showing{" "}
                  <span className="font-bold text-[#222062]">
                    {filteredProducts.length
                      ? (safePage - 1) * PRODUCTS_PER_PAGE + 1
                      : 0}
                    {"–"}
                    {Math.min(
                      safePage * PRODUCTS_PER_PAGE,
                      filteredProducts.length
                    )}
                  </span>{" "}
                  of {filteredProducts.length} products
                </p>

                <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
                  <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 focus-within:border-[#5C47E8] xl:max-w-sm">
                    <Search
                      size={18}
                      className="shrink-0 text-[#5C47E8]"
                    />

                    <input
                      type="search"
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search products..."
                      className="min-w-0 flex-1 py-3 text-sm outline-none"
                    />
                  </label>

                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="rounded-lg border border-zinc-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#5C47E8]"
                    aria-label="Sort products"
                  >
                    <option value="popular">Sort: Popularity</option>
                    <option value="newest">Recently added</option>
                    <option value="price-low">
                      Price: Low to high
                    </option>
                    <option value="price-high">
                      Price: High to low
                    </option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>

              <ProductGrid
                products={visibleProducts}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlist={normalizedWishlist}
              />

              {totalPages > 1 && (
                <StorePagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        </section>

        <SponsorsSection />
      </main>

      {/* Floating wishlist and cart navigation */}
      <div className="fixed right-0 top-1/3 z-40 flex flex-col gap-2">
        <Link
          to="/wishlist"
          aria-label="View wishlist"
          className="rounded-l-xl bg-[#222062] p-3 text-white shadow-lg transition hover:bg-[#5C47E8]"
        >
          <span className="relative block text-xl leading-5">
            ♥
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C737E4] px-1 text-[10px]">
              {wishlist.length}
            </span>
          </span>
        </Link>

        <Link
          to="/cart"
          aria-label="View cart"
          className="rounded-l-xl bg-[#222062] p-3 text-white shadow-lg transition hover:bg-[#5C47E8]"
        >
          <span className="relative block">
            <ShoppingCart size={20} />
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C737E4] px-1 text-[10px]">
              {cartCount}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
