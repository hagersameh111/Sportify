import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Gauge, MapPin, Trophy, Users } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JoinTeamModal from "./JoinTeamModal";
import { teams } from "../../data/teams";


export default function TeamDetailsPage() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const team = teams.find((t) => t.id === Number(id));

  if (!team) {
    return (
      <>
        
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-black">Team not found</h1>
          <Link to="/teams" className="font-bold text-violet-700 hover:underline">Browse all teams</Link>
        </div>
      
      </>
    );
  }

  const cities = team.cities?.join(", ") || team.city;
  const stats = [
    { icon: Trophy, label: "Sport", value: team.sport },
    { icon: Users, label: "Members", value: team.members },
    { icon: Calendar, label: "Founded", value: team.founded },
    { icon: Gauge, label: "Level", value: team.level },
    { icon: MapPin, label: "Cities", value: cities },
  ].filter((s) => s.value);

  return (
    <div className="min-h-screen bg-zinc-50">
    

      <section className="relative h-[260px] overflow-hidden md:h-[320px]">
        <img src={team.heroImage} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-5 pb-8 lg:px-8">
            <Link to="/teams" className="mb-4 inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white">
              <ArrowLeft size={16} /> All teams
            </Link>
            <h1 className="text-4xl font-black italic uppercase leading-none text-white md:text-6xl">{team.name}</h1>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-4 px-5 py-4 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} className="shrink-0 text-violet-600" />
              <div className="min-w-0">
                <dt className="text-xs text-zinc-500">{label}</dt>
                <dd className="truncate text-sm font-bold text-zinc-900">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <section>
                  <h2 className="mb-5 text-sm font-semibold italic uppercase tracking-widest text-blue-700">About the team</h2>
              <p className="max-w-3xl leading-7 text-zinc-600">{team.description}</p>
            </section>

          {team.schedule?.length > 0 && (
  <section>
    <h2 className="mb-5 text-sm font-semibold italic uppercase tracking-widest text-blue-700">
      Training schedule
    </h2>
    <ul className="space-y-4">
      {team.schedule.map((item, i) => (
        <li key={i} className="flex items-center gap-4 text-base text-zinc-600">
          <span className="h-2 w-2 shrink-0 rounded-full bg-fuchsia-500" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  </section>
)}

            {team.coaches?.length > 0 && (
              <section>
                    <h2 className="mb-5 text-sm font-semibold italic uppercase tracking-widest text-blue-700">Captains &amp; coaches</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {team.coaches.map((p) => (
                    <article key={p.name} className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                      <img src={p.image} alt={p.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                      <div className="p-3.5">
                        <h3 className="font-bold leading-tight text-zinc-900">{p.name}</h3>
                        <p className="mt-0.5 text-sm font-semibold text-violet-700">{p.role}</p>
                        {p.bio && <p className="mt-2 line-clamp-3 text-xs leading-5 text-zinc-500">{p.bio}</p>}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside>
  <div className="sticky top-24 rounded-xl border border-white/5 bg-[#1b1e20]/92 p-8 shadow-lg">
    <p className="font-mono text-sm uppercase tracking-wider text-fuchsia-400">
      {team.members} Members
    </p>

    <h2 className="mt-3 text-3xl font-black italic uppercase leading-tight text-white">
      {team.name}
    </h2>

    <hr className="my-6 border-white/10" />

    <dl className="space-y-4 text-base">
      {[
        ["Sport", team.sport],
        ["Members", team.members],
        ["Level", team.level],
        ["Founded", team.founded],
      ]
        .filter(([, value]) => value)
        .map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <dt className="text-zinc-400">{label}</dt>
            <dd className="text-right font-bold text-white">{value}</dd>
          </div>
        ))}
    </dl>

    <button
      onClick={() => setShowModal(true)}
      className="mt-8 h-14 w-full rounded-md bg-fuchsia-500 text-base font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-fuchsia-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
    >
      Request to join
    </button>

    <p className="mt-6 text-center text-sm leading-6 text-zinc-400">
      The team captain will review your request within 48 hours.
    </p>
  </div>
</aside>
        </div>
      </main>

      
      {showModal && <JoinTeamModal team={team} onClose={() => setShowModal(false)} />}
    </div>
  );
}
