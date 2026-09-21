import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from "react-router-dom"

const links = [
  { label: "HOME", href: "/" },
  { label: "EVENTS", href: "/events" },
  { label: "TEAMS", href: "/teams" },
  { label: "TRAINING", href: "/#training" },
  { label: "COMMUNITY", href: "/#community" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-black/5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-20">
        <a href="#home" className="font-display italic font-extrabold text-2xl tracking-tight text-violet-600 flex items-center">
          SP<span className="inline-flex items-center justify-center text-violet-600 mx-0.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" className="text-violet-500" fill="currentColor" />
              <path d="M12 2a10 10 0 0 1 7.07 17.07l-7.07-7.07V2z" fill="#fff" opacity="0.4" />
              <path d="M12 12l-5 5a10 10 0 0 1 0-10l5 5z" fill="#fff" opacity="0.4" />
            </svg>
          </span>RTIFY
        </a>

        <ul className="hidden md:flex items-center gap-10 text-sm font-bold tracking-wider">
          {links.map((link) => (
            <li key={link.label} className="relative h-20 flex items-center">
              <a
                href={link.href}
                className={
                  link.active
                    ? 'text-violet-600 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-violet-600'
                    : 'text-zinc-600 hover:text-violet-600 transition-colors'
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-8">
          <a href="#login" className="text-sm font-bold text-zinc-800 hover:text-violet-600 transition-colors">
            Log In
          </a>
          <a
            href="/register"
            className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold tracking-wider px-6 py-3 rounded-lg shadow-sm transition-all"
          >
            JOIN NOW
          </a>
        </div>

        <button
          className="md:hidden p-2 text-zinc-800"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-white px-5 py-4 space-y-4 shadow-lg">
          <ul className="flex flex-col gap-3 text-sm font-bold">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={link.active ? 'text-violet-600' : 'text-zinc-600'}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pt-2 border-t border-zinc-100">
            <a href="#login" className="text-sm font-bold text-zinc-800">
              Log In
            </a>
            <a
              href="#join"
              className="bg-violet-600 text-white text-sm font-bold tracking-wider px-5 py-2.5 rounded-lg"
            >
              JOIN NOW
            </a>
          </div>
        </div>
      )}
    </header>
  )
}