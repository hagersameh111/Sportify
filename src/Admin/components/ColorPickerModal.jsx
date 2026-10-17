import { useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { Input } from "./ui/Field";
import { themeColor } from "../utils/themeColor";

const isHex = (h) => /^#[0-9a-f]{6}$/i.test(h);
const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a / 100})`;
};
const css = ({ hex, alpha }) => rgba(isHex(hex) ? hex : themeColor("primary"), Math.min(100, Math.max(0, Number(alpha) || 0)));

function Stop({ stop, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <input type="color" aria-label="Pick color" value={isHex(stop.hex) ? stop.hex : themeColor("primary")}
        onChange={(e) => onChange({ ...stop, hex: e.target.value })} className="h-10 w-10 cursor-pointer rounded-control border border-line bg-surface p-0.5" />
      <Input value={stop.hex} onChange={(e) => onChange({ ...stop, hex: e.target.value })} className="flex-1 uppercase" />
      <Input type="number" min={0} max={100} value={stop.alpha} onChange={(e) => onChange({ ...stop, alpha: e.target.value })} className="w-20" aria-label="Opacity %" />
      <span className="text-xs text-muted">%</span>
    </div>
  );
}

export default function ColorPickerModal({ onClose, onConfirm }) {
  const [mode, setMode] = useState("solid");
  const [a, setA] = useState({ hex: themeColor("primary"), alpha: 100 });
  const [b, setB] = useState({ hex: themeColor("tertiary"), alpha: 100 });
  const value = mode === "solid" ? css(a) : `linear-gradient(135deg, ${css(a)}, ${css(b)})`;

  return (
    <Modal title="Custom Color" onClose={onClose} width="max-w-sm">
      <div className="mb-4 flex gap-2">
        {["solid", "gradient"].map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-control border px-4 py-2 text-xs font-semibold capitalize ${mode === m ? "border-primary text-primary" : "border-line text-muted"}`}>{m}</button>
        ))}
      </div>
      <div className="mb-4 h-32 rounded-card border border-line" style={{ background: value }} />
      <div className="space-y-3"><Stop stop={a} onChange={setA} />{mode === "gradient" && <Stop stop={b} onChange={setB} />}</div>
      <div className="mt-6 flex justify-end gap-3 border-t border-line pt-4">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="accent" onClick={() => onConfirm(value)}>Confirm</Button>
      </div>
    </Modal>
  );
}
