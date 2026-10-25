
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Grid2X2, Shirt, Footprints, Watch } from "lucide-react";
import { products } from "../../data/products";

import FeaturedProducts from "./Components/FeaturedProducts";
import StoreFilters from "./Components/StoreFilters";
import ProductGrid from "./Components/ProductGrid";
import StorePagination from "./Components/StorePagination";
import SponsorsSection from "./Components/SponsorsSection";

const PRODUCTS_PER_PAGE = 9;

export default function StorePage() {
  const [category, setCategory] = useState("All");
  const [productType, setProductType] = useState("All Products");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const clearFilters = () => {
    setCategory("All");
    setProductType("All Products");
    setSelectedBrands([]);
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    setSortBy("popular");
    setCurrentPage(1);
  };

  const toggleWishlist = (productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Top-level product type filter (Clothing / Shoes / Accessories).
    if (productType !== "All Products") {
      result = result.filter((product) => {
        const type = product.productType || product.type || "Clothing";
        return type.toLowerCase() === productType.toLowerCase();
      });
    }

    if (category === "Featured Items") {
      result = result.filter((product) => product.featured);
    } else if (category === "Recently Added") {
      result = result.filter((product) => product.id >= 7);
    } else if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    if (selectedBrands.length) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedSizes.length) {
      result = result.filter((product) =>
        selectedSizes.some((size) => (product.sizes || []).includes(size))
      );
    }

    if (minPrice !== "") {
      result = result.filter((product) => product.price >= Number(minPrice));
    }

    if (maxPrice !== "") {
      result = result.filter((product) => product.price <= Number(maxPrice));
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          (product.name || "").toLowerCase().includes(query) ||
          (product.category || "").toLowerCase().includes(query) ||
          (product.brand || "").toLowerCase().includes(query)
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [
    category,
    productType,
    selectedBrands,
    selectedSizes,
    minPrice,
    maxPrice,
    search,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

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
        {/* Featured carousel */}
        <FeaturedProducts
          products={products}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />

        {/* Product catalog */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {/* Catalog heading */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#5C47E8]">
                Explore the collection
              </p>
              <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                Shop Products
              </h2>
            </div>

            <button
              onClick={() => setShowMobileFilters((current) => !current)}
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-semibold lg:hidden"
            >
              <SlidersHorizontal size={17} />
              {showMobileFilters ? "Hide filters" : "Filters"}
            </button>
          </div>

          {/* Quick product-type filters */}
          <div className="mb-7 rounded-2xl border border-zinc-100  p-3 sm:p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-3 px-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
              What are you looking for?
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
              {[
                { label: "All Products", Icon: Grid2X2 },
                { label: "Clothing", Icon: Shirt },
                { label: "Shoes", Icon: Footprints },
                { label: "Accessories", Icon: Watch },
              ].map(({ label, Icon }) => {
                const isActive = productType === label;
                const count = label === "All Products"
                  ? products.length
                  : products.filter((product) => (product.productType || product.type || "Clothing").toLowerCase() === label.toLowerCase()).length;

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setProductType(label);
                      setCurrentPage(1);
                    }}
                    aria-pressed={isActive}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition duration-200 sm:min-w-36 ${
                      isActive
                        ? "border-[#222062] bg-[#222062] text-white shadow-md shadow-[#222062]/15"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-[#5C47E8] hover:bg-violet-50 hover:text-[#222062]"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-white" : "text-[#5C47E8]"} />
                    <span>{label}</span>
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${isActive ? "bg-white/15 text-white" : "bg-zinc-100 text-zinc-500"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
            {/* Filters */}
            <div className={showMobileFilters ? "block" : "hidden lg:block"}>
              <StoreFilters
                category={category}
                setCategory={(value) => updateFilter(setCategory, value)}
                selectedBrands={selectedBrands}
                setSelectedBrands={(value) =>
                  updateFilter(setSelectedBrands, value)
                }
                selectedSizes={selectedSizes}
                setSelectedSizes={(value) =>
                  updateFilter(setSelectedSizes, value)
                }
                minPrice={minPrice}
                setMinPrice={(value) => updateFilter(setMinPrice, value)}
                maxPrice={maxPrice}
                setMaxPrice={(value) => updateFilter(setMaxPrice, value)}
                clearFilters={clearFilters}
              />
            </div>

            {/* Search, sort and products */}
            <div className="min-w-0">
              <div className="mb-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <p className="text-sm text-zinc-500">
                  Showing{" "}
                  <span className="font-bold text-[#181329]">
                    {filteredProducts.length
                      ? (safePage - 1) * PRODUCTS_PER_PAGE + 1
                      : 0}
                    –
                    {Math.min(
                      safePage * PRODUCTS_PER_PAGE,
                      filteredProducts.length
                    )}
                  </span>{" "}
                  of {filteredProducts.length} products
                </p>

                <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
                  <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 focus-within:border-[#5C47E8] xl:max-w-sm">
                    <Search size={18} className="shrink-0 text-[#5C47E8]" />
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
                    <option value="price-low">Price: Low to high</option>
                    <option value="price-high">Price: High to low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>

             <ProductGrid
  products={visibleProducts}
  onAddToCart={addToCart}
  onToggleWishlist={toggleWishlist}
  wishlist={wishlist}
/>

              <StorePagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </section>

        <SponsorsSection />
      </main>

   

     
    </div>
  );
}
