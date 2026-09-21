import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Check,
  Minus,
  Plus,
} from "lucide-react";

import { upcomingEvents } from "../../data/events";

const categoryRatings = [
  { name: "Race Course & Route", desc: "Scenic quality, safety, and elevation.", score: 4.8 },
  { name: "Organizing Company", desc: "Overall event management.", score: 2.4, warning: true },
  { name: "Event Timing & Schedule", desc: "Punctuality of the start and events.", score: 3.8 },
  { name: "Water Stations & Temperature", desc: "Availability and quality of hydration.", score: 2.1, warning: true },
  { name: "Restroom Facilities", desc: "Cleanliness and availability.", score: 1.8, warning: true },
  { name: "Medical & First Aid Support", desc: "Presence and response of medical staff.", score: 4.0 },
  { name: "Post-Race Food & Nutrition", desc: "Quality and variety of recovery food.", score: 4.6 },
  { name: "Finisher Medal & Goodies", desc: "Design and quality of the medal and swag.", score: 4.5 },
  { name: "Bag Check Service", desc: "Efficiency and security of bag drop.", score: 3.5 },
  { name: "Crowd & Spectator Support", desc: "Energy and encouragement from the crowd.", score: 4.8 },
  { name: "Parking & Transport Access", desc: "Ease of access and parking availability.", score: 1.5, warning: true },
  { name: "Race Photography", desc: "Coverage and quality of official photos.", score: 3.9 },
];

