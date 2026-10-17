import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import TeamsPage from "./Pages/Teams/teams";
import TeamDetailsPage from "./Pages/Teams/TeamDetailsPage";
import EventsPage from "./Pages/Events/EventsPage";
import EventDetailsPage from "./Pages/Events/EventDetailsPage";
import SignInPage from ".//Pages/Events/SignInPage";
import GuestRegistrationPage from "./Pages/Events/GuestRegistrationPage";
import Register from "./Pages/Events/Register";
import TrainingPage from "./Pages/Training/TrainingPage";
import SignupPage from "./Pages/SignupPage";

// Admin is lazy-loaded so it stays out of the public bundle
const AdminApp = lazy(() => import("./Admin/AdminApp"));

export default function App() {
  return (
    <div className="min-h-screen bg-surface-light">
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:id" element={<TeamDetailsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/guest-registration" element={<GuestRegistrationPage />} />

          {/* Admin site: everything under /admin/* is handled by AdminApp */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    </div>
  );
}