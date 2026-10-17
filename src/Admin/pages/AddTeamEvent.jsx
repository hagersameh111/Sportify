import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Button from "../components/ui/Button";
import { Field, Input, Select, Textarea } from "../components/ui/Field";
import ImageUploadSlot from "../components/ImageUploadSlot";
import { categories, eventStatuses } from "../data/mock";

export default function AddTeamEvent() {
  const nav = useNavigate();
  const [f, setF] = useState({ capacity: 0, status: "upcoming" });
  const [imgs, setImgs] = useState([null, null, null, null]);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setImg = (i) => (_, url) => setImgs(imgs.map((x, j) => (j === i ? url : x)));

  return (
    <>
      <nav className="mb-8 flex items-center gap-2 text-sm">
        <Link to="/admin/events" className="italic text-muted">Back</Link>
        <ChevronRight size={14} className="text-accent" />
        <span className="font-bold italic">Add Team Event</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="mb-2 text-xs font-medium">Event Images <span className="text-accent">*</span></p>
          <ImageUploadSlot value={imgs[0]} onChange={setImg(0)} className="h-40 w-full" />
          <p className="mb-2 mt-5 text-xs text-muted">Optional</p>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => <ImageUploadSlot key={i} value={imgs[i]} onChange={setImg(i)} className="h-24" />)}
          </div>
          <p className="mt-2 text-[11px] text-muted">JPG, PNG, PDF (Max 10MB)</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Event Title" required className="sm:col-span-2"><Input placeholder="e.g. Abu Dhabi Marathon 2026" onChange={set("title")} /></Field>
          <Field label="Date" required><Input type="date" onChange={set("date")} /></Field>
          <Field label="Time" required><Input type="time" onChange={set("time")} /></Field>
          <Field label="City" required><Input placeholder="e.g. Abu Dhabi" onChange={set("city")} /></Field>
          <Field label="Address / Venue"><Input placeholder="e.g. Corniche Road" onChange={set("venue")} /></Field>
          <Field label="Price Range (USD)"><Input placeholder="e.g. 50-100" onChange={set("price")} /></Field>
          <Field label="Category" required><Select placeholder="Select…" options={categories} onChange={set("category")} /></Field>
          <Field label="Capacity"><Input type="number" min={0} value={f.capacity} onChange={set("capacity")} /></Field>
          <Field label="Status"><Select options={eventStatuses} value={f.status} onChange={set("status")} /></Field>
          <Field label="Description" className="sm:col-span-2"><Textarea placeholder="Describe the event…" onChange={set("description")} /></Field>
          <div className="flex items-center justify-end gap-3 sm:col-span-2">
            <Button variant="ghost" onClick={() => nav("/admin/events")}>Cancel</Button>
            <Button variant="accent" onClick={() => nav("/admin/events")}>Add Event</Button>
          </div>
        </div>
      </div>
    </>
  );
}
    