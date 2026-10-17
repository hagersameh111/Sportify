export default function Tabs({ tabs, value, onChange }) {
  return (
    <div role="tablist" className="mb-4 flex gap-1 rounded-card bg-subtle p-1">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id} role="tab" aria-selected={value === id} onClick={() => onChange(id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-control px-3 py-2.5 text-xs font-semibold transition ${
            value === id ? "bg-primary text-primary-fg" : "text-muted hover:text-ink"
          }`}
        >
          {Icon && <Icon size={14} />} {label}
        </button>
      ))}
    </div>
  );
}
