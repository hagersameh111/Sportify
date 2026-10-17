export default function Card({ className = "", ...p }) {
  return <div className={`rounded-card border border-line bg-surface p-6 shadow-sm ${className}`} {...p} />;
}
