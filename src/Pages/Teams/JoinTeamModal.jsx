import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { getSession, hasRequested, requestToJoin } from "../../lib/auth";

export default function JoinTeamModal({ team, onClose }) {
  const session = getSession();
  const [sent, setSent] = useState(hasRequested(team.id));
  const closeRef = useRef(null);
  const next = encodeURIComponent(`/teams/${team.id}`);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const send = () => { if (requestToJoin(team.id)) setSent(true); };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="join-title" className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
        <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-zinc-100 p-2 hover:bg-zinc-200">
          <X size={16} />
        </button>

        <h2 id="join-title" className="pr-10 text-2xl font-black">Join {team.name}</h2>

        {sent ? (
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800">
            <Check size={18} className="mt-0.5 shrink-0" />
            <p>Request sent. The team captain will review it within 48 hours.</p>
          </div>
        ) : session ? (
          <>
            <p className="mt-3 text-sm text-zinc-600">You're signed in as <b>{session.name}</b>. Send your request to the team captain.</p>
            <button onClick={send} className="mt-6 h-12 w-full rounded-lg bg-violet-600 font-bold text-white hover:bg-violet-700">
              Send join request
            </button>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-zinc-600">Joining a team needs a Sportify account. Do you already have one?</p>
            <div className="mt-6 grid gap-3">
              <Link to={`/signin?next=${next}`} className="flex h-12 items-center justify-center rounded-lg bg-violet-600 font-bold text-white hover:bg-violet-700">
                Yes, sign in
              </Link>
              <Link to={`/signup?next=${next}`} className="flex h-12 items-center justify-center rounded-lg border border-violet-600 font-bold text-violet-700 hover:bg-violet-50">
                No, create an account
              </Link>
            </div>
            <p className="mt-4 text-center text-xs text-zinc-500">You'll come back here to finish joining.</p>
          </>
        )}
      </div>
    </div>
  );
}
