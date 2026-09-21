import { Crown, Flag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeamCard({ team }) {
  return (
    <div className="bg-[#171b21] rounded-md p-6 min-h-[260px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div>
        <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mb-6">
          {team.icon === "crown" ? (
            <Crown size={18} className="text-white" />
          ) : (
            <Flag size={18} className="text-white" />
          )}
        </div>

        <h3 className="text-white font-black italic uppercase text-3xl leading-tight">
          {team.name}
        </h3>

        <p className="text-[#d946ef] text-xs uppercase tracking-[0.25em] mt-5">
          {team.members}
        </p>
      </div>

      <Link
        to={`/teams/${team.id}`}
        className="mt-8 inline-flex items-center gap-2 text-[#d946ef] text-sm font-bold uppercase"
      >
        View Team
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}