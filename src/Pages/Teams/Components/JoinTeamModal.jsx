import { useState } from "react";
import { X } from "lucide-react";

import {
  experienceLevels,
  sports,
} from "../../../data/teams";

export default function JoinTeamModal({
  team,
  onClose,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experienceLevel: "",
    favouriteSport: "",
    message: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Join request sent!");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#d946ef] font-bold">
              Join Request
            </p>

            <h2 className="text-3xl font-black italic uppercase mt-2">
              {team.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-8"
        >
          {/* ROW 1 */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                First Name *
              </label>

              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#d946ef] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Last Name *
              </label>

              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#d946ef] outline-none"
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address *
              </label>

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#d946ef] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#d946ef] outline-none"
              />
            </div>
          </div>

          {/* ROW 3 */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Experience Level *
              </label>

              <select
                name="experienceLevel"
                required
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#d946ef] outline-none"
              >
                <option value="">
                  Select your level
                </option>

                {experienceLevels.map((level) => (
                  <option
                    key={level}
                    value={level}
                  >
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Favourite Sport *
              </label>

              <select
                name="favouriteSport"
                required
                value={formData.favouriteSport}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#d946ef] outline-none"
              >
                <option value="">
                  Select sport
                </option>

                {sports.map((sport) => (
                  <option
                    key={sport}
                    value={sport}
                  >
                    {sport}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MESSAGE */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Why do you want to join?
            </label>

            <textarea
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell the team a little about yourself and your goals..."
              className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-[#d946ef] outline-none"
            />
          </div>

          {/* CHECKBOX */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agree}
                name="agree"
                onChange={handleChange}
                className="mt-1 accent-[#d946ef]"
              />

              <span className="text-sm text-zinc-600">
                I agree to the team code of
                conduct and commit to attending
                at least 70% of training
                sessions.
              </span>
            </label>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 h-14 bg-[#d946ef] hover:bg-[#c026d3] text-white font-bold uppercase rounded-lg transition"
            >
              Send Join Request
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-14 border border-zinc-300 font-semibold rounded-lg hover:bg-zinc-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}