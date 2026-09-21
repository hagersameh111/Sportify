import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TeamCard from "./Components/TeamCard";

import { teams } from "../../data/teams";

export default function TeamsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = [
    "All",
    "Running",
    "Cycling",
    "Padel",
    "Swimming",
    "Triathlon",
  ];

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesSport =
        activeFilter === "All" || team.sport === activeFilter;

      const matchesSearch =
        team.name.toLowerCase().includes(search.toLowerCase()) ||
        team.sport.toLowerCase().includes(search.toLowerCase());

      return matchesSport && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#07152b] via-[#16123d] to-[#23085c] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <p className="uppercase tracking-[0.25em] text-xs text-[#d946ef] font-bold mb-5">
            Sportify Teams
          </p>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase">
            Find Your{" "}
            <span className="text-[#d946ef]">
              Squad
            </span>
          </h1>

          <p className="mt-6 text-zinc-300 max-w-2xl">
            12 active teams across running, cycling,
            padel, swimming & more.
          </p>

          <div className="flex flex-wrap gap-10 mt-14">
            <div>
              <h3 className="text-4xl font-black text-[#d946ef]">
                12
              </h3>
              <p className="uppercase text-xs tracking-wider text-zinc-400">
                Teams
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-[#d946ef]">
                1,000+
              </h3>
              <p className="uppercase text-xs tracking-wider text-zinc-400">
                Members
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-[#d946ef]">
                5
              </h3>
              <p className="uppercase text-xs tracking-wider text-zinc-400">
                Sports
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-[#d946ef]">
                3
              </h3>
              <p className="uppercase text-xs tracking-wider text-zinc-400">
                Cities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col lg:flex-row gap-5 justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded text-sm font-semibold transition ${
                  activeFilter === filter
                    ? "bg-[#d946ef] text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-[350px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search teams, sports, locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 border rounded pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#d946ef]"
            />
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-zinc-500 text-sm">
            Showing {filteredTeams.length} teams
          </p>

          <select className="border rounded px-3 py-2 text-sm">
            <option>Most Members</option>
            <option>Newest</option>
            <option>Name</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-4">
              Don't See Your Team?
            </h2>

            <p className="text-zinc-600 max-w-xl">
              Start a new team, invite members,
              and compete in events together.
              It only takes 2 minutes.
            </p>
          </div>

          <button className="px-8 py-4 bg-[#d946ef] text-white font-bold rounded-lg hover:opacity-90">
            Create a Team
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}