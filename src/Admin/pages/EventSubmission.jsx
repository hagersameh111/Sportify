import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft, ArrowRight, X, Plus } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Field, Input, Select, Textarea } from "../components/ui/Field";
import ImageUploadSlot from "../components/ImageUploadSlot";

const steps = ["Event Basics", "Organiser", "Event Info", "Categories", "Refund", "Review"];
const extras = [
  ["liveResults", "Live Results", "Real-time race results during and after the event"],
  ["photoDownload", "Photo Download", "Professional race photos available for download after the event"],
  ["certificate", "Finisher Certificate", "Digital or physical certificate for all finishers"],
  ["medal", "Finisher Medal", "Custom finisher medal for all participants who complete the race"],
  ["kitBag", "Finisher / Race Kit Bag", "Goody bag or race kit provided to participants"],
];
const refunds = [
  ["none", "No Refund", "All sales are final. No refunds are issued under any circumstances."],
  ["partial", "Partial Refund", "A percentage of the fee is refunded if cancelled before a set deadline."],
  ["full", "Full Refund", "Full refund issued if cancellation is requested before the deadline."],
  ["custom", "Custom Policy", "Write your own refund policy text."],
];
const emptyCat = { name: "", distance: "", fee: "", earlyFee: "", earlyDeadline: "", ageFrom: "Open", ageTo: "Open", max: "" };
const MIN_DESC = 100;

function Stepper({ current }) {
  return (
    <ol className="flex items-start px-1 pb-6 pt-4">
      {steps.map((s, i) => {
        const done = i < current, active = i === current;
        return (
          <li key={s} className="flex flex-1 items-start last:flex-none">
            <div className="flex w-16 flex-col items-center gap-1.5 text-center">
              <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${done ? "bg-primary text-primary-fg" : active ? "bg-accent text-accent-fg" : "bg-subtle text-muted"}`}>
                {done ? <Check size={14} /> : i + 1}
              </span>
              <span className={`text-[11px] ${active ? "text-accent" : done ? "text-ink" : "text-muted"}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <span className={`mt-3.5 h-px flex-1 ${done ? "bg-primary" : "bg-line"}`} />}
          </li>
        );
      })}
    </ol>
  );
}

const Section = ({ title, hint, children }) => (
  <>
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="mb-6 text-sm text-muted">{hint}</p>
    {children}
  </>
);

