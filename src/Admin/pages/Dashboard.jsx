import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import Card from "../components/ui/Card";
import Badge, { statusTone } from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import PageHeader from "../components/PageHeader";
import { stats, alerts, products, events } from "../data/mock";

const quick = [
  { label: "Add New Event", icon: "CalendarPlus", to: "/admin/events/new" },
  { label: "Add Product", icon: "Package", to: "/admin/marketplace" },
  { label: "Upload Photos", icon: "ImagePlus", to: "/admin/gallery" },
  { label: "Top Athletes", icon: "Trophy", to: "/admin/athletes" },
];
const alertCls = {
  danger: "bg-danger-soft text-danger border-danger/20",
  warning: "bg-warning-soft text-warning border-warning/20",
  info: "bg-info-soft text-info border-info/20",
};
const maxRevenue = Math.max(...products.map((p) => p.revenue));

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Welcome back, Admin. Here's an overview of the platform." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = Icons[s.icon];
          return (
            <Card key={s.label} className="flex items-start gap-4">
              <span className={`grid h-11 w-11 place-items-center rounded-control ${s.tone}`}><Icon size={20} /></span>
              <div>
                <p className="text-sm text-muted">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted">{s.sub}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6">
        <h2 className="mb-4 font-semibold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {quick.map((q) => {
            const Icon = Icons[q.icon];
            return (
              <Link key={q.label} to={q.to} className="flex items-center justify-center gap-2 rounded-control bg-subtle py-4 text-sm font-semibold hover:opacity-80">
                <Icon size={16} className="text-accent" /> {q.label}
              </Link>
            );
          })}
          <button className="rounded-control border border-dashed border-accent/50 py-4 text-sm font-semibold text-accent">+ Add</button>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex justify-between">
            <h2 className="font-semibold">Recent Events</h2>
            <Link to="/admin/events" className="text-xs font-semibold text-accent">View All →</Link>
          </div>
          <ul className="divide-y divide-line">
            {events.map((e) => (
              <li key={e.id} className="flex items-center justify-between py-3">
                <div><p className="text-sm font-semibold">{e.title}</p><p className="text-xs text-muted">{e.city} · {e.date}</p></div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  {e.registered}/{e.capacity}
                  <Badge tone={statusTone[e.status]}>{e.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><Icons.AlertTriangle size={16} className="text-accent" /> Alerts</h2>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.title} className={`rounded-control border p-3 ${alertCls[a.tone]}`}>
                <p className="text-sm font-semibold">{a.title}</p><p className="text-xs">{a.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="mb-4 font-semibold">Marketplace Revenue Overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p) => (
            <div key={p.name} className="rounded-control bg-canvas p-4">
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="my-1 text-xl font-bold">${p.revenue.toLocaleString()}</p>
              <p className="mb-3 text-xs text-muted">{p.sold} sold · ${p.price} each</p>
              <ProgressBar value={p.revenue} max={maxRevenue} className="w-full" />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
