import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react'

const columns = [
  {
    title: 'DISCOVER',
    links: ['Find Teams', 'Upcoming Events', 'Marketplace', 'Leaderboards'],
  },
  {
    title: 'SUPPORT',
    links: ['Newsletter Signup', 'Community Guidelines', 'Privacy Policy', 'Support Center'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <p className="font-display text-lg">
            SP<span className="text-violet-650">●</span>RTIFY
          </p>
          <p className="text-white/50 text-sm mt-4 leading-relaxed">
            The digital heartbeat of the global sports community. Join the movement and push
            your limits.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <Twitter size={16} className="text-white/60 hover:text-white transition-colors" />
            <Instagram size={16} className="text-white/60 hover:text-white transition-colors" />
            <Facebook size={16} className="text-white/60 hover:text-white transition-colors" />
            <Youtube size={16} className="text-white/60 hover:text-white transition-colors" />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-bold tracking-widest text-white/40 font-mono mb-4">
              {col.title}
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-xs font-bold tracking-widest text-white/40 font-mono mb-4">
            STAY TUNED
          </h4>
          <p className="text-sm text-white/70 mb-4">
            Get the latest event drops and team updates.
          </p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="bg-white/5 border border-white/10 rounded-l-md px-3 py-2.5 text-sm text-white placeholder:text-white/40 w-full focus:outline-none focus:border-violet-650"
            />
            <button
              type="submit"
              className="bg-magenta text-white text-xs font-bold px-5 rounded-r-md hover:bg-violet-650 transition-colors"
            >
              GO
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-14 pt-6 border-t border-white/10 text-center text-xs text-white/40">
        © 2026 Sportify Sports Community. All rights reserved.
      </div>
    </footer>
  )
}
