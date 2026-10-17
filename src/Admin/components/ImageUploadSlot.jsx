import { ImagePlus } from "lucide-react";
import { useRef } from "react";

/** Single image slot. `dashed` = wizard style, otherwise subtle filled tile. */
export default function ImageUploadSlot({ value, onChange, label, dashed, className = "" }) {
  const ref = useRef(null);
  const pick = (e) => {
    const f = e.target.files?.[0];
    if (f) onChange?.(f, URL.createObjectURL(f));
  };
  return (
    <button
      type="button"
      onClick={() => ref.current?.click()}
      className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-card text-sm text-muted transition hover:text-ink ${
        dashed ? "border border-dashed border-line bg-surface" : "bg-subtle"
      } ${className}`}
    >
      {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : (<><ImagePlus className="text-primary" size={20} />{label}</>)}
      <input ref={ref} type="file" accept="image/png,image/jpeg" hidden onChange={pick} />
    </button>
  );
}
