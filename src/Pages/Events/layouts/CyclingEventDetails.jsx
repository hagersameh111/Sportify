export default function CyclingEventDetails({ event }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-violet-600">
            {event.category}
          </p>

          <h1 className="text-6xl font-black italic mt-4">
            {event.title}
          </h1>
        </div>

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-[600px] object-cover rounded-3xl"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="font-black text-4xl">
              {event.stat}
            </h3>
            <p>Participants</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="font-black text-4xl">
              {event.location}
            </h3>
            <p>Location</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="font-black text-4xl">
              ${event.price}
            </h3>
            <p>Entry Fee</p>
          </div>

        </div>

      </section>
    </div>
  );
}