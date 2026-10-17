import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal, Search, Trash2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge, { statusTone } from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import PageHeader from "../components/PageHeader";
import EditEventModal from "../components/EditEventModal";
import { events as seed, eventStatuses } from "../data/mock";

export default function Events() {
  const [events, setEvents] = useState(seed);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);

  const rows = useMemo(
    () => events.filter((e) => (filter === "all" || e.status === filter) && `${e.title} ${e.city}`.toLowerCase().includes(q.toLowerCase())),
    [events, filter, q]
  );

  return (
    <>
      <PageHeader
        title="Events" subtitle={`${events.length} total events`}
        actions={<>
          <Link to="/admin/events/new"><Button variant="primary">+ Add Team Event</Button></Link>
          <Link to="/admin/submit-event"><Button variant="accent">+ Add Race</Button></Link>
        </>}
      />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button aria-label="Filters" className="rounded-control border border-line bg-surface p-2.5"><SlidersHorizontal size={16} /></button>
        <div className="flex min-w-64 flex-1 items-center gap-2 rounded-control border border-line bg-surface px-3 py-2.5">
          <Search size={16} className="text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title or city…" className="w-full text-sm outline-none placeholder:text-placeholder" />
        </div>
        {["all", ...eventStatuses].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-control px-4 py-2 text-xs font-medium capitalize ${filter === s ? "bg-primary text-primary-fg" : "bg-subtle text-muted hover:text-ink"}`}>{s}</button>
        ))}
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-subtle text-xs text-muted">
            <tr>{["Event", "Date & Time", "City", "Price", "Capacity", "Status", "Actions"].map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((e) => (
              <tr key={e.id}>
                <td className="px-5 py-4"><p className="font-semibold">{e.title}</p><p className="text-xs text-muted">{e.category}</p></td>
                <td className="px-5 py-4 text-muted">{e.date}<br />{e.time}</td>
                <td className="px-5 py-4">{e.city}</td>
                <td className="px-5 py-4">{e.price}</td>
                <td className="px-5 py-4"><p>{e.registered}/{e.capacity}</p><ProgressBar value={e.registered} max={e.capacity} /></td>
                <td className="px-5 py-4"><Badge tone={statusTone[e.status]}>{e.status}</Badge></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditing(e)}>Edit</Button>
                    <Button variant="danger" size="sm" aria-label="Delete" onClick={() => setEvents(events.filter((x) => x.id !== e.id))}><Trash2 size={14} /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={7} className="px-5 py-10 text-center text-muted">No events match. Clear the search or add an event.</td></tr>}
          </tbody>
        </table>
      </Card>

      {editing && (
        <EditEventModal event={editing} onClose={() => setEditing(null)}
          onSave={(u) => { setEvents(events.map((x) => (x.id === u.id ? u : x))); setEditing(null); }} />
      )}
    </>
  );
}
