export default function MarathonEventDetails({ event }) {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-[1.5fr_420px] gap-10">

          <div>
            <img
              src={event.gallery[0]}
              alt={event.title}
              className="w-full h-[500px] object-cover rounded-3xl"
            />

            <div className="grid grid-cols-4 gap-4 mt-4">
              {event.gallery.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="h-28 w-full object-cover rounded-xl"
                />
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-black text-3xl uppercase mb-4">
                About Event
              </h2>

              <p className="text-zinc-600 leading-8">
                {event.description}
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-28">
              <h3 className="text-6xl font-black text-violet-600">
                ${event.price}
              </h3>

              <button className="w-full mt-8 h-14 bg-violet-600 text-white rounded-xl font-bold">
                REGISTER NOW
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}