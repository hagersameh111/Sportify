
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

import GameCard from "./Components/GameCard";
import GameDetailsModal from "./Components/GameDetailsModal";
import CreateGameModal from "./Components/CreateGameModal";
import { gamesService } from "../../services/gamesService";

const sports = [
  "All",
  "Padel",
  "Running",
  "Cycling",
  "Football",
  "Swimming",
];

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [sport, setSport] = useState("All");
  const [city, setCity] = useState("All cities");
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("Open spots");

  const [selectedGame, setSelectedGame] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [createError, setCreateError] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  const loadGames = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await gamesService.getGames();

      // Supports either a raw array or a common { data: [...] } response.
      const list = Array.isArray(response)
        ? response
        : response?.data;

      if (!Array.isArray(list)) {
        throw new Error("The server returned an invalid games response.");
      }

      setGames(list);
    } catch (error) {
      setLoadError(error.message || "Unable to load games.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const cities = useMemo(
    () => [...new Set(games.map((game) => game.city).filter(Boolean))].sort(),
    [games]
  );

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase();

    return games.filter((game) => {
      const matchesSport = sport === "All" || game.sport === sport;
      const matchesCity = city === "All cities" || game.city === city;
      const spots = Math.max(0, game.maxPlayers - game.players);
      const matchesAvailability =
        availability === "All games" || spots > 0;

      const searchableText = [
        game.title,
        game.sport,
        game.city,
        game.venue,
        game.description,
        game.level,
        game.organizer,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesSport &&
        matchesCity &&
        matchesAvailability &&
        searchableText.includes(query)
      );
    });
  }, [games, sport, city, search, availability]);

  async function handleCreateGame(payload) {
    setSubmitting(true);
    setCreateError("");
    setNotice("");

    try {
      await gamesService.createGame(payload);
      setShowCreateForm(false);
      await loadGames();
      setNotice("Your game has been published.");
      return true;
    } catch (error) {
      setCreateError(error.message || "Unable to create the game.");
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleJoinGame(gameId) {
    setJoining(true);
    setJoinError("");
    setNotice("");

    try {
      await gamesService.joinGame(gameId);
      await loadGames();

      // Refresh the selected game from the updated list.
      const response = await gamesService.getGameById(gameId);
      const updatedGame = response?.data ?? response;

      setSelectedGame(updatedGame);
      setNotice("Your join request was submitted.");
      return true;
    } catch (error) {
      setJoinError(error.message || "Unable to join this game.");
      return false;
    } finally {
      setJoining(false);
    }
  }

  function clearFilters() {
    setSport("All");
    setCity("All cities");
    setSearch("");
    setAvailability("Open spots");
  }

  return (
    <div className="flex-1 bg-zinc-50">
      <main className="mx-auto max-w-7xl px-5 pb-12 pt-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              SPORTIFY COMMUNITY
            </div>

            <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
              Find a <span className="text-violet-600">Game</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
              Find players, join friendly matches, and make your next game
              happen.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setCreateError("");
              setShowCreateForm(true);
            }}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <Plus size={18} />
            Create a Game
          </button>
        </div>

        {/* Search and location */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search games, sports, venues or cities..."
              aria-label="Search games"
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200"
            />
          </div>

          <div className="relative sm:w-52">
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              aria-label="Filter by city"
              className="h-11 w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-700 outline-none focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200"
            >
              <option value="All cities">All cities</option>
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sport and availability filters */}
        <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-3 sm:p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                Browse by sport
              </p>

              <div
                className="flex flex-wrap gap-1.5"
                role="group"
                aria-label="Filter games by sport"
              >
                {sports.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={sport === item}
                    onClick={() => setSport(item)}
                    className={`h-9 rounded-lg px-4 text-sm font-semibold transition-colors ${
                      sport === item
                        ? "bg-violet-600 text-white shadow-sm"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 lg:pt-5">
              <SlidersHorizontal
                size={16}
                className="shrink-0 text-zinc-400"
              />
              <select
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                aria-label="Filter by availability"
                className="h-9 min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200 sm:flex-none"
              >
                <option value="Open spots">Open spots</option>
                <option value="All games">All games</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-zinc-900">Games</h2>
            <p className="mt-1 text-sm text-zinc-500" aria-live="polite">
              {filteredGames.length}{" "}
              {filteredGames.length === 1 ? "game" : "games"} found
            </p>
          </div>

          <button
            type="button"
            onClick={loadGames}
            disabled={loading}
            className="text-sm font-semibold text-violet-700 hover:underline disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {notice && (
          <div
            role="status"
            className="mb-4 rounded-lg border border-violet-200 bg-violet-50 p-3 text-sm text-violet-800"
          >
            {notice}
          </div>
        )}

        {loadError && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-white p-5 text-sm text-red-700"
          >
            <p className="font-semibold">Couldn't load games</p>
            <p className="mt-1">{loadError}</p>
            <button
              type="button"
              onClick={loadGames}
              className="mt-3 font-bold underline"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[440px] animate-pulse rounded-xl border border-zinc-200 bg-white"
              />
            ))}
          </div>
        ) : !loadError && filteredGames.length > 0 ? (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onView={(item) => {
                  setJoinError("");
                  setSelectedGame(item);
                }}
              />
            ))}
          </div>
        ) : !loadError ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-600">
              <Search size={24} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-zinc-900">
              No games found
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
              Try another sport, location, or search term.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-700"
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </main>

      {selectedGame && (
        <GameDetailsModal
          game={selectedGame}
          onClose={() => {
            setSelectedGame(null);
            setJoinError("");
          }}
          onJoin={handleJoinGame}
          joining={joining}
          error={joinError}
        />
      )}

      {showCreateForm && (
        <CreateGameModal
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateGame}
          submitting={submitting}
          error={createError}
        />
      )}
    </div>
  );
}
