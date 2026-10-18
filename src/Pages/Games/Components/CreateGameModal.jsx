
import { useState } from "react";
import { Plus, X } from "lucide-react";

const sports = ["Padel", "Running", "Cycling", "Football", "Swimming"];
const inputClass =
  "h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100";

export default function CreateGameModal({
  onClose,
  onSubmit,
  submitting,
  error,
}) {
  const [formError, setFormError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const data = new FormData(event.currentTarget);
    const maxPlayers = Number(data.get("maxPlayers"));
    const price = Number(data.get("price"));

    if (!Number.isInteger(maxPlayers) || maxPlayers < 2) {
      setFormError("Total players must be at least 2.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setFormError("Price cannot be negative.");
      return;
    }

    const payload = {
      title: data.get("title").trim(),
      sport: data.get("sport"),
      level: data.get("level"),
      venue: data.get("venue").trim(),
      city: data.get("city").trim(),
      date: data.get("date"),
      time: data.get("time"),
      maxPlayers,
      price,
      description: data.get("description").trim(),
    };

    const created = await onSubmit(payload);

    if (!created) return;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-game-title"
        className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="create-game-title" className="text-2xl font-black text-zinc-900">
              Create a Game
              
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Set up a friendly game and find your players.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close create game form"
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="game-title" className="mb-1.5 block text-sm font-semibold text-zinc-700">
              Game title *
            </label>
            <input
              id="game-title"
              name="title"
              required
              maxLength={100}
              placeholder="e.g. Friendly Padel Match"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="game-sport" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                Sport *
              </label>
              <select id="game-sport" name="sport" required className={inputClass}>
                {sports.map((sport) => (
                  <option key={sport}>{sport}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="game-level" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                Skill level
              </label>
              <select id="game-level" name="level" className={inputClass}>
                <option>All levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="game-venue" className="mb-1.5 block text-sm font-semibold text-zinc-700">
              Venue *
            </label>
            <input
              id="game-venue"
              name="venue"
              required
              maxLength={120}
              placeholder="Sports club or meeting point"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="game-city" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                City *
              </label>
              <input
                id="game-city"
                name="city"
                required
                maxLength={80}
                placeholder="e.g. Cairo"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="game-date" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                Date *
              </label>
              <input
                id="game-date"
                name="date"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="game-time" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                Start time *
              </label>
              <input
                id="game-time"
                name="time"
                type="time"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="game-players" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                Total players *
              </label>
              <input
                id="game-players"
                name="maxPlayers"
                type="number"
                min="2"
                max="100"
                defaultValue="4"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="game-price" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                EGP / player
              </label>
              <input
                id="game-price"
                name="price"
                type="number"
                min="0"
                defaultValue="0"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="game-description" className="mb-1.5 block text-sm font-semibold text-zinc-700">
              Description
            </label>
            <textarea
              id="game-description"
              name="description"
              rows={3}
              maxLength={500}
              placeholder="Tell players about your game..."
              className="w-full resize-y rounded-lg border border-zinc-200 p-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {(formError || error) && (
            <p role="alert" className="text-sm text-red-600">
              {formError || error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-10 rounded-lg border border-zinc-200 px-5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-bold text-white hover:bg-violet-700 disabled:opacity-60"
            >
              <Plus size={16} />
              {submitting ? "Publishing..." : "Publish Game"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
