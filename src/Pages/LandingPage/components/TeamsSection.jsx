import { Crown, Flag, ArrowRight } from 'lucide-react'
import { teams } from '../../../data/teams'

function TeamCard({ team }) {
  const Icon = team.icon === 'crown' ? Crown : Flag

  return (
    <article className="bg-[#1D2022] rounded-sm p-6 flex flex-col justify-between min-h-[190px] hover:bg-[#241D2C] transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-white/40 font-mono">
          SPORTIFY
        </span>
        <Icon size={18} className="text-white/40" />
      </div>

      <div>
        <h3 className="font-display text-white text-base leading-snug mt-4">{team.name}</h3>
        <p className="text-xs text-white/40 mt-2">{team.members}</p>
        <a
          href="#team"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#C737E4] mt-4 hover:text-white transition-colors"
        >
          VIEW TEAM <ArrowRight size={12} />
        </a>
      </div>
    </article>
  )
}

export default function TeamsSection() {
  return (
    <section id="teams" className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow">Community Matters</p>
            <h2 className="font-display text-3xl md:text-4xl text-black mt-2">
              LEADING <span className="bg-gradient-to-r from-[#5c47e8]  via-[#5c25dc] to-[#C737E4] bg-clip-text text-transparent">SQUADS</span>
            </h2>
            <p className="text-white/50 mt-2 italic max-w-lg">
              Endurance is a solo sport, but improvement is a team effort. Connect with local
              clubs that match your pace and goals.
            </p>
          </div>
          <a href="#all-teams" className="explore-link text-white shrink-0">
            Explore More
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {teams.map((team, i) => (
            <TeamCard key={`${team.id}-${i}`} team={team} />
          ))}
        </div>
      </div>
    </section>
  )
}
