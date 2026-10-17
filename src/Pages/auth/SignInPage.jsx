import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthShell, { inputClass } from "../../components/AuthShell";
import { safeNext, signIn } from "../../lib/auth";

const IMAGE = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=80";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next");
  const nextQuery = next ? `?next=${encodeURIComponent(next)}` : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (!signIn(email)) {
      setError("We couldn't find an account with that email. Create one to continue.");
      return;
    }
    navigate(safeNext(params));
  };

  return (
    <AuthShell
      image={IMAGE}
      heading={"Welcome\nback"}
      blurb="Sign in to join teams, register for events and manage your tickets."
      title="Sign in"
      subtitle="Enter your account details to continue."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email</label>
          <input id="email" type="email" name="email" required autoComplete="email" placeholder="you@email.com" className={inputClass} onChange={() => setError("")} />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">Password</label>
          <div className="relative">
            <input id="password" type={showPassword ? "text" : "password"} name="password" required autoComplete="current-password" className={`${inputClass} pr-12`} />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-500 hover:text-zinc-800"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-600"><input type="checkbox" className="accent-violet-600" /> Remember me</label>
          <button type="button" className="font-semibold text-violet-700 hover:underline">Forgot password?</button>
        </div>

        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button type="submit" className="h-12 w-full rounded-lg bg-violet-600 font-bold text-white transition-colors hover:bg-violet-700 focus-visible:ring-2 focus-visible:ring-violet-300">
          Sign in
        </button>
      </form>

      <div className="my-6 flex items-center gap-4 text-xs text-zinc-400">
        <span className="h-px flex-1 bg-zinc-200" /> or <span className="h-px flex-1 bg-zinc-200" />
      </div>

      <Link to="/guest-registration" className="flex h-12 items-center justify-center rounded-lg border-2 border-violet-600 font-bold text-violet-700 hover:bg-violet-50">
        Continue as guest
      </Link>

      <p className="mt-6 text-center text-sm text-zinc-500">
        New to Sportify?{" "}
        <Link to={`/signup${nextQuery}`} className="font-bold text-violet-700 hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}
