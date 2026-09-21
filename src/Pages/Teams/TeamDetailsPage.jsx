import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Users,
  Trophy,
  Calendar,
  ArrowLeft,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JoinTeamModal from "./Components/JoinTeamModal";

import { teams } from "../../data/teams";

export default function TeamDetailsPage() {
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const team = teams.find(
    (item) => item.id === Number(id)
  );

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold">
          Team Not Found
        </h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* HERO IMAGE */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={team.heroImage}
          alt={team.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 pb-12">
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 text-white mb-6 hover:text-[#d946ef]"
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <p className="uppercase text-xs tracking-[0.25em] text-[#d946ef] font-bold mb-4">
              {team.sport}
            </p>

            <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white">
              {team.name}
            </h1>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-[#f6f6f6] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            {/* LEFT */}
            <div>
              {/* ABOUT */}
              <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-black uppercase mb-5">
                  About The Team
                </h2>

                <p className="text-zinc-600 leading-8">
                  {team.description}
                </p>
              </div>

              {/* TRAINING */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-black uppercase mb-6">
                  Training Schedule
                </h2>

                <div className="space-y-4">
                  {team.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-zinc-50"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-28">
                <img
                  src={team.heroImage}
                  alt={team.name}
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="font-black uppercase text-xl mb-6">
                    {team.name}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Trophy
                        size={18}
                        className="text-[#d946ef]"
                      />
                      <div>
                        <p className="text-xs uppercase text-zinc-400">
                          Sport
                        </p>
                        <p className="font-semibold">
                          {team.sport}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users
                        size={18}
                        className="text-[#d946ef]"
                      />
                      <div>
                        <p className="text-xs uppercase text-zinc-400">
                          Members
                        </p>
                        <p className="font-semibold">
                          {team.members}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar
                        size={18}
                        className="text-[#d946ef]"
                      />
                      <div>
                        <p className="text-xs uppercase text-zinc-400">
                          Founded
                        </p>
                        <p className="font-semibold">
                          {team.founded}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase text-zinc-400 mb-1">
                        Level
                      </p>

                      <p className="font-semibold">
                        {team.level}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-[#d946ef] hover:bg-[#c026d3] text-white font-bold py-4 rounded-lg transition"
                  >
                    Request To Join
                  </button>

                  <p className="text-xs text-zinc-500 mt-4 text-center">
                    The team captain will review your
                    request within 48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <h3 className="text-5xl font-black text-[#d946ef]">
                {parseInt(team.members)}
              </h3>

              <p className="uppercase tracking-widest text-sm text-zinc-500 mt-2">
                Members
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <h3 className="text-5xl font-black text-[#d946ef]">
                {team.founded}
              </h3>

              <p className="uppercase tracking-widest text-sm text-zinc-500 mt-2">
                Founded
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <h3 className="text-4xl font-black text-[#d946ef]">
                {team.level}
              </h3>

              <p className="uppercase tracking-widest text-sm text-zinc-500 mt-2">
                Level
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {showModal && (
        <JoinTeamModal
          team={team}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}