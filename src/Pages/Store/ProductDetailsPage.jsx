import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { products } from "../../data/products";

import ProductBreadcrumb from "./Components/ProductBreadcrumb";
import ProductGallery from "./Components/ProductGallery";
import ProductInfo from "./Components/ProductInfo";
import ProductPurchaseBenefits from "./Components/ProductPurchaseBenefits";
import ProductTabs from "./Components/ProductTabs";
import ReviewSummary from "./Components/ReviewSummary";
import RelatedProducts from "./Components/RelatedProducts";

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

export default function ProductDetailsPage() {
  const { id } = useParams();

  const product =
    products.find((item) => String(item.id) === String(id)) || products[0];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Size Guide");

  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY));

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = wishlist.some(
    (item) =>
      String(typeof item === "object" && item !== null ? item.id : item) ===
      String(product.id)
  );

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const handleViewReviews = () => {
    setActiveTab("Reviews");
  };

  const handleAddToCart = (selectedProduct, options = {}) => {
    const size = options.selectedSize ?? selectedSize;
    const color = options.selectedColor ?? selectedColor;
    const amount = Math.max(1, Number(options.quantity ?? quantity) || 1);

    const cart = readStorage(CART_KEY);

    const existing = cart.find(
      (item) =>
        String(item.id) === String(selectedProduct.id) &&
        String(item.selectedSize ?? "L") === String(size) &&
        String(item.selectedColor ?? "0") === String(color)
    );

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item === existing
          ? {
              ...item,
              quantity: Math.min(
                10,
                (Number(item.quantity) || 1) + amount
              ),
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...selectedProduct,
          selectedSize: size,
          selectedColor: color,
          quantity: Math.min(10, amount),
          cartId: `${selectedProduct.id}-${size}-${color}-${Date.now()}`,
        },
      ];
    }

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("sportify-cart-updated"));
  };

  const handleToggleWishlist = (selectedProduct) => {
    const productId = selectedProduct.id;

    setWishlist((current) => {
      const exists = current.some(
        (item) =>
          String(typeof item === "object" && item !== null ? item.id : item) ===
          String(productId)
      );

      return exists
        ? current.filter(
            (item) =>
              String(
                typeof item === "object" && item !== null ? item.id : item
              ) !== String(productId)
          )
        : [...current, productId];
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#181329]">
      <ProductBreadcrumb />

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid items-start gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <ProductGallery
            product={product}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />

          <div>
            <ProductInfo
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              quantity={quantity}
              setQuantity={setQuantity}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isWishlisted}
              onViewReviews={handleViewReviews}
            />

            <ProductPurchaseBenefits />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
          <div className="min-w-0">
            <ProductTabs
              product={product}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedSize={selectedSize}
            />

            <RelatedProducts
              products={relatedProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist.map((item) =>
                typeof item === "object" && item !== null ? item.id : item
              )}
            />
          </div>

          <ReviewSummary onViewAll={handleViewReviews} />
        </div>
      </section>
    </div>
  );
}