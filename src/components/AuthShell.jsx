import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const inputClass =
  'h-12 w-full rounded-lg border border-zinc-300 px-4 outline-none transition-colors focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200';

export default function AuthShell({ image, heading, blurb, title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">
        <div className="relative hidden min-h-[580px] lg:block">
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 to-fuchsia-700/60" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
            <Link to="/" className="text-lg font-black italic uppercase tracking-wide">Sportify</Link>
            <div>
              <h2 className="whitespace-pre-line text-4xl font-black italic uppercase leading-[1.05]">{heading}</h2>
              <p className="mt-4 max-w-sm text-sm text-white/80">{blurb}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <Link to="/" className="mb-6 inline-flex w-fit items-center gap-1.5 text-sm text-zinc-500 hover:text-violet-700">
            <ArrowLeft size={15} /> Back to home
          </Link>
          <h1 className="text-3xl font-black">{title}</h1>
          <p className="mb-7 mt-1.5 text-sm text-zinc-500">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
