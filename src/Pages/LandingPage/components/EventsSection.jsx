import { MapPin, Users, Activity, CircleDot, Bike } from 'lucide-react'
import { upcomingEvents } from '../../../data/events'

const categoryIcon = {
  RUNNING: Activity,
  PADEL: CircleDot,
  CYCLING: Bike,
}

function EventCard({ event }) {
  const Icon = categoryIcon[event.category] ?? Activity

  return (
    <article className="bg-white rounded-sm overflow-hidden border border-black/5 hover:shadow-lg transition-shadow">
      <div className="relative h-44">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        <span className="absolute top-3 right-3 bg-magenta text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide">
          {event.date}
        </span>
      </div>

      <div className="p-5">
        <p className="flex items-center gap-1 text-[11px] font-bold tracking-wide text-violet-650">
          <MapPin size={12} /> {event.location}
        </p>
        <h3 className="font-display text-lg mt-2">{event.title}</h3>
        <p className="text-sm text-surface-dark/60 mt-2 leading-relaxed">{event.description}</p>

        <p className="flex items-center gap-1.5 text-xs font-bold text-violet-650 mt-4">
          <Icon size={14} /> {event.category}
        </p>

        <div className="flex items-center justify-between border-t border-black/5 mt-4 pt-4">
          <span className="flex items-center gap-1.5 text-xs text-surface-dark/50 font-medium">
            <Users size={14} /> {event.stat}
          </span>
          <a
            href="#register"
            className="text-xs font-bold tracking-wide text-magenta hover:text-violet-650 transition-colors"
          >
            REGISTER NOW
          </a>
        </div>
      </div>
    </article>
  )
}

export default function EventsSection() {
  return (
    <section id="events" className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <p className="eyebrow text-[#0041C8]">Events</p>
          <h2 className="font-display text-3xl md:text-4xl mt-2">
            UPCOMING <span className="bg-gradient-to-r from-[#5c47e8]  via-[#5c25dc] to-[#C737E4] bg-clip-text text-transparent">EVENTS</span>
          </h2>
          <p className="text-surface-dark/60 mt-2 italic">
            Challenge yourself in our premier endurance events.
          </p>
        </div>
        <a href="#all-events" className="explore-link shrink-0">
          Explore More
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
