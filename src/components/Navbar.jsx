import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from "react-router-dom"

const links = [
  { label: "HOME", href: "/" },
  { label: "EVENTS", href: "/events" },
  { label: "TEAMS", href: "/teams" },
  { label: "Find A Game", href: "/games" },
  { label: "COMMUNITY", href: "/#community" },
  { label: "STORE", href: "/store" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  const isActive = (href) => {
    const [path, anchor] = href.split("#")
    if (anchor) return pathname === "/" && hash === `#${anchor}`
    if (path === "/") return pathname === "/" && !hash
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-black/5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-20">
        <Link to="/" className="font-display italic font-extrabold text-2xl tracking-tight text-violet-600 flex items-center">
          <img src="/sportifynavlogo.svg" alt="Sportify Logo" />
        </Link>

        <ul className="hidden lg:flex items-center gap-2 text-sm font-bold tracking-wider">
          {links.map((link) => {
            const active = isActive(link.href)
            return (
              <li key={link.label}>
                <Link
                  to={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-[29px] w-[107px] items-center justify-center whitespace-nowrap border-b-2 transition-colors ${
                    active
                      ? 'border-[#6125EB] text-[#6125EB]'
                      : 'border-transparent text-zinc-600 hover:text-[#6125EB]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/signin" className="text-sm font-bold text-zinc-800 hover:text-violet-600 transition-colors">
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold tracking-wider px-6 py-3 rounded-lg shadow-sm transition-all"
          >
            JOIN NOW
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-zinc-800"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-black/5 bg-white px-5 py-4 space-y-4 shadow-lg">
          <ul className="flex flex-col gap-3 text-sm font-bold">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`inline-block border-b-2 ${
                    isActive(link.href)
                      ? 'border-[#6125EB] text-[#6125EB]'
                      : 'border-transparent text-zinc-600'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pt-2 border-t border-zinc-100">
            <Link to="/signin" className="text-sm font-bold text-zinc-800">
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-violet-600 text-white text-sm font-bold tracking-wider px-5 py-2.5 rounded-lg"
            >
              JOIN NOW
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}