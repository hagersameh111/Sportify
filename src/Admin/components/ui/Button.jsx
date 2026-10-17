const variants = {
  primary: "bg-dark text-dark-fg hover:opacity-85",
  accent: "bg-brand-gradient text-primary-fg hover:opacity-90",
  outline: "border border-line bg-surface text-ink hover:bg-subtle",
  ghost: "text-muted hover:text-ink",
  danger: "text-danger hover:bg-danger-soft",
};
const sizes = { sm: "px-3 py-1.5 text-[11px]", md: "px-5 py-2.5 text-xs", lg: "px-6 py-3.5 text-xs" };

export default function Button({ variant = "primary", size = "md", className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-control font-bold uppercase tracking-[0.12em] transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