const filters = [
  "All (312)", "High Ratings", "Race Route", "Organizing Company",
  "Event Timing", "Water Temperature", "Restroom Facilities", "Medical Support",
  "Food & Nutrition", "Finisher Medal", "Bag Storage", "Crowd Support",
  "Parking & Transport", "Race Photography"
];

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  
  const tabs = [
    { id: "details", label: "Details" },
    { id: "races", label: "Races" },
    { id: "tickets", label: "Tickets Types" },
    { id: "map", label: "Map" },
    { id: "teams", label: "Participating Teams" },
    { id: "rating", label: "Rating" },
  ];

  const event = upcomingEvents.find((item) => item.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(event?.gallery?.[0]);
  const [qty, setQty] = useState(1);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Event Not Found
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <button
          onClick={() => window.history.back()}
          className="mb-8 text-sm font-bold text-zinc-500 hover:text-zinc-800 tracking-wide flex items-center gap-2"
        >
          &lt; BACK
        </button>

        <div className="grid lg:grid-cols-[1.5fr_400px] gap-12">
          {/* Left Column: Media & Tabs */}
          <div>
            <div className="mb-8">
              <img
                src={selectedImage}
                alt={event.title}
                className="w-full h-[480px] rounded-2xl object-cover mb-4"
              />
              <div className="grid grid-cols-4 gap-4">
                {event.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className="relative w-full h-24 rounded-xl overflow-hidden focus:outline-none"
                  >
                    <img
                      src={img}
                      alt=""
                      className={`w-full h-full object-cover transition-all border-2 ${
                        selectedImage === img
                          ? "border-violet-500 opacity-100"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-8 text-sm border-b border-zinc-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-semibold pb-4 -mb-[1px] transition-colors ${
                    activeTab === tab.id
                      ? "text-violet-600 border-b-2 border-violet-600"
                      : "text-zinc-500 hover:text-violet-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === "details" && (
              <section className="py-8">
                <h3 className="uppercase text-xs tracking-widest font-bold text-violet-600 mb-4">
                  About The Event
                </h3>
                <p className="text-zinc-600 leading-relaxed mb-10">
                  Experience the thrill of running through Berlin's iconic streets after dark. 
                  The Midnight City Run takes you past Brandenburg Gate, along the Spree riverbank, 
                  and through the neon-lit Mitte district. Whether you're chasing a personal best or 
                  soaking up the atmosphere, this night run delivers an unforgettable 10K.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase mb-1">City</p>
                    <p className="font-semibold text-sm">{event.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase mb-1">Date</p>
                    <p className="font-semibold text-sm">{event.eventDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase mb-1">Address</p>
                    <p className="font-semibold text-sm">{event.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase mb-1">Time</p>
                    <p className="font-semibold text-sm">{event.time}</p>
                  </div>
                </div>

                <h3 className="uppercase text-xs tracking-widest font-bold text-violet-600 mb-4">
                  What's Included
                </h3>
                <div className="grid md:grid-cols-2 gap-y-4 mb-10">
                  {event.included.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-zinc-700">
                      <Check size={18} className="text-violet-600" />
                      {item}
                    </div>
                  ))}
                </div>

                <h3 className="uppercase text-xs tracking-widest font-bold text-violet-600 mb-4">
                  Refund Policy
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Sportify guarantees your right to cancel and receive a refund (subject to applicable fees) 
                  for paid events within specified time limits.
                </p>
              </section>
            )}

            {/* Races Tab */}
            {activeTab === "races" && (
              <div className="py-8 space-y-4">
                {event.races?.map((race, index) => (
                  <div key={index} className="border border-zinc-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold">{race.name || race.distance}</h4>
                    <p className="text-zinc-500 mt-1 text-sm">{race.start || "Sat 22 Nov, 03:30 pm"}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tickets Types Tab */}
            {activeTab === "tickets" && (
              <div className="py-8 space-y-6">
                {event.ticketTypes.map((ticket, index) => (
                  <div key={ticket.id} className="border border-zinc-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold mb-4">{ticket.name}</h4>
                    <p className="font-semibold text-sm mb-3">Includes:</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-zinc-700">
                        <Check size={16} className="mt-0.5 text-violet-600" /> Race Number with Tracking chip
                      </li>
                      {index === 0 && (
                        <>
                          <li className="flex items-start gap-2 text-sm text-zinc-700">
                            <Check size={16} className="mt-0.5 text-violet-600" /> Race T-shirt
                          </li>
                          <li className="flex items-start gap-2 text-sm text-zinc-700">
                            <Check size={16} className="mt-0.5 text-violet-600" /> Race Bag
                          </li>
                          <li className="flex items-start gap-2 text-sm text-zinc-700">
                            <Check size={16} className="mt-0.5 text-violet-600" /> Medal Charm
                          </li>
                        </>
                      )}
                      <li className="flex items-start gap-2 text-sm text-zinc-700">
                        <Check size={16} className="mt-0.5 text-violet-600" /> Finisher Medal
                      </li>
                      <li className="flex items-start gap-2 text-sm text-zinc-700">
                        <Check size={16} className="mt-0.5 text-violet-600" /> Post Race Bedouin Breakfast
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Map Tab */}
            {activeTab === "map" && (
              <div className="py-8">
                <iframe
                  src={event.mapEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11612.443153549219!2d54.3773!3d24.4539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI3JzE0LjAiTiA1NMKwMjInMzguMyJF!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae"}
                  title="map"
                  className="w-full h-[450px] rounded-2xl border-0 bg-zinc-100"
                  loading="lazy"
                />
              </div>
            )}

            {/* Teams Tab */}
            {activeTab === "teams" && (
              <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {["ADAT", "ADTHOT", "Attar", "ARTHOT"].map((team) => (
                  <div key={team} className="border border-zinc-200 rounded-xl aspect-[4/3] flex items-center justify-center font-bold text-lg text-zinc-800 bg-zinc-50">
                    {team}
                  </div>
                ))}
              </div>
            )}

            {/* Rating Tab */}
            {activeTab === "rating" && (
              <div className="py-8">
                {/* Rating Distribution Header[cite: 8] */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="font-bold text-lg mb-6">Rating Distribution</h3>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <span className="text-5xl font-black">{event.rating}</span>
                        <div className="flex items-center justify-center gap-1 text-violet-500 my-2">
                          <Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star size={14} />
                        </div>
                        <p className="text-xs text-zinc-500">{event.reviews} reviews</p>
                      </div>
                      <div className="flex-1 space-y-2 text-xs text-zinc-600 font-medium">
                        <div className="flex items-center gap-2"><span className="w-2">5</span><div className="flex-1 h-2 bg-zinc-100 rounded-full"><div className="w-[60%] h-full bg-violet-500 rounded-full"></div></div><span className="w-6 text-right">66</span></div>
                        <div className="flex items-center gap-2"><span className="w-2">4</span><div className="flex-1 h-2 bg-zinc-100 rounded-full"><div className="w-[80%] h-full bg-violet-500 rounded-full"></div></div><span className="w-6 text-right">107</span></div>
                        <div className="flex items-center gap-2"><span className="w-2">3</span><div className="flex-1 h-2 bg-zinc-100 rounded-full"><div className="w-[40%] h-full bg-violet-500 rounded-full"></div></div><span className="w-6 text-right">54</span></div>
                        <div className="flex items-center gap-2"><span className="w-2">2</span><div className="flex-1 h-2 bg-zinc-100 rounded-full"><div className="w-[15%] h-full bg-violet-500 rounded-full"></div></div><span className="w-6 text-right">12</span></div>
                        <div className="flex items-center gap-2"><span className="w-2">1</span><div className="flex-1 h-2 bg-zinc-100 rounded-full"><div className="w-[5%] h-full bg-violet-500 rounded-full"></div></div><span className="w-6 text-right">4</span></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-6 invisible">Notice Placeholder</h3>
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 h-full flex flex-col justify-center">
                      <h4 className="font-bold text-sm mb-2">Accountability Notice</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        These ratings are collected from verified participants of the 2025 edition. 
                        Organizers are expected to address low-scoring areas before launching a new edition. 
                        Ratings are public and permanent.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Category Ratings Grid[cite: 8] */}
                <div className="mb-12">
                  <h3 className="font-bold text-lg mb-6">Detailed Category Ratings</h3>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    {categoryRatings.map((cat, index) => (
                      <div key={index} className="border-b border-zinc-100 pb-4">
                        <div className="flex justify-between items-start mb-1">
                          <div className="pr-4">
                            <h4 className="font-bold text-sm mb-0.5 text-zinc-900">{cat.name}</h4>
                            <p className="text-xs text-zinc-500">{cat.desc}</p>
                          </div>
                          <div className="flex items-center gap-3 w-32 shrink-0 pt-1">
                            <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${cat.warning ? 'bg-red-500' : 'bg-green-500'}`} 
                                style={{width: `${(cat.score / 5) * 100}%`}}
                              ></div>
                            </div>
                            <span className="font-bold text-sm w-6 text-right text-zinc-700">{cat.score.toFixed(1)}</span>
                          </div>
                        </div>
                        {cat.warning && (
                          <p className="text-xs text-red-500 mt-2 font-medium">
                            This area scored below 3.0 - organizers must address it before the next edition.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* What Participants Said & Filter Pills[cite: 8] */}
                <div>
                  <h3 className="font-bold text-lg mb-4">What Participants Said</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {filters.map((filter, index) => (
                      <button 
                        key={index} 
                        className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                          index === 0 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="border-b border-zinc-100 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center font-bold text-sm">AM</div>
                          <div>
                            <p className="font-bold text-sm">Ahmed Al Mansoori</p>
                            <p className="text-xs text-zinc-500">Dec 2025 Verified Participant</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-lg">3.0</span>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed mt-3">
                        The course was beautiful along the Corniche but the water stations were a disaster, 
                        warm water handed out in tiny cups with huge gaps between stations. By km 18 I was seriously dehydrated. 
                        The organizer needs to fix this urgently.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">Beautiful course</span>
                        <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full">Warm water</span>
                        <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full">Too few stations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar Details */}
          <div>
            <p className="uppercase text-xs tracking-widest text-violet-600 font-bold mb-2">
              {event.category}
            </p>
            <h1 className="text-3xl font-black italic mb-2 leading-tight">
              {event.title}
            </h1>
            <p className="text-2xl font-black text-violet-600 mb-4">
              ${event.ticketTypes?.[0]?.price} - ${event.ticketTypes?.[1]?.price || 200}
            </p>
            
            <p className="text-sm text-zinc-600 leading-relaxed mb-4">
              {event.description}
            </p>

            <div className="flex items-center gap-2 mb-8 text-sm">
              <span className="font-bold text-lg">{event.rating}</span>
              <div className="flex items-center text-violet-500">
                <Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} />
              </div>
              <span className="text-zinc-500 ml-1">{event.reviews} reviews</span>
              <span className="text-zinc-400">2025 edition</span>
              <span className="ml-auto text-violet-600 underline font-semibold cursor-pointer">
                See all ratings
              </span>
            </div>

            {/* Tickets Widget */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden mb-6">
              <div className="p-4 bg-zinc-50 border-b border-zinc-200">
                <h4 className="font-bold text-sm">Tickets Types</h4>
              </div>
              
              <div className="p-5 border-b border-zinc-200 bg-white">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-bold">Full Kit</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 mb-2">Tickets Qty</p>
                    <div className="flex items-center gap-4 border border-zinc-200 rounded-lg p-1.5 w-fit">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-6 h-6 flex items-center justify-center hover:bg-zinc-100 rounded text-zinc-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{qty}</span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-zinc-100 rounded text-zinc-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="font-black text-2xl">${event.ticketTypes?.[0]?.price * qty || 200}</p>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <div className="w-24 h-12 bg-blue-50 rounded-lg flex items-center justify-center font-black text-blue-700">
                    ${event.ticketTypes?.[0]?.price * qty || 200}
                  </div>
                  <button className="flex-1 h-12 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg transition-colors">
                    Buy Tickets
                  </button>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 flex justify-between items-center text-zinc-500 cursor-pointer hover:bg-zinc-100 transition-colors">
                <span className="font-medium text-sm">Basic Kit</span>
                <span className="text-xs">Stock 125 Available</span>
              </div>
            </div>

            <div className="border border-zinc-200 rounded-xl p-5 mb-6">
              <p className="uppercase text-xs text-violet-600 font-bold mb-1">
                ENTRY FEE
              </p>
              <h2 className="text-3xl font-black">${event.price}</h2>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-black">18</p>
                <p className="text-xs text-zinc-500 uppercase font-semibold mt-1">Days</p>
              </div>
              <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-black">6</p>
                <p className="text-xs text-zinc-500 uppercase font-semibold mt-1">Days Left</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 mb-8">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Location</p>
                <p className="font-semibold text-sm">{event.location}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Date</p>
                <p className="font-semibold text-sm">{event.date}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Sport</p>
                <p className="font-semibold text-sm">Running</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Registered</p>
                <p className="font-semibold text-sm">{event.stat}</p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/guest-registration')}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl mb-3 transition-colors tracking-wide"
            >
              REGISTER NOW
            </button>
            <p className="text-xs text-center text-zinc-500 mb-10">
              Secure registration • Full refund up to 14 days before the event
            </p>

            <div className="border-t border-zinc-200 pt-8">
              <p className="uppercase text-xs text-violet-600 font-bold mb-4">
                ORGANISER
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm">{event.organizer.name}</h4>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    Location: {event.organizer.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}