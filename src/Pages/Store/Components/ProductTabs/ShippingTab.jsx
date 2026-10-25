
import { Truck, PackageCheck } from "lucide-react";

export default function ShippingTab() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">Shipping Information</h2>

      <p className="text-sm leading-7 text-zinc-600">
        Orders are processed within 1–2 business days. Delivery times
        depend on your location. Tracking information can be provided
        once your order has shipped.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl bg-[#F5F4FA] p-4">
          <Truck size={22} className="shrink-0 text-[#5C47E8]" />
          <div>
            <h3 className="text-sm font-bold">Delivery</h3>
            <p className="mt-1 text-sm leading-6 text-zinc-500">
              Delivery times vary depending on your location.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-[#F5F4FA] p-4">
          <PackageCheck size={22} className="shrink-0 text-[#5C47E8]" />
          <div>
            <h3 className="text-sm font-bold">Order tracking</h3>
            <p className="mt-1 text-sm leading-6 text-zinc-500">
              Check your order confirmation for shipping updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
