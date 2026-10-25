
export default function DescriptionTab({ product }) {
  const description =
    product.description ||
    "Comfortable, breathable sportswear designed for running, training, and everyday wear.";

  const details = [
    ["Style", "Regular fit"],
    ["Material", product.material || "Performance sportswear"],
    ["Category", product.category || product.type || "Unisex"],
    ["Available sizes", "XS – 4XL"],
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">Product Description</h2>

      <p className="text-sm leading-7 text-zinc-600">{description}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {details.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between gap-3 rounded-lg bg-[#F5F4FA] p-4 text-sm"
          >
            <span className="text-zinc-500">{label}</span>
            <span className="font-semibold text-[#181329]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
