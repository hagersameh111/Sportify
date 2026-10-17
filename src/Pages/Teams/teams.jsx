import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TeamCard from "./Components/TeamCard";
import { teams } from "../../data/teams";

export default function TeamsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filters = ["All", "Running", "Cycling", "Padel", "Swimming", "Triathlon"];
  const filteredTeams = useMemo(() => teams.filter(team => (activeFilter === "All" || team.sport === activeFilter) && `${team.name} ${team.sport} ${team.city}`.toLowerCase().includes(search.toLowerCase())), [activeFilter, search]);
  return <div className="min-h-screen bg-[#f6f6f6]"><Navbar/><section className="max-w-7xl mx-auto px-6 lg:px-8 pt-7 pb-3"><h1 className="text-3xl font-black uppercase">Teams</h1></section><section className="bg-white border-y"><div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex flex-col lg:flex-row gap-3 justify-between"><div className="flex flex-wrap gap-2">{filters.map(f=><button key={f} onClick={()=>setActiveFilter(f)} className={`px-4 py-2 rounded text-sm font-semibold ${activeFilter===f?'bg-fuchsia-600 text-white':'bg-zinc-100 text-zinc-700'}`}>{f}</button>)}</div><div className="relative w-full lg:w-[320px]"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"/><input placeholder="Search teams, sports, locations..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full h-10 border rounded pl-10 pr-4 outline-none focus:border-fuchsia-500"/></div></div></section><section className="max-w-7xl mx-auto px-6 lg:px-8 py-5"><p className="text-zinc-500 text-sm mb-4">Showing {filteredTeams.length} teams</p><div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">{filteredTeams.map(team=><TeamCard key={team.id} team={team}/>)}</div></section><Footer/></div>;
}
