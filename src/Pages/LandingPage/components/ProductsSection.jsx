import { ShoppingBag } from 'lucide-react';

const products = [
  { name: 'Sportify Performance Tee', type: 'Training gear', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80' },
  { name: 'Everyday Training Shoes', type: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80' },
  { name: 'Athlete Bottle', type: 'Accessories', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80' },
  { name: 'Running Essentials', type: 'Collection', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80' },
];

export function AdSlot({ children }) {
  return (
    <section aria-label="Advertisement" className="mx-auto max-w-7xl px-5 py-4 md:px-8">
      <div className="flex min-h-[90px] items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50">
        {children || <p className="text-xs font-semibold text-zinc-400">Advertisement &middot; 728 &times; 90</p>}
      </div>
    </section>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-5 pb-6 pt-8 md:px-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          
          <h2 className="font-display text-3xl md:text-4xl mt-2">
           <span className="bg-gradient-to-r from-[#5c47e8]  via-[#5c25dc] to-[#C737E4] bg-clip-text text-transparent">PRODUCTS</span>
          </h2>
         
        </div>
        <a href="#products" className="text-sm font-bold text-violet-700 hover:underline">Shop all</a>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <a key={p.name} href="#products" className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white focus-visible:ring-2 focus-visible:ring-violet-400">
            <div className="aspect-square overflow-hidden bg-zinc-100">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-3.5">
              <p className="text-xs font-semibold text-violet-700">{p.type}</p>
              <h3 className="mt-0.5 line-clamp-1 font-bold text-zinc-900">{p.name}</h3>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 group-hover:text-violet-700">
                <ShoppingBag size={14} /> View product
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
