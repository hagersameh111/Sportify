import { MessageSquare, EyeOff, Eye, Trash2, ThumbsUp } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Stars from "../ui/Stars";

export default function ReviewsTab({ p, set }) {
  const rs = p.reviews, n = rs.length;
  const avg = n ? rs.reduce((a, r) => a + r.rating, 0) / n : 0;
  const count = (s) => rs.filter((r) => r.rating === s).length;
  const patch = (id, fn) => set({ reviews: rs.map((r) => (r.id === id ? fn(r) : r)) });

  return (
    <>
      <Card className="mb-4 grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
        <div><p className="text-5xl font-black">{avg.toFixed(1)}</p><Stars value={avg} size={16} className="my-1" /><p className="text-sm text-muted">{n} reviews</p></div>
        <ul className="space-y-1.5">
          {[5, 4, 3, 2, 1].map((s) => (
            <li key={s} className="flex items-center gap-3 text-xs text-muted">
              <span className="w-3">{s}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-subtle"><div className="h-full rounded-full bg-accent" style={{ width: `${n ? (count(s) / n) * 100 : 0}%` }} /></div>
              <span className="w-4 text-right">{count(s)}</span>
            </li>
          ))}
        </ul>
        <div className="grid gap-3 text-center text-xs">
          <div className="rounded-control bg-success-soft p-3 text-success"><p className="text-2xl font-bold">{rs.filter((r) => r.rating >= 4).length}</p>Positive (4, 5★)</div>
          <div className="rounded-control bg-danger-soft p-3 text-danger"><p className="text-2xl font-bold">{rs.filter((r) => r.rating <= 2).length}</p>Critical (1, 2★)</div>
        </div>
      </Card>

      <div className="space-y-4">
        {rs.map((r) => (
          <Card key={r.id} className={`flex gap-4 ${r.hidden ? "opacity-50" : ""}`}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-fg">
              {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 font-semibold">{r.name} <Badge tone="success">Verified Purchase</Badge></p>
              <p className="my-1 flex items-center gap-2 text-xs text-muted"><Stars value={r.rating} /> {r.date}</p>
              <p className="text-sm">{r.text}</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-muted"><ThumbsUp size={12} /> {r.helpful} found this helpful</p>
            </div>
            <div className="flex items-start gap-1">
              <Button variant="outline" size="sm"><MessageSquare size={12} /> Private Reply</Button>
              <Button variant="danger" size="sm" aria-label={r.hidden ? "Show review" : "Hide review"} onClick={() => patch(r.id, (x) => ({ ...x, hidden: !x.hidden }))}>{r.hidden ? <Eye size={14} /> : <EyeOff size={14} />}</Button>
              <Button variant="ghost" size="sm" aria-label="Delete review" onClick={() => set({ reviews: rs.filter((x) => x.id !== r.id) })}><Trash2 size={14} /></Button>
            </div>
          </Card>
        ))}
        {!n && <Card className="py-10 text-center text-muted">No reviews yet.</Card>}
      </div>
    </>
  );
}
