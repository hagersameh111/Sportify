import { Star } from "lucide-react";

export default function Stars({ value = 0, size = 12, className = "" }) {
  return (
    <span className={`inline-flex gap-0.5 text-accent ${className}`} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(value) ? "fill-current" : "fill-current opacity-30"} />
      ))}
    </span>
  );
}
