import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import AddTeamEvent from "./pages/AddTeamEvent";
import Marketplace from "./pages/Marketplace";
import ProductForm from "./pages/ProductForm";
import ComingSoon from "./pages/ComingSoon";
import EventSubmission from "./pages/EventSubmission";

/** Mounted at /admin/* — everything admin-related is routed from here. */
export default function AdminApp() {
  return (
    <Routes>
      <Route path="submit-event" element={<EventSubmission />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="events" element={<Events />} />
        <Route path="events/new" element={<AddTeamEvent />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="marketplace/new" element={<ProductForm mode="new" />} />
        <Route path="marketplace/:id" element={<ProductForm mode="edit" />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
