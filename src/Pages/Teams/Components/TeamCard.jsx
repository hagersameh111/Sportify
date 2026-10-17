
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeamCard({ team }) {
  const initials = team.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <Link
      to={`/teams/${team.id}`}
      className="relative block h-60 overflow-hidden rounded-lg group"
    >
      <img
        src={team.heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

      <div className="relative flex h-full flex-col justify-between p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-black text-violet-700 shadow">
          {initials}
        </span>

        <div>
          <h2 className="text-xl font-black italic uppercase leading-tight text-white line-clamp-2">
            {team.name}
          </h2>

          <p className="mt-2 line-clamp-1 text-xs text-white/80">
            <MapPin size={13} className="inline" />{" "}
            {team.cities?.join(", ") || team.city}
          </p>

          <p className="mt-1 line-clamp-1 text-[11px] uppercase tracking-wider text-fuchsia-300">
            {team.members}
          </p>

          <span className="mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase text-fuchsia-300">
            View Team <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
