import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Route, Users } from 'lucide-react';

function parseDate(event) {
  const raw = event.eventDate || event.date;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return { raw };
  const hasYear = /\b\d{4}\b/.test(raw);
  return {
    raw,
    day: d.getDate(),
    month: d.toLocaleString('en', { month: 'short' }),
    full: d.toLocaleDateString('en', { weekday: 'short', day: 'numeric', month: 'short', ...(hasYear && { year: 'numeric' }) }),
  };
}

// First distance is shown; hover (or tap) reveals the rest.
function Distances({ races }) {
  const [open, setOpen] = useState(false);
  const list = (races || []).map((r) => r.distance).filter(Boolean);
  if (!list.length) return null;
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-2 py-1 text-xs font-bold text-violet-700 focus-visible:ring-2 focus-visible:ring-violet-300"
      >
        <Route size={13} />
        {list[0]}
        {list.length > 1 && <span className="text-violet-400">+{list.length - 1}</span>}
      </button>
      {open && list.length > 1 && (
        <ul className="absolute bottom-full left-0 z-20 mb-1.5 min-w-28 rounded-lg border border-zinc-200 bg-white p-1.5 shadow-lg">
          {list.map((d) => (
            <li key={d} className="rounded px-2 py-1 text-xs font-semibold text-zinc-700">{d}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function EventCard({ event }) {
  const date = parseDate(event);
  const isRunning = event.category === 'RUNNING' && event.races?.length > 0;
  const category = event.category.charAt(0) + event.category.slice(1).toLowerCase();

  return (
    <article className="flex flex-col rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/events/${event.id}`} className="relative block h-32 overflow-hidden rounded-t-xl" tabIndex={-1} aria-hidden="true">
        <img src={event.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {date.day ? (
          <div className="absolute left-3 top-3 w-12 overflow-hidden rounded-lg bg-white text-center shadow">
            <p className="bg-violet-700 py-0.5 text-[10px] font-bold uppercase leading-4 text-white">{date.month}</p>
            <p className="py-0.5 text-xl font-black leading-6 text-zinc-900">{date.day}</p>
          </div>
        ) : (
          <span className="absolute left-3 top-3 rounded-md bg-white px-2 py-1 text-xs font-bold text-zinc-900">{date.raw}</span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-zinc-950 px-2.5 py-1 text-xs font-bold text-white">
          {event.price ? `$${event.price}` : 'Free'}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h3 className="line-clamp-1 text-base font-bold leading-snug text-zinc-900">
          <Link to={`/events/${event.id}`} className="hover:text-violet-700 focus-visible:underline">{event.title}</Link>
        </h3>
        <p className="flex items-center gap-1.5 text-xs text-zinc-500">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">{event.city || event.location}</span>
          <span aria-hidden="true">&middot;</span>
          <span className="shrink-0 font-semibold text-zinc-700">{date.full || date.raw}</span>
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          {isRunning ? (
            <Distances races={event.races} />
          ) : (
            <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-600">{category}</span>
          )}
          <span className="flex items-center gap-1 text-xs text-zinc-500"><Users size={13} />{event.stat}</span>
        </div>
      </div>
    </article>
  );
}
