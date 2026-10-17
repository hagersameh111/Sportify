const tones = {
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  neutral: "bg-subtle text-muted",
};
export const statusTone = { upcoming: "info", ongoing: "warning", completed: "success", cancelled: "danger" };

export default function Badge({ tone = "neutral", className = "", children }) {
  return <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${tones[tone]} ${className}`}>{children}</span>;
}
