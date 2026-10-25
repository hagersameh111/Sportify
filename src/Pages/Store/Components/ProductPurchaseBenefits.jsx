
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

const benefits = [
  { label: "Reliable delivery", Icon: Truck },
  { label: "Secure checkout", Icon: ShieldCheck },
  { label: "Easy returns", Icon: RotateCcw },
];

export default function ProductPurchaseBenefits() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 border-t border-zinc-200 pt-5 sm:grid-cols-3">
      {benefits.map(({ label, Icon }) => (
        <div
          key={label}
          className="flex items-center gap-2 text-xs text-zinc-600"
        >
          <Icon size={18} className="shrink-0 text-[#5C47E8]" />
          {label}
        </div>
      ))}
    </div>
  );
}
