export default function ProgressBar({ value, max, className = "" }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={`h-1 w-20 overflow-hidden rounded-full bg-subtle ${className}`}>
      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
    </div>
  );
}
