
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StorePagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Product pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="rounded-lg border border-zinc-200 bg-white p-2.5 text-[#222062] transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`min-w-10 rounded-lg px-3 py-2.5 text-sm font-bold transition ${
            currentPage === page
              ? "bg-[#5C47E8] text-white"
              : "bg-white text-zinc-700 hover:bg-violet-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="rounded-lg bg-[#222062] p-2.5 text-white transition hover:bg-[#17132D] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
