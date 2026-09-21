export default function PadelEventDetails({ event }) {
  return (
    <div className="min-h-screen bg-white">

      <div
        className="h-[500px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto h-full flex items-end px-6 pb-16">
          <div>
            <p className="text-fuchsia-400 uppercase">
              {event.category}
            </p>

            <h1 className="text-white text-6xl font-black italic">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-4">
              Tournament Overview
            </h2>

            <p className="text-zinc-600 leading-8">
              {event.description}
            </p>
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-8">
            <h3 className="text-5xl font-black mb-6">
              ${event.price}
            </h3>

            <button className="w-full h-14 bg-fuchsia-600 rounded-xl font-bold">
              JOIN TOURNAMENT
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}