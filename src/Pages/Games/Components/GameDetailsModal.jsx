
import { useState } from "react";
import {
  X,
  MapPin,
  CalendarDays,
  Clock,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";

const formatDate = (date) =>
  date
    ? new Date(`${date.slice(0, 10)}T12:00:00`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date not set";

export default function GameDetailsModal({
  game,
  onClose,
  onJoin,
  joining,
  error,
}) {
  const [joinSuccess, setJoinSuccess] = useState(false);

  if (!game) return null;

  const spots = Math.max(0, game.maxPlayers - game.players);
  const full = spots === 0;

  async function handleJoin() {
    const success = await onJoin(game.id);

    if (success) setJoinSuccess(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-details-title"
        className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="relative h-52">
          <img
            src={game.image || "/images/game-placeholder.jpg"}
            alt={game.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close game details"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-800 shadow hover:bg-zinc-100"
          >
            <X size={18} />
          </button>

          <span className="absolute bottom-4 left-4 rounded-md bg-violet-600 px-3 py-1.5 text-xs font-bold text-white">
            {game.sport}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-violet-700">
              {full ? "No spots available" : `${spots} spots available`}
            </span>
            <span className="text-sm font-bold text-zinc-900">
              {game.price > 0 ? `EGP ${game.price}/player` : "Free"}
            </span>
          </div>

          <h2 id="game-details-title" className="text-2xl font-black text-zinc-900">
            {game.title}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            {game.description}
          </p>

          <div className="mt-5 space-y-3 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
            <p className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 text-violet-600" />
              <span>
                <strong className="block text-zinc-900">Location</strong>
                {game.venue}, {game.city}
              </span>
            </p>

            <p className="flex items-start gap-3">
              <CalendarDays size={18} className="shrink-0 text-violet-600" />
              <span>
                <strong className="block text-zinc-900">Date</strong>
                {formatDate(game.date)}
              </span>
            </p>

            <p className="flex items-start gap-3">
              <Clock size={18} className="shrink-0 text-violet-600" />
              <span>
                <strong className="block text-zinc-900">Start time</strong>
                {game.time}
              </span>
            </p>

            <p className="flex items-start gap-3">
              <Users size={18} className="shrink-0 text-violet-600" />
              <span>
                <strong className="block text-zinc-900">Players</strong>
                {game.players} of {game.maxPlayers} joined
              </span>
            </p>

            <p className="flex items-start gap-3">
              <Trophy size={18} className="shrink-0 text-violet-600" />
              <span>
                <strong className="block text-zinc-900">Skill level</strong>
                {game.level || "All levels"}
              </span>
            </p>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          {joinSuccess ? (
            <div className="mt-5 rounded-lg bg-violet-50 p-3 text-center text-sm font-semibold text-violet-700">
              Join request submitted successfully.
            </div>
          ) : (
            <button
              type="button"
              onClick={handleJoin}
              disabled={joining || full}
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              {joining ? "Joining..." : full ? "No Spots Available" : "Join Game"}
              {!joining && !full && <ArrowRight size={16} />}
            </button>
          )}

          <p className="mt-3 text-center text-xs text-zinc-400">
            Organized by {game.organizer || "Sportify member"}
          </p>
        </div>
      </section>
    </div>
  );
}
