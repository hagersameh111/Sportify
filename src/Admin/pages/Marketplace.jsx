import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Star, SlidersHorizontal, Search, Trash2, LayoutGrid, List, Shirt } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Stars from "../components/ui/Stars";
import { Input } from "../components/ui/Field";
import ColorDot from "../components/ColorDot";
import PageHeader from "../components/PageHeader";
import { products as seed, totalStock, totalSold, revenue, saving, savingPct } from "../data/products";

const statusTone = (p) => (p.status === "Active" && totalStock(p) > 0 ? "success" : p.status === "Draft" ? "neutral" : "danger");
const statusLabel = (p) => (totalStock(p) === 0 && p.status === "Active" ? "Out of stock" : p.status);
const Thumb = ({ p, className = "" }) =>
  p.image ? <img src={p.image} alt={p.name} className={`object-contain ${className}`} /> : <Shirt className="text-primary/40" size={48} />;

export default function Marketplace() {
  const [items, setItems] = useState(seed);
  const [brands, setBrands] = useState(["ADRT Official", "Adidas", "Puma", "Nike", "New Balance", "American Eagle"]);
  const [brand, setBrand] = useState(null);
  const [addingBrand, setAddingBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [view, setView] = useState("grid");
  const [q, setQ] = useState("");

  const rows = useMemo(() => items.filter((p) => (!brand || p.brand === brand) && p.name.toLowerCase().includes(q.toLowerCase())), [items, brand, q]);
  const featured = items.filter((p) => p.featured);
  const remove = (id) => setItems(items.filter((p) => p.id !== id));
  const saveBrand = () => { const b = newBrand.trim(); if (b && !brands.includes(b)) setBrands([...brands, b]); setNewBrand(""); setAddingBrand(false); };

  return (
    <>
      <PageHeader eyebrow="Store" title="Marketplace"
        subtitle={`${items.length} products · Total revenue $${items.reduce((n, p) => n + revenue(p), 0).toLocaleString()}`}
        actions={<Link to="/admin/marketplace/new"><Button variant="accent">+ Add Product</Button></Link>} />

      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold"><Star size={14} className="text-accent" /> Featured Products</h2>
      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((p) => (
          <Link key={p.id} to={`/admin/marketplace/${p.id}`} className="relative flex min-h-44 items-center justify-between gap-3 overflow-hidden rounded-card bg-dark p-5 text-dark-fg">
            <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded bg-surface text-accent"><Star size={14} className="fill-current" /></span>
            <div className="max-w-[50%]">
              <p className="font-bold">{p.name}</p><p className="text-[11px] text-dark-fg/70">{p.gender}</p>
              <p className="my-2 line-clamp-3 text-[10px] text-dark-fg/60">{p.shortDesc}</p><p className="font-bold">${p.price}</p>
            </div>
            <Thumb p={p} className="h-32 w-32" />
          </Link>
        ))}
      </div>

      <h2 className="mb-3 text-sm font-bold">Brands</h2>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {brands.map((b) => (
          <button key={b} onClick={() => setBrand(brand === b ? null : b)}
            className={`rounded-control px-4 py-2 text-sm ${brand === b ? "bg-primary text-primary-fg" : "bg-subtle text-muted hover:text-ink"}`}>{b}</button>
        ))}
        {addingBrand ? (
          <Input autoFocus className="w-44" placeholder="Brand name" value={newBrand} onChange={(e) => setNewBrand(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveBrand()} onBlur={saveBrand} />
        ) : (
          <button onClick={() => setAddingBrand(true)} className="rounded-control border border-dashed border-accent px-4 py-2 text-xs text-accent">+ Add Brand</button>
        )}
      </div>

      <div className="mb-4 flex items-center gap-3">
        <button aria-label="Filters" className="rounded-control border border-line bg-surface p-2.5"><SlidersHorizontal size={16} /></button>
        <div className="flex flex-1 items-center gap-2 rounded-control border border-line bg-surface px-3 py-2.5">
          <Search size={16} className="text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="w-full bg-transparent text-sm outline-none placeholder:text-placeholder" />
        </div>
        <div className="flex overflow-hidden rounded-control border border-line text-xs">
          {[["grid", LayoutGrid, "Grid"], ["list", List, "List"]].map(([v, Icon, l]) => (
            <button key={v} onClick={() => setView(v)} className={`flex items-center gap-1.5 px-3 py-2.5 ${view === v ? "bg-primary text-primary-fg" : "bg-surface text-muted"}`}><Icon size={13} /> {l}</button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {rows.map((p) => (
            <Card key={p.id} className="overflow-hidden p-0">
              <div className="relative grid h-36 place-items-center bg-subtle">
                {p.featured && <Badge tone="warning" className="absolute left-2 top-2">★ Featured</Badge>}
                <Badge tone={statusTone(p)} className="absolute right-2 top-2">{statusLabel(p)}</Badge>
                <Thumb p={p} className="h-28" />
              </div>
              <div className="p-5">
                <p className="font-bold">{p.name}</p><p className="text-xs text-muted">{p.gender}</p>
                <p className="my-2 flex items-center gap-1 text-xs text-muted"><Stars value={4} /> ({p.reviews.length})</p>
                <p className="flex flex-wrap items-center gap-2"><b className="text-xl text-accent">${p.price}</b>
                  {!!p.compareAt && <s className="text-xs text-muted">${p.compareAt}</s>}
                  {saving(p) > 0 && <Badge tone="danger" className="uppercase">Saving ${saving(p)} ({savingPct(p)}% off)</Badge>}</p>
                <p className="my-2 text-xs text-muted">{p.shortDesc}</p>
                <div className="mb-2 flex gap-2">{p.colors.map((c) => <ColorDot key={c.name} color={c} />)}</div>
                <div className="mb-3 flex flex-wrap gap-1.5">{p.sizes.map((s) => <span key={s.size} className="rounded bg-subtle px-2 py-0.5 text-[10px] text-muted">{s.size}</span>)}</div>
                <div className="mb-3 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-control bg-subtle p-2"><b>{totalStock(p)}</b><p className="text-[10px] text-muted">In Stock</p></div>
                  <div className="rounded-control bg-subtle p-2"><b>{totalSold(p)}</b><p className="text-[10px] text-muted">Sold</p></div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/admin/marketplace/${p.id}`} className="flex-1"><Button variant="outline" className="w-full border-primary text-primary">Edit</Button></Link>
                  <Button variant="danger" aria-label={`Delete ${p.name}`} onClick={() => remove(p.id)}><Trash2 size={14} /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-subtle text-xs text-muted"><tr>{["Product", "Category", "Stock", "Price", "Sales", "Revenue", "Status", "Actions"].map((h) => <th key={h} className="px-5 py-3 font-semibold uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-line">
              {rows.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-4 font-bold">{p.name}</td><td className="px-5 py-4">{p.gender}</td><td className="px-5 py-4">{totalStock(p)}</td>
                  <td className="px-5 py-4 text-accent">${p.price}</td><td className="px-5 py-4">{totalSold(p)}</td>
                  <td className="px-5 py-4 font-bold">${revenue(p).toLocaleString()}</td>
                  <td className="px-5 py-4"><Badge tone={statusTone(p)}>{statusLabel(p)}</Badge></td>
                  <td className="px-5 py-4"><div className="flex items-center gap-2">
                    <Link to={`/admin/marketplace/${p.id}`}><Button variant="outline" size="sm">Edit</Button></Link>
                    <Button variant="danger" size="sm" aria-label={`Delete ${p.name}`} onClick={() => remove(p.id)}><Trash2 size={14} /></Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {!rows.length && <Card className="mt-4 py-12 text-center text-muted">No products match. Clear the search or brand filter.</Card>}
    </>
  );
}
