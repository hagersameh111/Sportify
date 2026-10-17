const control =
  "w-full rounded-control border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-placeholder focus:border-primary focus:outline-none";

export function Field({ label, required, hint, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-1.5 block text-xs font-medium text-ink">
          {label} {required && <span className="text-accent">*</span>}
        </span>
      )}
      {children}
      {hint && <span className="mt-1 block text-[11px] text-muted">{hint}</span>}
    </label>
  );
}

export const Input = ({ className = "", ...p }) => <input className={`${control} ${className}`} {...p} />;
export const Textarea = ({ className = "", ...p }) => <textarea rows={4} className={`${control} ${className}`} {...p} />;
export const Select = ({ options = [], placeholder, className = "", ...p }) => (
  <select className={`${control} ${className}`} {...p}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((o) => <option key={o} value={o}>{o}</option>)}
  </select>
);
