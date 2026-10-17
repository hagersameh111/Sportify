import { Link } from 'react-router-dom';
import { upcomingEvents } from '../../../data/events';
import EventCard from '../../../components/EventCard';
import EventFilters, { useEventFilters } from '../../../components/EventFilters';

const LIMIT = 6;

export default function EventsSection() {
  const filters = useEventFilters(upcomingEvents);
  const matching = upcomingEvents.filter(filters.matches);

  return (
    <section id="events" className="mx-auto max-w-7xl px-5 py-5 md:px-8">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
         <div>
          <p className="eyebrow text-[#0041C8]">Events</p>
          <h2 className="font-display text-3xl md:text-4xl mt-2">
            UPCOMING <span className="bg-gradient-to-r from-[#5c47e8]  via-[#5c25dc] to-[#C737E4] bg-clip-text text-transparent">EVENTS</span>
          </h2>
         
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <EventFilters filters={filters} />
          <Link to="/events" className="text-sm font-bold text-violet-700 hover:underline">
            See all{matching.length > LIMIT ? ` (${matching.length})` : ''}
          </Link>
        </div>
      </div>

      {matching.length ? (
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {matching.slice(0, LIMIT).map((event) => (
    <EventCard key={event.id} event={event} />
  ))}
</div>
      ) : (
        <p className="rounded-xl border border-dashed border-zinc-300 bg-white py-10 text-center text-sm text-zinc-500">
          No events match these filters. Try another city or price.
        </p>
      )}
    </section>
  );
}
