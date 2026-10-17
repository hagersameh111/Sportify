import { Link } from 'react-router-dom';
import { teams } from '../../../data/teams';
import TeamCard from '../../../components/TeamCard';

export default function TeamsSection() {
  return (
    <section id="teams" className="bg-white py-5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-4 flex items-center justify-between">
           <div>
          
          <h2 className="font-display text-3xl md:text-4xl mt-2">
           <span className="bg-gradient-to-r from-[#5c47e8]  via-[#5c25dc] to-[#C737E4] bg-clip-text text-transparent">TEAMS</span>
          </h2>
         
        </div>
          <Link to="/teams" className="text-sm font-bold text-violet-700 hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 sm:grid-cols-2">
  {teams.slice(0, 8).map((team) => (
    <TeamCard key={team.id} team={team} />
  ))}
</div>
      </div>
    </section>
  );
}
