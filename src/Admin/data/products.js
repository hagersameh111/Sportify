export const NAVY = { name: "Navy Blue", value: "#1e2a5e" };
export const RED = { name: "Red", value: "#d62828" };
export const WHITE = { name: "White", value: "#ffffff" };

// Product color presets (product data, not UI theme)
export const presetColors = [
  NAVY, RED, WHITE,
  { name: "Black", value: "#111111" }, { name: "Grey", value: "#8a8f9c" },
  { name: "Light Grey", value: "#c4c7cf" }, { name: "Green", value: "#16a34a" },
  { name: "Yellow", value: "#eab308" },
];

export const options = {
  category: ["Apparel", "Accessories", "Footwear", "Equipment"],
  gender: ["Unisex", "Men", "Women", "Kids"],
  fit: ["Athletic Fit", "Regular Fit", "Slim Fit", "Relaxed Fit"],
  shippingTo: ["Abu Dhabi", "Dubai", "Sharjah", "All UAE"],
  status: ["Draft", "Active", "Out of stock", "Archived"],
};

const sz = (size, width, length, [a, b, c], sold) => ({ size, width, length, stock: { "Navy Blue": a, Red: b, White: c }, sold });
const reviews = [
  { id: 1, name: "Ahmed Al Mansouri", date: "15 Nov, 2025", rating: 5, text: "Best running jersey I have owned. Stays dry even in Abu Dhabi heat. The fit is perfect for my body type.", helpful: 12 },
  { id: 2, name: "Sara Al Kaabi", date: "22 Oct, 2025", rating: 4, text: "Great quality and very comfortable. Runs slightly large so size down if in between sizes.", helpful: 7 },
  { id: 3, name: "Khalid Ibrahim", date: "30 Sep, 2025", rating: 5, text: "Wore this at the Abu Dhabi Marathon and it was flawless. No chafing, great ventilation.", helpful: 9 },
];
const base = {
  brand: "ADRT Official", category: "Apparel", gender: "Unisex", fit: "Athletic Fit", material: "88% Polyester, 12% Elastane",
  weight: "180g", price: 89, compareAt: 110, shippingTo: "Abu Dhabi", shippingFee: 0, status: "Active", visible: true, featured: false,
  shortDesc: "Official team jersey, moisture-wicking fabric.",
  fullDesc: "Official ADRT team jersey crafted from premium moisture-wicking fabric. Engineered for performance running in hot climates.",
  tags: ["running", "jersey", "official", "team", "performance"], image: null, colors: [NAVY, RED, WHITE], reviews,
};

export const products = [
  { ...base, id: 1, name: "ADRT T-Shirt", sku: "ADRT-JRS-001", featured: true,
    sizes: [sz("XS", "18″", "27″", [40, 50, 110], 100), sz("S", "19″", "27.5″", [30, 10, 100], 60), sz("M", "20″", "28″", [25, 75, 105], 70),
            sz("L", "21″", "28.5″", [15, 55, 30], 125), sz("XL", "22″", "29″", [0, 0, 0], 70), sz("2XL", "23″", "29.5″", [0, 0, 0], 50)] },
  { ...base, id: 2, name: "ADRT Long Sleave", sku: "ADRT-LSL-002", featured: true,
    sizes: [sz("XS", "18″", "27″", [10, 10, 10], 80), sz("S", "19″", "28″", [20, 10, 10], 90), sz("M", "20″", "28.5″", [20, 15, 3], 100), sz("L", "21″", "29″", [0, 0, 0], 70)] },
  { ...base, id: 3, name: "ADRT Singlet", sku: "ADRT-SNG-003", featured: true,
    sizes: [sz("XS", "17″", "26″", [20, 10, 10], 40), sz("S", "18″", "27″", [30, 20, 10], 60), sz("M", "19″", "27.5″", [20, 10, 20], 60), sz("L", "20″", "28″", [10, 0, 0], 40)] },
  { ...base, id: 4, name: "ADRT Bag", sku: "ADRT-BAG-004", category: "Accessories", gender: "Accessories", status: "Out of stock", colors: [RED],
    sizes: [{ size: "One Size", width: "", length: "", stock: { Red: 0 }, sold: 95 }] },
];

// ---- derived values ----
export const rowStock = (s, colors) => colors.reduce((n, c) => n + (Number(s.stock[c.name]) || 0), 0);
export const totalStock = (p) => p.sizes.reduce((n, s) => n + rowStock(s, p.colors), 0);
export const totalSold = (p) => p.sizes.reduce((n, s) => n + (Number(s.sold) || 0), 0);
export const revenue = (p) => totalSold(p) * (Number(p.price) || 0);
export const saving = (p) => Math.max(0, (Number(p.compareAt) || 0) - (Number(p.price) || 0));
export const savingPct = (p) => (p.compareAt ? Math.round((saving(p) / p.compareAt) * 100) : 0);
export const emptyProduct = () => ({
  name: "", brand: "", sku: "", category: "Apparel", gender: "Unisex", fit: "Athletic Fit", material: "", weight: "",
  shortDesc: "", fullDesc: "", price: "", compareAt: "", shippingTo: "", shippingFee: "", tags: [], status: "Draft",
  visible: false, featured: false, image: null, colors: [], sizes: [], reviews: [],
});