import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white border border-zinc-200 shadow-sm hover:shadow-xl transition-all">
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <span className="absolute top-3 left-3 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{event.category}</span>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/80 text-xs uppercase">{event.location}</p>
          <h3 className="text-white text-lg font-black uppercase mt-1 line-clamp-2">{event.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-1 text-violet-700 font-bold"><CalendarDays size={14} />{event.eventDate || event.date}</span>
          <b>{event.price ? `$${event.price}` : "Free"}</b>
        </div>
        <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2">{event.description}</p>
        <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
          <span><MapPin size={13} className="inline" /> {event.city || event.location}</span>
          <span><Users size={13} className="inline" /> {event.stat}</span>
        </div>
        {event.category === "RUNNING" && event.races?.length > 0 && (
          <details className="mt-2 text-xs text-zinc-500">
            <summary className="cursor-pointer">Distances: {event.races[0].distance} · all distances</summary>
            <p className="pt-1">{event.races.map((race) => race.distance).join(" · ")}</p>
          </details>
        )}
        <div className="flex justify-end mt-3">
          <Link to={`/events/${event.id}`} className="inline-flex items-center text-violet-600 text-xs font-bold uppercase">
            View Event <ArrowRight size={15} className="ml-2" />
          </Link>
        </div>
      </div>
    </article>
  );
}
