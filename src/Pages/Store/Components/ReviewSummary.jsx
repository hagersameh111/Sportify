
import { Star, ArrowRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ehab Hamed",
    date: "08 Dec, 2024",
    rating: 5,
    text: "Great team spirit and friendly members. The product is comfortable and perfect for training.",
  },
  {
    id: 2,
    name: "Ahmed Mohamed",
    date: "12 Dec, 2024",
    rating: 5,
    text: "Excellent quality and very comfortable during training. The fit is great and the material feels lightweight.",
  },
  {
    id: 3,
    name: "Sara Ali",
    date: "15 Dec, 2024",
    rating: 4,
    text: "Great design and comfortable material. I really like the colors and overall quality.",
  },
];

const distribution = [
  { stars: 5, count: 88 },
  { stars: 4, count: 12 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

export default function ReviewSummary({ onViewAll }) {
  return (
    <aside className="rounded-xl bg-[#F5F4FA] p-5 lg:sticky lg:top-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-extrabold">Reviews</h2>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#5C47E8] hover:underline"
        >
          View all
        </button>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#222062] text-white">
          <Star size={22} className="fill-amber-300 text-amber-300" />
        </div>

        <div>
          <p className="text-2xl font-extrabold">4.9/5</p>
          <p className="text-xs text-zinc-500">Based on 100 reviews</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {distribution.map(({ stars, count }) => (
          <div key={stars} className="flex items-center gap-2 text-xs">
            <span className="w-3 text-zinc-500">{stars}</span>

            <Star
              size={12}
              className="fill-amber-400 text-amber-400"
            />

            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[#5C47E8]"
                style={{ width: `${count}%` }}
              />
            </div>

            <span className="w-6 text-right text-zinc-400">{count}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-zinc-200 pt-4">
        <h3 className="text-sm font-bold">Recent reviews</h3>

        {reviews.map((review) => (
          <article
            key={review.id}
            className="border-b border-zinc-200 py-4 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{review.name}</p>

              <div
                className="flex shrink-0 text-amber-400"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: review.rating }, (_, index) => (
                  <Star
                    key={index}
                    size={11}
                    className="fill-current"
                  />
                ))}
              </div>
            </div>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              {review.text.length > 100
                ? `${review.text.slice(0, 100)}...`
                : review.text}
            </p>

            <p className="mt-2 text-[10px] text-zinc-400">
              {review.date}
            </p>
          </article>
        ))}

        <button
          type="button"
          onClick={onViewAll}
          className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#5C47E8] hover:text-[#C737E4]"
        >
          View all reviews <ArrowRight size={15} />
        </button>
      </div>
    </aside>
  );
}
