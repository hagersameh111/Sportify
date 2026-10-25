
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ProductBreadcrumb() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-5 pt-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs sm:text-sm"
      >
        <Link
          to="/"
          className="text-zinc-400 transition hover:text-[#5C47E8]"
        >
          Home
        </Link>

        <ChevronRight size={14} className="text-[#C737E4]" />

        <Link
          to="/store"
          className="text-zinc-400 transition hover:text-[#5C47E8]"
        >
          Store
        </Link>

        <ChevronRight size={14} className="text-[#C737E4]" />

        <span className="font-bold text-[#181329]">
          Product Details
        </span>
      </nav>
    </div>
  );
}
