import { Link } from "react-router-dom";
import { upcomingEvents } from "../../../data/events";
import EventCard from "../../../components/EventCard";
import EventFilters, { useEventFilters } from "../../../components/EventFilters";

const LIMIT = 6;

export default function EventsSection() {
  const filters = useEventFilters(upcomingEvents);
  const matching = upcomingEvents.filter(filters.matches);

  return (
    <section
      id="events"
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 md:px-8 md:py-8"
    >
      {/* Section heading */}
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="eyebrow text-sm text-[#0041C8]">Events</p>

          <h2 className="mt-2 font-display text-2xl leading-tight sm:text-3xl md:text-4xl">
            UPCOMING{" "}
            <span className="bg-gradient-to-r from-[#5c47e8] via-[#5c25dc] to-[#C737E4] bg-clip-text text-transparent">
              EVENTS
            </span>
          </h2>
        </div>

        {/* Filters and link */}
        <div className="flex min-w-0 flex-col gap-3 lg:max-w-[65%] lg:items-end">
          <div className="w-full min-w-0">
            <div className="overflow-x-auto pb-1">
              <div className="flex w-max min-w-full flex-wrap items-center gap-2 sm:gap-3">
                <EventFilters filters={filters} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <p className="text-xs text-zinc-500 sm:text-sm">
              {matching.length} {matching.length === 1 ? "event" : "events"} found
            </p>

            <Link
              to="/events"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-50 hover:underline"
            >
              See all
              {matching.length > LIMIT && (
                <span>({matching.length})</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Event cards */}
      {matching.length > 0 ? (
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matching.slice(0, LIMIT).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-10 text-center">
          <p className="text-sm font-semibold text-zinc-700">
            No events match these filters.
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Try another city or price.
          </p>
        </div>
      )}
    </section>
  );
}