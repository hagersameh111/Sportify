export default function Hero() {
  return (
    <section id="home" className="relative h-[420px] md:h-[520px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1600&q=80"
        alt="Athletes running, cycling and playing basketball"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-purple-950/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full max-w-7xl mx-auto flex items-center justify-center text-center px-5 md:px-8">
        <h1 className="font-display italic font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide max-w-4xl uppercase">
          DISCOVER TEAMS , EVENTS &amp; COMMUNITIES AROUND YOU
        </h1>
      </div>
    </section>
  )
}