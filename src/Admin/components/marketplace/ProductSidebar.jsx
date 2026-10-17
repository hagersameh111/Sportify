import { useState } from "react";
import { X, Package } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Toggle from "../ui/Toggle";
import { Input, Select } from "../ui/Field";
import ImageUploadSlot from "../ImageUploadSlot";
import ColorDot from "../ColorDot";
import ColorPickerModal from "../ColorPickerModal";
import { presetColors, options, totalStock, totalSold, revenue } from "../../data/products";

const Title = ({ children }) => <h3 className="mb-4 text-sm font-bold">{children}</h3>;

export default function ProductSidebar({ p, set, edit }) {
  const [name, setName] = useState("");
  const [picked, setPicked] = useState(null); // custom color css from picker
  const [picker, setPicker] = useState(false);

  const addColor = (c) => !p.colors.some((x) => x.name === c.name) && set({ colors: [...p.colors, c] });
  const addCustom = () => {
    if (!name.trim() || !picked) return;
    addColor({ name: name.trim(), value: picked });
    setName(""); setPicked(null);
  };
  const setImage = (_, url) => set({ image: url });

  return (
    <div className="space-y-4">
      <Card>
        <Title>Product Images</Title>
        <ImageUploadSlot value={p.image} onChange={setImage} className="h-56 w-full" />
        <ImageUploadSlot dashed label="+ Upload Images" onChange={setImage} className="mt-3 h-12 w-full" />
      </Card>

      {edit && (
        <Card>
          <Title>Quick Stats</Title>
          <div className="grid grid-cols-2 gap-3">
            {[["Total Stock", totalStock(p), ""], ["Total Sold", totalSold(p), "text-accent"],
              ["Revenue", `$${revenue(p).toLocaleString()}`, ""], ["Reviews", p.reviews.length, ""]].map(([l, v, c]) => (
              <div key={l} className="rounded-control bg-subtle p-3">
                <p className={`text-xl font-bold ${c}`}>{v}</p><p className="text-xs text-muted">{l}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <Title>Available Colors</Title>
        {!!p.colors.length && (
          <div className="mb-3 flex flex-wrap gap-2">
            {p.colors.map((c) => (
              <span key={c.name} className="flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-xs">
                <ColorDot color={c} size={12} />{c.name}
                <button aria-label={`Remove ${c.name}`} onClick={() => set({ colors: p.colors.filter((x) => x.name !== c.name) })} className="text-muted hover:text-danger"><X size={12} /></button>
              </span>
            ))}
          </div>
        )}
        <div className="mb-3 flex flex-wrap gap-2">
          {presetColors.map((c) => (
            <button key={c.name} aria-label={`Add ${c.name}`} onClick={() => addColor(c)} className="rounded-full hover:scale-110"><ColorDot color={c} /></button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Color name" value={name} onChange={(e) => setName(e.target.value)} />
          <button aria-label="Custom color" onClick={() => setPicker(true)} className="h-10.5 w-12 shrink-0 rounded-control border border-line bg-brand-gradient" style={picked ? { background: picked } : undefined} />
          <Button size="md" onClick={addCustom} disabled={!name.trim() || !picked}>Add</Button>
        </div>
        {picker && <ColorPickerModal onClose={() => setPicker(false)} onConfirm={(v) => { setPicked(v); setPicker(false); }} />}
      </Card>

      <Card>
        <Title>Status &amp; Visibility</Title>
        <p className="mb-1.5 text-xs text-muted">Product Status</p>
        <Select options={options.status} value={p.status} onChange={(e) => set({ status: e.target.value })} />
        <div className="mt-3 space-y-3">
          <Toggle label="Visible to Customers" hint="Show in store listing" checked={p.visible} onChange={(v) => set({ visible: v })} />
          <Toggle label="Featured Product" hint="Show on featured products" checked={p.featured} onChange={(v) => set({ featured: v })} />
        </div>
      </Card>
    </div>
  );
}
