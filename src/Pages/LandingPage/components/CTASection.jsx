import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 md:py-24 text-center px-5">
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl mx-auto">
        READY TO <span className="text-violet-650">UNLEASH</span> YOUR{' '}
        <span className="text-violet-650">POTENTIAL</span>?
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <a
          href="#join"
          className="bg-brand-gradient text-white text-sm font-bold tracking-wide px-7 py-3.5 rounded-md hover:opacity-90 transition-opacity"
        >
          CREATE ACCOUNT NOW
        </a>
        <a
          href="#activities"
          className="inline-flex items-center gap-2 bg-surface-dark text-white text-sm font-bold tracking-wide px-7 py-3.5 rounded-md hover:bg-black transition-colors"
        >
          EXPLORE ALL ACTIVITIES <ArrowRight size={16} />
        </a>
      </div>
    </section>
  )
}
