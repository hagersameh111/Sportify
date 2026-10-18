
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "Date not set";

  return new Date(`${date.slice(0, 10)}T12:00:00`).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  );
};

export default function GameCard({ game, onView }) {
  const spots = Math.max(0, game.maxPlayers - game.players);
  const full = spots === 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={game.image || "/images/game-placeholder.jpg"}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <span className="absolute left-3 top-3 rounded-md bg-violet-600 px-3 py-1.5 text-xs font-bold text-white">
          {game.sport}
        </span>

        <span className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-xs font-bold ${
          full ? "bg-zinc-900 text-white" : "bg-white text-violet-700"
        }`}>
          {full ? "Game full" : `${spots} ${spots === 1 ? "spot" : "spots"} open`}
        </span>

        <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
          {game.price > 0 ? `EGP ${game.price}/player` : "Free"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500">
          <Trophy size={14} className="text-violet-600" />
          {game.level || "All levels"}
          {game.organizer && (
            <>
              <span>·</span>
              <span className="truncate">{game.organizer}</span>
            </>
          )}
        </div>

        <h2 className="line-clamp-2 text-lg font-black text-zinc-900">
          {game.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">
          {game.description}
        </p>

        <div className="mt-4 space-y-2 border-t border-zinc-100 pt-3 text-sm text-zinc-600">
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-violet-600" />
            <span>{game.venue}, {game.city}</span>
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0 text-violet-600" />
            {formatDate(game.date)}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={16} className="shrink-0 text-violet-600" />
            {game.time}
          </p>
          <p className="flex items-center gap-2">
            <Users size={16} className="shrink-0 text-violet-600" />
            {game.players}/{game.maxPlayers} players joined
          </p>
        </div>

        <button
          type="button"
          onClick={() => onView(game)}
          className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-bold text-white transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        >
          View & Join Game
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}
