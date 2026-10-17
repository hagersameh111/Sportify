import { X } from "lucide-react";

export default function Modal({ title, onClose, width = "max-w-3xl", children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/50 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={`max-h-[90vh] w-full ${width} overflow-y-auto rounded-card bg-surface shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-semibold text-ink">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="text-muted hover:text-ink"><X size={18} /></button>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