export default function EventSubmission() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [agree, setAgree] = useState(false);
  const [d, setD] = useState({
    photos: [null, null, null, null], country: "UAE", city: "Abu Dhabi", refund: "none",
    extras: {}, categories: [{ ...emptyCat }],
  });
  const set = (k) => (e) => setD({ ...d, [k]: e.target.value });
  const setCat = (i, k, v) => setD({ ...d, categories: d.categories.map((c, j) => (j === i ? { ...c, [k]: v } : c)) });
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const descLen = (d.description ?? "").length;

  const Shell = ({ children }) => (
    <div className="min-h-screen bg-canvas font-sans text-ink">
      <div className="bg-surface px-40 py-5"><img src="/logo.png" alt="ADRT" className="h-8" /></div>
      <div className="mx-auto max-w-6xl p-6">
        <Card className="p-0">
          <div className="flex justify-between px-10 pt-8">
            <div><h1 className="font-bold">New Event Submission</h1><p className="text-xs text-muted">Shared across all affiliated running team platforms</p></div>
            {!done && <button onClick={() => nav("/admin/events")} className="flex items-center gap-1 text-sm text-muted"><X size={14} /> Cancel</button>}
          </div>
          <div className="border-b border-line px-10"><Stepper current={done ? steps.length : step} /></div>
          <div className="p-10">{children}</div>
        </Card>
      </div>
    </div>
  );

  if (done) return (
    <Shell>
      <div className="py-16 text-center">
        <span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-fg"><Check /></span>
        <h2 className="text-2xl font-bold">Success</h2>
        <p className="text-sm text-muted">Your event is successfully submitted.</p>
      </div>
    </Shell>
  );

  const nav2 = (
    <div className="mt-10 flex items-center justify-between">
      {step > 0 ? <button onClick={back} className="flex items-center gap-2 text-sm font-semibold"><ArrowLeft size={16} /> Back</button> : <span />}
      {step < 5
        ? <Button variant="accent" size="lg" onClick={next}>Continue <ArrowRight size={16} /></Button>
        : <Button variant="accent" size="lg" disabled={!agree} onClick={() => setDone(true)}>Submit</Button>}
    </div>
  );

  return (
    <Shell>
      {step === 0 && (
        <Section title="Event Basics" hint="Core information that defines the event — visible on the event listing page.">
          <p className="mb-1.5 text-xs font-medium">Event Photos <span className="text-accent">*</span></p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {d.photos.map((p, i) => (
              <ImageUploadSlot key={i} dashed label="Click to upload" value={p} className="h-32"
                onChange={(_, url) => setD({ ...d, photos: d.photos.map((x, j) => (j === i ? url : x)) })} />
            ))}
          </div>
          <p className="mb-5 mt-1 text-[11px] text-muted">PNG or JPG, min 300×300px recommended</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Event Name" required className="md:col-span-2"><Input placeholder="e.g. Abu Dhabi Runners Marathon 2026" onChange={set("name")} /></Field>
            <Field label="Date" required><Input type="date" onChange={set("date")} /></Field>
            <Field label="Time" required><Input type="time" onChange={set("time")} /></Field>
            <Field label="Registration End Date" required hint="Last day participants can register" className="md:col-span-2"><Input type="date" onChange={set("regEnd")} /></Field>
            <Field label="Start Point" required><Input placeholder="e.g. Corniche Road Starting Point" onChange={set("start")} /></Field>
            <Field label="End Point" required><Input placeholder="e.g. Corniche Road Finish Line" onChange={set("end")} /></Field>
            <Field label="Country" required><Select options={["UAE"]} value={d.country} onChange={set("country")} /></Field>
            <Field label="City" required><Select options={["Abu Dhabi", "Dubai", "Sharjah"]} value={d.city} onChange={set("city")} /></Field>
            <Field label="Full Address" required hint="Street address or landmark description" className="md:col-span-2"><Input placeholder="e.g. Corniche Road, near Marina Mall" onChange={set("address")} /></Field>
            <Field label="Google Maps Link" hint="Paste a Google Maps share link so participants can navigate directly" className="md:col-span-2"><Input placeholder="https://maps.google.com/…" onChange={set("maps")} /></Field>
          </div>
        </Section>
      )}

      {step === 1 && (
        <Section title="Organiser Details" hint="Information about the company or team organising this event.">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Organiser Logo"><ImageUploadSlot dashed label="Click to upload logo" className="h-32 w-full" /></Field>
            <div className="space-y-4">
              <Field label="Organiser / Company Name" required><Select placeholder="Select" options={["ADRT", "Other"]} onChange={set("orgName")} /></Field>
              <Field label="Organiser Location" required hint="City or country of the organiser"><Input placeholder="e.g. Abu Dhabi, UAE" onChange={set("orgLoc")} /></Field>
            </div>
            <Field label="Phone Number" required hint="Include country code"><Input placeholder="+971 50 000 0000" onChange={set("phone")} /></Field>
            <Field label="WhatsApp Number" hint="Can be same as phone"><Input placeholder="+971 50 000 0000" onChange={set("wa")} /></Field>
            <Field label="Email Address" required><Input type="email" placeholder="info@organiser.com" onChange={set("email")} /></Field>
            <Field label="Website" hint="Your organisation's website or event page"><Input placeholder="https://www.organiser.com" onChange={set("site")} /></Field>
          </div>
        </Section>
      )}

      {step === 2 && (
        <Section title="Event Information" hint="Tell participants what to expect. Be clear and detailed — this is what convinces runners to sign up.">
          <Field label="Event Introduction / Description" required>
            <Textarea rows={6} placeholder="Write a compelling description of the event…" onChange={set("description")} />
          </Field>
          <div className="mb-6 mt-1 flex justify-between text-[11px]">
            <span className="text-muted">Minimum {MIN_DESC} characters.</span>
            <span className={descLen >= MIN_DESC ? "text-success" : "text-accent"}>{descLen} / {MIN_DESC} min</span>
          </div>
          <h3 className="mb-1 text-sm font-semibold">Post-Race Services & Extras</h3>
          <p className="mb-3 text-xs text-muted">Enable the services your event provides. These appear as badges on the event listing.</p>
          <div className="space-y-3">
            {extras.map(([k, title, text]) => (
              <label key={k} className="flex cursor-pointer items-center justify-between rounded-control border border-line p-4">
                <span><span className="block text-sm font-semibold">{title}</span><span className="text-xs text-muted">{text}</span></span>
                <input type="checkbox" role="switch" className="peer sr-only" checked={!!d.extras[k]} onChange={(e) => setD({ ...d, extras: { ...d.extras, [k]: e.target.checked } })} />
                <span className="relative h-5 w-10 rounded-full bg-line transition peer-checked:bg-accent peer-focus-visible:outline-2 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-surface after:transition peer-checked:after:translate-x-5" />
              </label>
            ))}
          </div>
        </Section>
      )}

      {step === 3 && (
        <Section title="Race Categories & Fees" hint="Add every race category your event offers. Participants will choose from these when registering.">
          <p className="mb-5 rounded-control bg-canvas p-4 text-xs text-muted">Add all race distances and their fees. If you offer an early bird rate, fill in the early bird fee and its deadline. Fees are in USD by default.</p>
          {d.categories.map((c, i) => (
            <div key={i} className="mb-4 rounded-card border border-line p-5">
              <div className="mb-3 flex justify-between"><h3 className="text-sm font-semibold">Category {i + 1}</h3>
                {d.categories.length > 1 && <button aria-label="Remove category" onClick={() => setD({ ...d, categories: d.categories.filter((_, j) => j !== i) })} className="text-muted hover:text-danger"><X size={16} /></button>}
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Category Name" required className="md:col-span-2"><Input placeholder="e.g. Full Marathon, 10K Fun Run" value={c.name} onChange={(e) => setCat(i, "name", e.target.value)} /></Field>
                <Field label="Distance" required><Input placeholder="e.g. 42.195 km" value={c.distance} onChange={(e) => setCat(i, "distance", e.target.value)} /></Field>
                <Field label="Regular Fee (USD)" required><Input type="number" min={0} placeholder="$ 0" value={c.fee} onChange={(e) => setCat(i, "fee", e.target.value)} /></Field>
                <Field label="Early Bird Fee (USD)" hint="Leave blank if no early bird"><Input type="number" min={0} placeholder="$ 0" value={c.earlyFee} onChange={(e) => setCat(i, "earlyFee", e.target.value)} /></Field>
                <Field label="Early Bird Deadline" hint="Last day for early bird price"><Input type="date" value={c.earlyDeadline} onChange={(e) => setCat(i, "earlyDeadline", e.target.value)} /></Field>
                <Field label="Age Group (From)"><Select options={["Open", ...Array.from({ length: 12 }, (_, n) => String(10 + n * 5))]} value={c.ageFrom} onChange={(e) => setCat(i, "ageFrom", e.target.value)} /></Field>
                <Field label="Age Group (To)"><Select options={["Open", ...Array.from({ length: 12 }, (_, n) => String(10 + n * 5))]} value={c.ageTo} onChange={(e) => setCat(i, "ageTo", e.target.value)} /></Field>
                <Field label="Max Participants" hint="Leave blank for unlimited"><Input type="number" min={0} placeholder="e.g. 500" value={c.max} onChange={(e) => setCat(i, "max", e.target.value)} /></Field>
              </div>
            </div>
          ))}
          <button onClick={() => setD({ ...d, categories: [...d.categories, { ...emptyCat }] })}
            className="flex w-full items-center justify-center gap-2 rounded-card border border-dashed border-line py-4 text-sm font-semibold text-primary hover:bg-subtle"><Plus size={14} /> Add Another Category</button>
        </Section>
      )}

      {step === 4 && (
        <Section title="Refund Policy" hint="Be transparent with participants about your cancellation and refund terms. A clear policy builds trust.">
          <div className="grid gap-4 md:grid-cols-2">
            {refunds.map(([k, title, text]) => (
              <label key={k} className={`flex cursor-pointer justify-between rounded-control border p-5 ${d.refund === k ? "border-accent" : "border-line"}`}>
                <span><span className="block text-sm font-semibold">{title}</span><span className="text-xs text-muted">{text}</span></span>
                <input type="radio" name="refund" className="h-4 w-4 accent-accent" checked={d.refund === k} onChange={() => setD({ ...d, refund: k })} />
              </label>
            ))}
          </div>
          {d.refund === "custom" && <Field label="Custom refund policy" className="mt-4"><Textarea onChange={set("refundText")} /></Field>}
          {d.refund === "none" && (
            <p className="mt-4 rounded-control border border-warning/30 bg-warning-soft p-4 text-xs text-warning">
              A strict no-refund policy may discourage some participants. Consider offering a transfer option (participants can transfer their slot to another person) even if no monetary refund is given.
            </p>
          )}
        </Section>
      )}

      {step === 5 && (
        <Section title="Review & Submit" hint="Review all the information before submitting. You can go back to edit any section.">
          <div className="space-y-5">
            <ReviewBlock title="Event Basics" rows={[["Event Name", d.name], ["Event Date", d.date], ["Start Time", d.time], ["Registration Closes", d.regEnd], ["Venue", d.address], ["Google Maps", d.maps]]} />
            <ReviewBlock title="Organiser" rows={[["Name", d.orgName], ["Location", d.orgLoc], ["Phone", d.phone], ["WhatsApp", d.wa], ["Email", d.email], ["Website", d.site]]} />
            <ReviewBlock title="Features & Services">
              <div className="flex flex-wrap gap-2">
                {extras.map(([k, t]) => (
                  <span key={k} className={`rounded-full px-3 py-1 text-xs font-medium ${d.extras[k] ? "bg-subtle text-primary" : "bg-subtle text-placeholder line-through"}`}>{t}</span>
                ))}
              </div>
            </ReviewBlock>
            <ReviewBlock title="Categories & Fees">
              <table className="w-full text-left text-xs">
                <thead className="text-muted"><tr>{["Category", "Distance", "Age", "Regular", "Early bird", "Max"].map((h) => <th key={h} className="pb-2 font-semibold">{h}</th>)}</tr></thead>
                <tbody>{d.categories.map((c, i) => (
                  <tr key={i} className="border-t border-line">
                    <td className="py-2">{c.name || "—"}</td><td>{c.distance || "—"}</td>
                    <td>{c.ageFrom === "Open" && c.ageTo === "Open" ? "Open" : `${c.ageFrom}–${c.ageTo}`}</td>
                    <td>{c.fee ? `$${c.fee}` : "—"}</td><td>{c.earlyFee ? `$${c.earlyFee}` : "—"}</td><td>{c.max || "—"}</td>
                  </tr>))}</tbody>
              </table>
            </ReviewBlock>
            <ReviewBlock title="Refund Policy" rows={[["Policy Type", refunds.find((r) => r[0] === d.refund)[1]]]} />
            <label className="flex items-start gap-3 rounded-control bg-canvas p-4 text-sm">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-accent" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              I confirm that all the information provided above is accurate and complete. I agree that this event will be listed publicly on all affiliated running team platforms, and that the organiser is responsible for the event's execution and any changes.
            </label>
          </div>
        </Section>
      )}
      {nav2}
    </Shell>
  );
}

function ReviewBlock({ title, rows, children }) {
  return (
    <section className="overflow-hidden rounded-card border border-line">
      <h3 className="bg-canvas px-5 py-3 text-sm font-semibold">{title}</h3>
      <div className="p-5">
        {rows ? (
          <dl className="grid gap-2 text-xs">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[10rem_1fr]"><dt className="text-muted">{k}</dt><dd className={v ? "" : "text-placeholder"}>{v || "Not provided"}</dd></div>
            ))}
          </dl>
        ) : children}
      </div>
    </section>
  );
}
