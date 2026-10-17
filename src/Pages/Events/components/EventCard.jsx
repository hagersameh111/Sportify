import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <article className="h-60 flex flex-col overflow-hidden rounded-xl bg-white border border-zinc-200 shadow-sm hover:shadow-xl transition-all">
      <div className="relative h-28 shrink-0 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <span className="absolute top-2 left-2 bg-violet-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
          {event.category}
        </span>

        <div className="absolute bottom-2 left-3 right-3">
          <p className="text-white/80 text-[10px] uppercase">
            {event.location}
          </p>
          <h3 className="text-white text-sm font-black uppercase mt-1 line-clamp-2">
            {event.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 min-h-0">
        <div className="flex items-center justify-between text-[10px] mb-1">
          <span className="flex items-center gap-1 text-violet-700 font-bold">
            <CalendarDays size={12} />
            {event.eventDate || event.date}
          </span>
          <b>{event.price ? `$${event.price}` : "Free"}</b>
        </div>

        <p className="text-zinc-600 text-[10px] leading-relaxed line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-1 text-[10px] text-zinc-500">
          <span className="truncate">
            <MapPin size={11} className="inline" /> {event.city || event.location}
          </span>
          <span className="shrink-0 ml-2">
            <Users size={11} className="inline" /> {event.stat}
          </span>
        </div>

        <div className="flex justify-end mt-1">
          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center text-violet-600 text-[10px] font-bold uppercase"
          >
            View Event <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}