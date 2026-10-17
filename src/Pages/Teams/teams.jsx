import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import TeamCard from "./Components/TeamCard";
import { teams } from "../../data/teams";

const filters = [
  "All",
  "Running",
  "Cycling",
  "Padel",
  "Swimming",
  "Triathlon",
];

export default function TeamsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTeams = useMemo(() => {
    const query = search.trim().toLowerCase();

    return teams.filter(
      (team) =>
        (activeFilter === "All" ||
          team.sport?.toLowerCase() === activeFilter.toLowerCase()) &&
        `${team.name} ${team.sport} ${team.city} ${(team.cities || []).join(" ")}`
          .toLowerCase()
          .includes(query)
    );
  }, [activeFilter, search]);

  return (
    <div className="flex-1 bg-zinc-50">
     
      <main className="mx-auto max-w-7xl px-5 pb-10 pt-5 lg:px-8">
        {/* Heading and search */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-black">Teams</h1>
            <p
              className="text-sm text-zinc-500"
              aria-live="polite"
            >
              {filteredTeams.length} found
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="search"
              aria-label="Search teams"
              placeholder="Search teams"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200"
            />
          </div>
        </div>

        {/* Sport filter bar */}
        <div className="mb-5 flex flex-col gap-3 border-y border-zinc-200 bg-white/60 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="Filter teams by sport"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`h-9 rounded-lg px-4 text-sm font-semibold transition-colors ${
                  activeFilter === filter
                    ? "bg-violet-600 text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Teams grid */}
        {filteredTeams.length > 0 ? (
          <div className="grid items-stretch grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-zinc-300 bg-white py-14 text-center text-sm text-zinc-500">
            No teams match. Clear a filter or try a different search.
          </p>
        )}
      </main>

   
    </div>
  );
}
