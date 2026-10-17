
// import { useMemo, useState } from "react";
// import { Search } from "lucide-react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import TeamCard from "../../components/TeamCard";
// import { teams } from "../../data/teams";

// const sports = [
//   { value: "All", label: "All" },
//   { value: "Running", label: "Running" },
//   { value: "Padel", label: "Padel" },
//   { value: "Cycling", label: "Cycling" },
//   { value: "Swimming", label: "Swimming" },
//   { value: "Triathlon", label: "Triathlon" },
// ];

// export default function TeamsPage() {
//   const [sport, setSport] = useState("All");
//   const [search, setSearch] = useState("");

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();

//     return teams.filter(
//       (t) =>
//         (sport === "All" ||
//           t.sport?.toLowerCase() === sport.toLowerCase()) &&
//         (!q ||
//           `${t.name} ${t.sport} ${t.city} ${(t.cities || []).join(" ")}`
//             .toLowerCase()
//             .includes(q))
//     );
//   }, [sport, search]);

//   return (
//     <div className="min-h-screen bg-zinc-50">
//       <Navbar />

//       <main className="mx-auto max-w-7xl px-5 pb-10 pt-5 lg:px-8">
//         {/* Page heading and search */}
//         <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-baseline gap-3">
//             <h1 className="text-2xl font-black">Teams</h1>
//             <p
//               className="text-sm text-zinc-500"
//               aria-live="polite"
//             >
//               {filtered.length} found
//             </p>
//           </div>

//           <div className="relative w-full sm:w-64">
//             <Search
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
//             />
//             <input
//               type="search"
//               aria-label="Search teams"
//               placeholder="Search teams"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200"
//             />
//           </div>
//         </div>

//         {/* Sport filter tabs */}
//         <div className="mb-5 flex flex-col gap-3 border-y border-zinc-200 bg-white/60 py-3 lg:flex-row lg:items-center lg:justify-between">
//           <div
//             className="flex flex-wrap gap-1.5"
//             role="tablist"
//             aria-label="Sport"
//           >
//             {sports.map((s) => (
//               <button
//                 key={s.value}
//                 type="button"
//                 role="tab"
//                 aria-selected={sport === s.value}
//                 onClick={() => setSport(s.value)}
//                 className={`h-9 rounded-lg px-4 text-sm font-semibold transition-colors ${
//                   sport === s.value
//                     ? "bg-violet-600 text-white"
//                     : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
//                 }`}
//               >
//                 {s.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Teams grid */}
//         {filtered.length > 0 ? (
//           <div className="grid items-stretch grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {filtered.map((team) => (
//               <TeamCard key={team.id} team={team} />
//             ))}
//           </div>
//         ) : (
//           <p className="rounded-xl border border-dashed border-zinc-300 bg-white py-14 text-center text-sm text-zinc-500">
//             No teams match. Clear a filter or try a different search.
//           </p>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }
