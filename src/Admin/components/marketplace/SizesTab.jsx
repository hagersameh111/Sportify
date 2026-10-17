import { useState } from "react";
import { X, Package, ShoppingBag, CircleDollarSign, BarChart3 } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { Input } from "../ui/Field";
import ColorDot from "../ColorDot";
import { rowStock, totalStock, totalSold, revenue } from "../../data/products";

const QUICK = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const cell = "w-full rounded-control border px-2 py-1.5 text-center text-sm focus:border-primary focus:outline-none";

export default function SizesTab({ p, set, edit }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const { colors, sizes } = p;
  const total = totalStock(p);

  const addSize = (raw, q = 0) => {
    const size = raw.trim().toUpperCase();
    if (!size || sizes.some((s) => s.size === size)) return;
    const n = Math.max(colors.length, 1), per = Math.floor(q / n);
    const stock = {};
    colors.forEach((c, i) => (stock[c.name] = per + (i === 0 ? q - per * n : 0)));
    set({ sizes: [...sizes, { size, width: "", length: "", stock, sold: 0 }] });
  };
  const patch = (i, fn) => set({ sizes: sizes.map((s, j) => (j === i ? fn(s) : s)) });

  return (
    <>
      {edit && (
        <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[[Package, total, "Total in Stock", "across all sizes", "text-success"],
            [ShoppingBag, totalSold(p), "Total Sold", "all time", ""],
            [CircleDollarSign, `$${revenue(p).toLocaleString()}`, "Total Revenue", "from this product", ""],
            [BarChart3, Math.round(total / Math.max(sizes.length, 1)), "Avg. per Size", "units in stock", ""]].map(([Icon, v, l, s, c]) => (
            <div key={l} className="rounded-card bg-subtle p-4">
              <Icon size={18} className="mb-2 text-primary" />
              <p className={`text-2xl font-bold ${c}`}>{v}</p><p className="text-sm">{l}</p><p className="text-[11px] text-muted">{s}</p>
            </div>
          ))}
        </div>
      )}

      <Card className="mb-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <h3 className="font-bold">Size &amp; Stock Table</h3>
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
            Quick add:
            {QUICK.map((s) => (
              <button key={s} disabled={sizes.some((x) => x.size === s)} onClick={() => addSize(s)}
                className="rounded border border-line px-2 py-1 text-[11px] hover:bg-subtle disabled:bg-subtle disabled:opacity-50">{s}</button>
            ))}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold">Quantity per size:</p>
          <label className="flex items-center gap-2 text-sm font-semibold">Total :
            <Input readOnly value={total || ""} placeholder="0" className="w-28 text-right" /></label>
        </div>
        {!!sizes.length && (
          <div className="mb-4 flex flex-wrap gap-2">
            {sizes.map((s) => (
              <span key={s.size} className="flex items-center gap-3 rounded-control border border-line px-3 py-1.5 text-sm">
                <b className="rounded bg-subtle px-1.5 text-primary">{s.size}</b>{rowStock(s, colors)}
              </span>
            ))}
          </div>
        )}

        {!!sizes.length && (
          <div className="mb-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-center text-sm">
              <thead>
                <tr className="text-xs text-muted">
                  <th className="p-2 text-left font-semibold uppercase">Size</th>
                  <th className="p-2 font-semibold uppercase">Width</th><th className="p-2 font-semibold uppercase">Length</th>
                  {colors.map((c) => <th key={c.name} className="p-2 font-semibold text-ink"><span className="inline-flex items-center gap-1.5"><ColorDot color={c} size={10} />{c.name}</span></th>)}
                  <th colSpan={2} className="bg-success-soft p-2 font-semibold uppercase text-success">Row Total</th><th />
                </tr>
                <tr className="bg-subtle text-[10px] font-bold uppercase text-muted">
                  <th /><th className="p-1">Inch</th><th className="p-1">Inch</th>
                  {colors.map((c) => <th key={c.name} className="p-1 text-success">Stock</th>)}
                  <th className="p-1 text-success">Stock</th><th className="p-1 text-accent">Sold</th><th />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sizes.map((s, i) => (
                  <tr key={s.size}>
                    <td className="p-2 text-left font-bold">{s.size}</td>
                    {["width", "length"].map((k) => (
                      <td key={k} className="p-2"><input aria-label={`${s.size} ${k}`} className={`${cell} border-line`} value={s[k]} onChange={(e) => patch(i, (r) => ({ ...r, [k]: e.target.value }))} /></td>
                    ))}
                    {colors.map((c) => {
                      const v = s.stock[c.name] ?? 0;
                      return (
                        <td key={c.name} className="p-2">
                          <input type="number" min={0} aria-label={`${s.size} ${c.name} stock`} value={v}
                            onChange={(e) => patch(i, (r) => ({ ...r, stock: { ...r.stock, [c.name]: Math.max(0, Number(e.target.value)) } }))}
                            className={`${cell} ${edit && Number(v) === 0 ? "border-danger/40 bg-danger-soft text-danger" : "border-line"}`} />
                        </td>
                      );
                    })}
                    <td className={`p-2 text-lg font-bold ${rowStock(s, colors) ? "text-success" : "text-danger"}`}>{rowStock(s, colors)}</td>
                    <td className="p-2 font-semibold text-muted">{s.sold}</td>
                    <td className="p-2"><button aria-label={`Remove ${s.size}`} onClick={() => set({ sizes: sizes.filter((_, j) => j !== i) })} className="text-muted hover:text-danger"><X size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-wrap gap-3 border-t border-line pt-4">
          <Input className="min-w-40 flex-1" placeholder="Size name (e.g. XXXL)" value={name} onChange={(e) => setName(e.target.value)} />
          <Input className="min-w-40 flex-1" type="number" min={0} placeholder="Quantity (e.g. 120)" value={qty} onChange={(e) => setQty(e.target.value)} />
          <Button onClick={() => { addSize(name, Number(qty) || 0); setName(""); setQty(""); }}>+ Add Size</Button>
        </div>
        {!colors.length && <p className="mt-2 text-[11px] text-muted">Tip: add colors in the sidebar to track stock per color.</p>}
      </Card>

      {edit && !!sizes.length && (
        <Card>
          <h3 className="mb-4 font-bold">Stock Health</h3>
          <ul className="space-y-3">
            {sizes.map((s) => {
              const left = rowStock(s, colors), pct = (s.sold / Math.max(s.sold + left, 1)) * 100;
              const tone = left === 0 ? ["danger", "None"] : left < 5 ? ["warning", "Low"] : ["success", "OK"];
              return (
                <li key={s.size} className="flex items-center gap-4 text-xs">
                  <b className="w-12">{s.size}</b>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-subtle"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
                  <span className="w-28 text-right text-muted">{s.sold} sold · {left} left</span>
                  <Badge tone={tone[0]} className="w-12 text-center">{tone[1]}</Badge>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </>
  );
}
