import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl">
        {/* LEFT */}
        <div className="relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/90 to-fuchsia-700/70" />

          <div className="relative z-10 p-12 h-full flex flex-col justify-end text-white">
            <p className="uppercase tracking-[0.3em] text-sm mb-4">
              Sportify Events
            </p>

            <h2 className="text-5xl font-black italic uppercase leading-none">
              Welcome
              <br />
              Back
            </h2>

            <p className="mt-6 text-white/80 max-w-md">
              Sign in to complete your registration,
              manage tickets and participate in upcoming events.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8 lg:p-14">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-black italic uppercase mb-3">
              Sign In
            </h1>

            <p className="text-zinc-500 mb-10">
              Enter your account details to continue.
            </p>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@email.com"
                  className="w-full h-14 border border-zinc-300 rounded-xl px-4 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-14 border border-zinc-300 rounded-xl px-4 pr-12 outline-none focus:border-violet-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="text-violet-600 font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold uppercase transition"
              >
                Sign In
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-zinc-400 text-sm">
                  OR
                </span>
              </div>
            </div>

            <Link
              to="/guest-registration"
              className="w-full h-14 border-2 border-violet-600 text-violet-600 rounded-xl font-bold uppercase flex items-center justify-center hover:bg-violet-50 transition"
            >
              Continue As Guest
            </Link>

            <p className="mt-8 text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <span className="text-violet-600 font-semibold cursor-pointer">
                Create One
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}