import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group block overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">
            {event.category}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase">
            {event.location}
          </p>

          <h3 className="text-white text-2xl font-black italic uppercase mt-2 leading-tight">
            {event.title}
          </h3>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-violet-600 font-black text-lg">
            {event.date}
          </span>

          <span className="text-sm font-medium text-zinc-500">
            {event.stat}
          </span>
        </div>

        <p className="text-zinc-600 leading-relaxed mb-6">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <Link to={`/events/${event.id}`}>
  View Event 
</Link>

          <ArrowRight
            size={18}
            className="text-violet-600 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}