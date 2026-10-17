export default function Toggle({ checked, onChange, label, hint, icon }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-control bg-subtle px-4 py-3">
      <span className="flex items-center gap-3">
        {icon}
        <span>
          <span className="block text-sm font-semibold">{label}</span>
          {hint && <span className="block text-xs text-muted">{hint}</span>}
        </span>
      </span>
      <input type="checkbox" role="switch" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="relative h-6 w-11 shrink-0 rounded-full bg-line transition peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-accent after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-surface after:shadow after:transition peer-checked:after:translate-x-5" />
    </label>
  );
}
