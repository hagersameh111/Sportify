export default function Hero() {
  return (
    <section id="home" className="relative h-[200px] overflow-hidden md:h-[50vh] lg:h-[60vh]">
      <img
        src="https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1600&q=80"
        alt="Athletes running, cycling and playing basketball"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-purple-950/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-5 text-center md:px-8">
        <h1 className="max-w-4xl text-2xl font-extrabold uppercase italic tracking-wide text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Discover teams, events &amp; communities around you
        </h1>
      </div>
    </section>
  );
}
