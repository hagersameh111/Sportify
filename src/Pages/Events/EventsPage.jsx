import { useMemo, useState } from "react";
import { Search, MapPin, CalendarDays } from "lucide-react";

import EventCard from "./components/EventCard";
import { upcomingEvents } from "../../data/events";
import Navbar from "../../components/Navbar";

const categories = [
  "ALL",
  "RUNNING",
  "PADEL",
  "CYCLING",
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter((event) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        event.category === selectedCategory;

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
        <Navbar/>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#060b2f] via-[#16104d] to-[#250c5f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <p className="text-violet-400 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            SPORTIFY EVENTS
          </p>

          <h1 className="text-white text-5xl lg:text-7xl font-black italic uppercase leading-none">
            Discover
            <span className="block text-fuchsia-500">
              Events
            </span>
          </h1>

          <p className="text-white/70 max-w-2xl mt-6 text-lg">
            Find races, tournaments, challenges and community events
            happening around the world.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14">
            <div>
              <div className="text-fuchsia-400 text-4xl font-black">
                120+
              </div>
              <div className="text-white/60 uppercase text-xs tracking-widest mt-2">
                Events
              </div>
            </div>

            <div>
              <div className="text-fuchsia-400 text-4xl font-black">
                15K+
              </div>
              <div className="text-white/60 uppercase text-xs tracking-widest mt-2">
                Athletes
              </div>
            </div>

            <div>
              <div className="text-fuchsia-400 text-4xl font-black">
                12
              </div>
              <div className="text-white/60 uppercase text-xs tracking-widest mt-2">
                Sports
              </div>
            </div>

            <div>
              <div className="text-fuchsia-400 text-4xl font-black">
                30
              </div>
              <div className="text-white/60 uppercase text-xs tracking-widest mt-2">
                Cities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    selectedCategory === category
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-[380px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-zinc-300 rounded-xl outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p className="text-zinc-500">
            Showing{" "}
            <span className="font-bold text-zinc-900">
              {filteredEvents.length}
            </span>{" "}
            events
          </p>

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              Upcoming Events
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              Worldwide
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-10 lg:p-14 text-center">
          <h2 className="text-white text-3xl lg:text-5xl font-black italic uppercase">
            Ready For Your Next Challenge?
          </h2>

          <p className="text-white/80 max-w-2xl mx-auto mt-4">
            Join thousands of athletes participating in events,
            competitions and community experiences around the world.
          </p>

          <button className="mt-8 bg-white text-violet-700 font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform">
            Explore More Events
          </button>
        </div>
      </section>
    </div>
  );
}