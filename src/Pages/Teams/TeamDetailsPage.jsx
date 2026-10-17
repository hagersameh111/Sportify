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
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-black">Team not found</h1>
          <Link to="/teams" className="font-bold text-violet-700 hover:underline">Browse all teams</Link>
        </div>
        <Footer />
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
      <Navbar />

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
              <h2 className="mb-3 text-xl font-black">About the team</h2>
              <p className="max-w-3xl leading-7 text-zinc-600">{team.description}</p>
            </section>

            {team.schedule?.length > 0 && (
              <section>
                <h2 className="mb-3 text-xl font-black">Training schedule</h2>
                <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200 bg-white">
                  {team.schedule.map((item, i) => <li key={i} className="px-4 py-3 text-sm text-zinc-700">{item}</li>)}
                </ul>
              </section>
            )}

            {team.coaches?.length > 0 && (
              <section>
                <h2 className="mb-3 text-xl font-black">Captains &amp; coaches</h2>
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
            <div className="sticky top-24 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black">{team.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500"><MapPin size={14} />{cities}</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-5 h-12 w-full rounded-lg bg-violet-600 font-bold text-white transition-colors hover:bg-violet-700 focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                Join the team
              </button>
              <p className="mt-3 text-center text-xs text-zinc-500">The team captain reviews your request within 48 hours.</p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      {showModal && <JoinTeamModal team={team} onClose={() => setShowModal(false)} />}
    </div>
  );
}
