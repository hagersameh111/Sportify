import { useMemo, useState } from 'react';
import { MapPin, MessageCircle, Users } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const sessions = [
  { id: 1, sport: 'Padel', title: 'Friendly Padel Games', city: 'Cairo', venue: 'New Cairo Sports Club', date: 'Today', time: '7:00 PM', people: '3 spots open', contact: '+20 100 000 0001' },
  { id: 2, sport: 'Running', title: 'Sunset 5K Group Run', city: 'Alexandria', venue: 'Stanley Bridge', date: 'Tomorrow', time: '6:30 PM', people: '8 runners', contact: '+20 100 000 0002' },
  { id: 3, sport: 'Cycling', title: 'Morning City Ride', city: 'Cairo', venue: 'Zamalek meetup point', date: 'Friday', time: '6:00 AM', people: '6 riders', contact: '+20 100 000 0003' },
];

const select =
  'h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200';

export default function TrainingPage() {
  const [city, setCity] = useState('All cities');
  const [sport, setSport] = useState('All');

  const cities = useMemo(() => [...new Set(sessions.map((s) => s.city))], []);
  const sports = useMemo(() => ['All', ...new Set(sessions.map((s) => s.sport))], []);
  const filtered = sessions.filter(
    (s) => (city === 'All cities' || s.city === city) && (sport === 'All' || s.sport === sport)
  );

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 pb-10 pt-5 md:px-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black">Training</h1>
            <p className="text-sm text-zinc-500">Short sessions you can join this week. Message the organizer to get a spot.</p>
          </div>
          <select aria-label="Filter sessions by city" value={city} onChange={(e) => setCity(e.target.value)} className={select}>
            <option>All cities</option>
            {cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5 border-y border-zinc-200 bg-white/60 py-3">
          {sports.map((s) => (
            <button
              key={s}
              aria-pressed={sport === s}
              onClick={() => setSport(s)}
              className={`h-9 rounded-lg px-4 text-sm font-semibold transition-colors ${
                sport === s ? 'bg-violet-600 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {filtered.length ? (
          <ul className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
            {filtered.map((s) => (
              <li
                key={s.id}
                className="grid gap-3 border-b border-zinc-100 p-4 last:border-b-0 md:grid-cols-[130px_1fr_auto] md:items-center md:gap-6"
              >
                <div>
                  <p className={`text-lg font-black leading-tight ${s.date === 'Today' ? 'text-violet-700' : 'text-zinc-900'}`}>{s.date}</p>
                  <p className="text-sm font-semibold text-zinc-500">{s.time}</p>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-bold text-violet-700">{s.sport}</span>
                    <h2 className="font-bold text-zinc-900">{s.title}</h2>
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{s.venue}, {s.city}</span>
                    <span className="inline-flex items-center gap-1.5"><Users size={14} />{s.people}</span>
                  </p>
                </div>

                <a
                  href={`https://wa.me/${s.contact.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Message the organizer of ${s.title} on WhatsApp`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-bold text-white transition-colors hover:bg-violet-700 focus-visible:ring-2 focus-visible:ring-violet-300"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-zinc-300 bg-white py-14 text-center text-sm text-zinc-500">
            No sessions for this city and sport yet. Try another filter.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
