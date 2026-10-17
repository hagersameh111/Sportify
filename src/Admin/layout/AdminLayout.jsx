import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutGrid, CalendarDays, ShoppingBag, BookOpen, Image, Award, Users, Search, Bell, Eye } from "lucide-react";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/marketplace", label: "Marketplace", icon: ShoppingBag },
  { to: "/admin/training", label: "Training Schedule", icon: BookOpen },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/athletes", label: "Top Athletes", icon: Award },
  { to: "/admin/members", label: "Members", icon: Users, badge: 1 },
];

function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col bg-primary text-primary-fg">
      <div className="border-b border-dark-fg/10 px-5 py-6">
        <img src="/logo-light.png" alt="ADRT" className="h-8" />
        <p className="mt-1 text-[10px] tracking-widest text-dark-fg/60">ADMIN PLATFORM</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {nav.map(({ to, label, icon: Icon, end, badge }) => (
          <NavLink
            key={to} to={to} end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-control px-3 py-2.5 text-sm transition ${
                isActive ? "bg-primary text-primary-fg" : "text-dark-fg/80 hover:bg-dark-fg/10"
              }`}
          >
            <Icon size={18} /> <span className="flex-1">{label}</span>
            {badge && <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-fg">{badge}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center gap-3 border-t border-dark-fg/10 p-5">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-xs font-bold text-accent-fg">AD</div>
        <div className="text-xs"><p className="font-semibold">Admin</p><p className="text-dark-fg/60">ADRT Platform</p></div>
      </div>
    </aside>
  );
}

function Topbar() {
  const now = new Date();
  return (
    <header className="flex items-center justify-between border-b border-line bg-surface px-8 py-4">
      <div>
        <p className="font-semibold">{now.toLocaleDateString("en-GB", { weekday: "long" })}</p>
        <p className="text-xs text-muted">{now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
      </div>
      <div className="flex w-64 items-center gap-2 rounded-control bg-subtle px-3 py-2.5 text-sm text-placeholder">
        <Search size={16} /><input placeholder="Search" className="w-full bg-transparent outline-none placeholder:text-placeholder" />
      </div>
      <div className="flex items-center gap-6">
        <button aria-label="Notifications" className="rounded-control bg-subtle p-2.5 text-primary"><Bell size={16} /></button>
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold text-accent"><Eye size={14} /> View Public Site</Link>
      </div>
    </header>
  );
}

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-canvas font-sans text-ink">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />
        <main className="p-8"><Outlet /></main>
      </div>
    </div>
  );
}
