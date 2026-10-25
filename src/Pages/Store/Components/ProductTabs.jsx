
import DescriptionTab from "./ProductTabs/DescriptionTab";
import SizeGuideTab from "./ProductTabs/SizeGuideTab";
import ShippingTab from "./ProductTabs/ShippingTab";
import ReviewsTab from "./ProductTabs/ReviewsTab";

const tabs = ["Description", "Size Guide", "Shipping", "Reviews"];

export default function ProductTabs({
  product,
  activeTab,
  setActiveTab,
  selectedSize,
}) {
  const renderTab = () => {
    switch (activeTab) {
      case "Description":
        return <DescriptionTab product={product} />;

      case "Size Guide":
        return <SizeGuideTab selectedSize={selectedSize} />;

      case "Shipping":
        return <ShippingTab />;

      case "Reviews":
        return <ReviewsTab />;

      default:
        return <DescriptionTab product={product} />;
    }
  };

  return (
    <section>
      <div className="flex gap-5 overflow-x-auto border-b border-zinc-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            aria-selected={activeTab === tab}
            role="tab"
            className={`shrink-0 border-b-2 px-0.5 py-4 text-sm font-semibold transition ${
              activeTab === tab
                ? "border-[#5C47E8] text-[#5C47E8]"
                : "border-transparent text-zinc-400 hover:text-[#5C47E8]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-64 py-6" role="tabpanel">
        {renderTab()}
      </div>
    </section>
  );
}
