
import { useMemo, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ehab Hamed",
    date: "08 Dec, 2024",
    rating: 5,
    text: "I've tried many running shirts before, but this one is by far the most comfortable. The fabric is lightweight, breathable, and keeps me dry during long runs. The fit is perfect, and the quality still looks great after several washes.",
  },
  {
    id: 2,
    name: "Ahmed Mohamed",
    date: "12 Dec, 2024",
    rating: 5,
    text: "Excellent quality and very comfortable during training. The fit is great and the material feels lightweight. Definitely recommended for runners.",
  },
  {
    id: 3,
    name: "Sara Ali",
    date: "15 Dec, 2024",
    rating: 4,
    text: "Great design and comfortable material. I really like the colors and the overall quality of the product.",
  },
];

const filters = [
  { label: "All", value: "All" },
  { label: "5 stars", value: "5" },
  { label: "4 stars", value: "4" },
];

export default function ReviewsTab() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 3;

  const filteredReviews = useMemo(() => {
    if (filter === "All") return reviews;

    return reviews.filter(
      (review) => review.rating === Number(filter)
    );
  }, [filter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReviews.length / perPage)
  );

  const visibleReviews = filteredReviews.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const changeFilter = (value) => {
    setFilter(value);
    setPage(1);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Customer Reviews</h2>
        <span className="text-sm text-zinc-500">
          {filteredReviews.length} reviews shown
        </span>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => changeFilter(item.value)}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              filter === item.value
                ? "border-[#5C47E8] bg-violet-50 text-[#5C47E8]"
                : "border-zinc-200 text-zinc-500 hover:border-violet-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <article
            key={review.id}
            className="rounded-xl border border-zinc-100 bg-white p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold">{review.name}</h3>
                <p className="mt-1 text-xs text-zinc-400">
                  {review.date}
                </p>
              </div>

              <div
                className="flex shrink-0 text-amber-400"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: review.rating }, (_, index) => (
                  <Star
                    key={index}
                    size={14}
                    className="fill-current"
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-600">
              {review.text}
            </p>
          </article>
        ))}

        {visibleReviews.length === 0 && (
          <p className="rounded-xl bg-[#F5F4FA] p-6 text-center text-sm text-zinc-500">
            No reviews match this filter.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            aria-label="Previous page"
            className="rounded-lg border border-zinc-200 p-2 disabled:opacity-40"
          >
            <ChevronLeft size={17} />
          </button>

          <span className="text-sm text-zinc-500">
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((current) => current + 1)}
            aria-label="Next page"
            className="rounded-lg border border-zinc-200 p-2 disabled:opacity-40"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
