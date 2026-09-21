import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function GuestRegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    nationality: "",
    residence: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
    gender: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Registration Submitted Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* BACK */}
        <Link
          to="/signin"
          className="inline-flex items-center gap-2 text-violet-600 font-semibold mb-8"
        >
          <ChevronLeft size={18} />
          Back
        </Link>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-violet-700 to-fuchsia-600 px-8 py-10 text-white">
            <p className="uppercase tracking-[0.3em] text-xs mb-3">
              Event Registration
            </p>

            <h1 className="text-4xl lg:text-5xl font-black italic uppercase">
              Guest Registration
            </h1>

            <p className="mt-4 text-white/80 max-w-2xl">
              Complete your details below to participate in the event.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-8 lg:p-10"
          >
            {/* PERSONAL INFO */}
            <div className="mb-10">
              <h2 className="text-2xl font-black uppercase mb-6">
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    First Name *
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Last Name *
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Date Of Birth *
                  </label>

                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Nationality *
                  </label>

                  <input
                    type="text"
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Country Of Residence *
                  </label>

                  <input
                    type="text"
                    name="residence"
                    required
                    value={formData.residence}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  >
                    <option value="">
                      Select Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer Not To Say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* EMERGENCY CONTACT */}
            <div className="mb-10">
              <h2 className="text-2xl font-black uppercase mb-6">
                Emergency Contact
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Contact Name *
                  </label>

                  <input
                    type="text"
                    name="emergencyName"
                    required
                    value={formData.emergencyName}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Contact Phone *
                  </label>

                  <input
                    type="tel"
                    name="emergencyPhone"
                    required
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className="w-full h-14 border rounded-xl px-4 outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>

            {/* AGREEMENT */}
            <div className="border rounded-2xl p-5 bg-zinc-50 mb-8">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-1 accent-violet-600"
                />

                <span className="text-sm text-zinc-600 leading-6">
                  I confirm that all information provided is correct.
                  I understand participation is at my own risk and I
                  agree to the event rules and terms & conditions.
                </span>
              </label>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold uppercase transition"
              >
                Complete Registration
              </button>

              <Link
                to="/events"
                className="flex-1 h-14 border border-zinc-300 rounded-xl font-bold uppercase flex items-center justify-center hover:bg-zinc-50"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}