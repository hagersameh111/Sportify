import { useState } from "react";
import { X } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { Field, Input, Select, Textarea } from "../ui/Field";
import { options, saving, savingPct } from "../../data/products";

const Section = ({ title, children }) => (
  <Card className="mb-4"><h3 className="mb-4 font-bold">{title}</h3>{children}</Card>
);

export default function ProductInfoTab({ p, set }) {
  const [tag, setTag] = useState("");
  const bind = (k) => ({ value: p[k] ?? "", onChange: (e) => set({ [k]: e.target.value }) });
  const addTag = () => {
    const t = tag.trim().replace(/^#/, "");
    if (t && !p.tags.includes(t)) set({ tags: [...p.tags, t] });
    setTag("");
  };

  return (
    <>
      <Section title="Basic Information">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Product Name" required className="md:col-span-2"><Input placeholder="e.g. ADRT T-Shirt Running Jersey" {...bind("name")} /></Field>
          <Field label="Brand"><Input placeholder="e.g. ADRT Official" {...bind("brand")} /></Field>
          <Field label="SKU"><Input placeholder="e.g. ADRT-JRS-001" {...bind("sku")} /></Field>
          <Field label="Category" required><Select options={options.category} {...bind("category")} /></Field>
          <Field label="Gender"><Select options={options.gender} {...bind("gender")} /></Field>
          <Field label="Fit"><Select options={options.fit} {...bind("fit")} /></Field>
          <Field label="Material / Composition"><Input placeholder="e.g. 88% Polyester, 12% Elastane" {...bind("material")} /></Field>
          <Field label="Weight"><Input placeholder="e.g. 180g" {...bind("weight")} /></Field>
        </div>
      </Section>

      <Section title="Description">
        <div className="space-y-4">
          <Field label="Short Description (shown in card)"><Textarea rows={2} {...bind("shortDesc")} /></Field>
          <Field label="Full Description"><Textarea rows={5} {...bind("fullDesc")} /></Field>
        </div>
      </Section>

      <Section title="Pricing">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Selling Price (USD)" required>
            <Input type="number" min={0} placeholder="0" {...bind("price")} />
            <span className="mt-1 block text-[11px] text-success">Saving: ${saving(p)}{savingPct(p) ? ` (${savingPct(p)}% off)` : ""}</span>
          </Field>
          <Field label="Compare-at Price (original)" hint="Leave blank if no discount"><Input type="number" min={0} placeholder="0" {...bind("compareAt")} /></Field>
        </div>
      </Section>

      <Section title="Shipping">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Shipping to" required><Select placeholder="Select" options={options.shippingTo} {...bind("shippingTo")} /></Field>
          <Field label="Shipping Fee (USD)" required><Input type="number" min={0} placeholder="00.00" {...bind("shippingFee")} /></Field>
        </div>
      </Section>

      <Section title="Tags">
        {!!p.tags.length && (
          <div className="mb-3 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="flex items-center gap-1.5 rounded-full bg-subtle px-3 py-1 text-xs font-semibold text-primary">
                #{t}<button aria-label={`Remove ${t}`} onClick={() => set({ tags: p.tags.filter((x) => x !== t) })}><X size={12} /></button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input placeholder="Add tag …" value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
          <Button onClick={addTag}>Add</Button>
        </div>
      </Section>
    </>
  );
}
