
const sizes = [
  ["XS", "18", "27"],
  ["S", "19", "27.5"],
  ["M", "20", "28"],
  ["L", "21", "28.5"],
  ["XL", "22", "29"],
  ["2XL", "23", "29.5"],
  ["3XL", "24", "30"],
  ["4XL", "25", "30.5"],
];

export default function SizeGuideTab({ selectedSize }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Size Guide</h2>
        <span className="text-xs text-zinc-500">
          Measurements in inches
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[360px] border-separate border-spacing-y-1 text-center text-sm">
          <thead>
            <tr className="bg-[#222062] text-white">
              {["Size", "Width", "Length"].map((heading) => (
                <th key={heading} className="px-4 py-3 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sizes.map(([size, width, length]) => (
              <tr
                key={size}
                className={
                  selectedSize === size
                    ? "bg-violet-100 text-[#5C47E8]"
                    : "bg-[#F1EFFA] text-zinc-600"
                }
              >
                <td className="px-4 py-2.5 font-bold">{size}</td>
                <td className="px-4 py-2.5">{width}"</td>
                <td className="px-4 py-2.5">{length}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-center text-xs text-zinc-500">
        Unisex sizing. If you're between sizes, consider your preferred fit.
      </p>
    </div>
  );
}
