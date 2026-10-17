import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function TeamCard({ team }) {
  const [logoOk, setLogoOk] = useState(Boolean(team.logo));
  const initials = team.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const cities = team.cities?.join(', ') || team.city;

  return (
    <Link
      to={`/teams/${team.id}`}
      className="group relative block h-48 overflow-hidden rounded-xl bg-zinc-900 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
    >
      <img src={team.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          {logoOk ? (
            <img src={team.logo} alt={`${team.name} logo`} onError={() => setLogoOk(false)} className="h-11 w-11 rounded-full bg-white object-contain p-1 shadow" />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-black text-violet-700 shadow">{initials}</span>
          )}
          {team.sport && <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">{team.sport}</span>}
        </div>
        <div>
          <h3 className="line-clamp-2 text-lg font-black italic uppercase leading-tight text-white">{team.name}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/80">
            <MapPin size={13} className="shrink-0" />
            <span className="truncate">{cities}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="shrink-0">{team.members}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
