import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import EventCard from "../../components/EventCard";
import EventFilters, { useEventFilters } from "../../components/EventFilters";
import { upcomingEvents } from "../../data/events";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const categories = [
  { value: "ALL", label: "All" },
  { value: "RUNNING", label: "Running" },
  { value: "PADEL", label: "Padel" },
  { value: "CYCLING", label: "Cycling" },
];

export default function EventsPage() {
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const filters = useEventFilters(upcomingEvents);

  const events = useMemo(() => {
    const q = search.trim().toLowerCase();
    return upcomingEvents.filter(
      (e) =>
        (category === "ALL" || e.category === category) &&
        filters.matches(e) &&
        (!q || `${e.title} ${e.location} ${e.city} ${e.description}`.toLowerCase().includes(q))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, filters.country, filters.city, filters.price]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 pb-10 pt-5 lg:px-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-black">Events</h1>
            <p className="text-sm text-zinc-500" aria-live="polite">{events.length} found</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              aria-label="Search events"
              placeholder="Search events"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200"
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 border-y border-zinc-200 bg-white/60 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Sport">
            {categories.map((c) => (
              <button
                key={c.value}
                role="tab"
                aria-selected={category === c.value}
                onClick={() => setCategory(c.value)}
                className={`h-9 rounded-lg px-4 text-sm font-semibold transition-colors ${
                  category === c.value ? "bg-violet-600 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <EventFilters filters={filters} />
        </div>

        {events.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-zinc-300 bg-white py-14 text-center text-sm text-zinc-500">
            No events match. Clear a filter or try a different search.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
