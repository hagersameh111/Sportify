export const events = [
  { id: 1, title: "Abu Dhabi Runners Marathon 2026", category: "Marathon", date: "2026-06-01", time: "08:00", city: "Abu Dhabi", venue: "Corniche Road", price: "$100-200", registered: 375, capacity: 500, status: "upcoming" },
  { id: 2, title: "Dubai Creek 10K Run", category: "10K", date: "2026-07-15", time: "07:00", city: "Dubai", venue: "Dubai Creek", price: "$50-80", registered: 210, capacity: 300, status: "upcoming" },
  { id: 3, title: "Sharjah Half Marathon", category: "Half Marathon", date: "2025-11-22", time: "06:30", city: "Sharjah", venue: "Al Majaz", price: "$75-120", registered: 480, capacity: 500, status: "completed" },
];
export const stats = [
  { label: "Total Events", value: 3, sub: "2 upcoming", icon: "CalendarDays", tone: "bg-subtle text-primary" },
  { label: "Total Members", value: 5, sub: "3 active", icon: "Users", tone: "bg-danger-soft text-danger" },
  { label: "Products", value: 4, sub: "1 out of stock", icon: "ShoppingBag", tone: "bg-warning-soft text-warning" },
  { label: "Training Capacity", value: 90, sub: "4 weekly sessions", icon: "BarChart3", tone: "bg-success-soft text-success" },
];
export const alerts = [
  { tone: "danger", title: "Out of Stock", text: "ADRT Water Bottle 750ml" },
  { tone: "warning", title: "Low Stock", text: "ADRT Cap — 12 left" },
  { tone: "info", title: "Pending Member", text: "Nour Farouk" },
];
export const products = [
  { name: "ADRT Running Jersey", revenue: 10680, sold: 120, price: 89 },
  { name: "ADRT Water Bottle 750ml", revenue: 7000, sold: 200, price: 35 },
  { name: "Compression Running Socks", revenue: 9520, sold: 340, price: 28 },
  { name: "ADRT Cap", revenue: 4275, sold: 95, price: 45 },
];
export const eventStatuses = ["upcoming", "ongoing", "completed", "cancelled"];
export const categories = ["Marathon", "Half Marathon", "10K", "5K", "Trail", "Fun Run"];