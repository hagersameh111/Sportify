import { Link } from "react-router-dom";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";

export default function WishlistEmptyState() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-14 text-center sm:py-16">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100">
        <Heart size={34} className="text-[#5C25DC]" />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-[#222062]">
        Your wishlist is empty
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
        Save products you love by tapping the heart icon, and they’ll appear
        here whenever you return.
      </p>

      <Link
        to="/store"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5C47E8] to-[#5C25DC] px-6 py-3 font-bold text-white transition hover:opacity-90"
      >
        <ShoppingBag size={17} />
        Explore the Store
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}