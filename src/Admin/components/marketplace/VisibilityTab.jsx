import { Store, Star, Shirt } from "lucide-react";
import Card from "../ui/Card";
import Toggle from "../ui/Toggle";
import Stars from "../ui/Stars";
import Badge from "../ui/Badge";
import ColorDot from "../ColorDot";
import { saving, savingPct } from "../../data/products";

export default function VisibilityTab({ p, set }) {
  return (
    <>
      <Card className="mb-4">
        <h3 className="font-bold">Customer-Facing Controls</h3>
        <p className="mb-4 text-sm text-muted">Control exactly what customers see about this product on the store.</p>
        <div className="space-y-3">
          <Toggle icon={<Store size={18} className="text-primary" />} label="Product Listed in Store" hint="Show this product in the marketplace listing" checked={p.visible} onChange={(v) => set({ visible: v })} />
          <Toggle icon={<Star size={18} className="fill-current text-accent" />} label="Featured on Homepage" hint="Highlight this product on the home page banner" checked={p.featured} onChange={(v) => set({ featured: v })} />
        </div>
      </Card>

      <Card className="mb-4">
        <h3 className="font-bold">Customer Preview</h3>
        <p className="mb-4 text-sm text-muted">This is approximately how the product looks to customers in the store.</p>
        <div className="flex gap-4 rounded-card border border-dashed border-line p-4">
          <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-control bg-subtle">
            {p.image ? <img src={p.image} alt="" className="h-full w-full object-cover" /> : <Shirt className="text-primary/40" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex justify-between gap-2"><p className="font-bold">{p.name || "Untitled product"}</p>{p.featured && <Badge tone="warning">★ Featured</Badge>}</div>
            <p className="text-sm text-muted">{p.brand}</p>
            <p className="text-sm">{p.shortDesc}</p>
            <p className="my-1 flex items-center gap-2"><b className="text-lg text-accent">${p.price || 0}</b>
              {!!p.compareAt && <s className="text-sm text-muted">${p.compareAt}</s>}
              {saving(p) > 0 && <Badge tone="danger">Saving ${saving(p)} ({savingPct(p)}% OFF)</Badge>}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {p.colors.map((c) => <ColorDot key={c.name} color={c} size={14} />)}
              {p.sizes.map((s) => <span key={s.size} className="rounded bg-subtle px-1.5 text-[10px]">{s.size}</span>)}
            </div>
            {!!p.reviews.length && <p className="mt-1 flex items-center gap-1 text-xs text-muted"><Stars value={p.reviews.reduce((a, r) => a + r.rating, 0) / p.reviews.length} /> ({p.reviews.length})</p>}
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 font-bold">SEO &amp; Search Tags</h3>
        <div className="flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full bg-subtle px-3 py-1 text-xs font-semibold text-primary">#{t}</span>)}</div>
        <p className="mt-3 text-xs text-muted">Edit tags in the Product Info tab.</p>
      </Card>
    </>
  );
}
