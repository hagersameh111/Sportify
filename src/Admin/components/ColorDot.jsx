/** `color.value` is any CSS background (hex or gradient) — it's product data. */
export default function ColorDot({ color, size = 24, className = "" }) {
  return (
    <span title={color.name} className={`inline-block shrink-0 rounded-full border border-line ${className}`}
      style={{ width: size, height: size, background: color.value }} />
  );
}
