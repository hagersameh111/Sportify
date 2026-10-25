import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function CartEmptyState() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-zinc-50 px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100">
          <ShoppingBag size={34} className="text-[#5C25DC]" />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-[#222062]">
          Your cart is empty
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
          Looks like you haven’t added anything yet. Explore the store and find
          something you love.
        </p>

        <Link
          to="/store"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5C47E8] to-[#5C25DC] px-6 py-3 font-bold text-white transition hover:opacity-90"
        >
          Explore the Store
          <ArrowRight size={17} />
        </Link>
      </div>
    </main>
  );
}