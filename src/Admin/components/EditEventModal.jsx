import { useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { Field, Input, Select, Textarea } from "./ui/Field";
import ImageUploadSlot from "./ImageUploadSlot";
import { categories, eventStatuses } from "../data/mock";

export default function EditEventModal({ event, onSave, onClose }) {
  const [f, setF] = useState({ ...event, images: event.images ?? [null, null, null, null] });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setImg = (i) => (_, url) => setF({ ...f, images: f.images.map((x, j) => (j === i ? url : x)) });

  return (
    <Modal title="Edit Event" onClose={onClose}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Event Title" className="sm:col-span-2"><Input value={f.title} onChange={set("title")} /></Field>
        <Field label="Date"><Input type="date" value={f.date} onChange={set("date")} /></Field>
        <Field label="Time"><Input type="time" value={f.time} onChange={set("time")} /></Field>
        <Field label="City"><Input value={f.city} onChange={set("city")} /></Field>
        <Field label="Address / Venue"><Input value={f.venue} onChange={set("venue")} /></Field>
        <Field label="Price Range (USD)"><Input value={f.price} onChange={set("price")} /></Field>
        <Field label="Category"><Select options={categories} value={f.category} onChange={set("category")} /></Field>
        <Field label="Capacity"><Input type="number" value={f.capacity} onChange={set("capacity")} /></Field>
        <Field label="Status"><Select options={eventStatuses} value={f.status} onChange={set("status")} /></Field>
        <Field label="Description" className="sm:col-span-2"><Textarea value={f.description ?? ""} onChange={set("description")} /></Field>
        <div className="sm:col-span-2">
          <p className="mb-1.5 text-xs font-medium">Event Images</p>
          <div className="grid grid-cols-4 gap-3">
            {f.images.map((img, i) => <ImageUploadSlot key={i} value={img} onChange={setImg(i)} className="h-24" />)}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3 border-t border-line pt-4">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="accent" onClick={() => onSave(f)}>Save Changes</Button>
      </div>
    </Modal>
  );
}
    