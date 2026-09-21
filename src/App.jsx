import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import TeamsPage from "./Pages/Teams/teams";
import TeamDetailsPage from "./Pages/Teams/TeamDetailsPage";
import EventsPage from "./Pages/Events/EventsPage";
import EventDetailsPage from "./Pages/Events/EventDetailsPage";
import SignInPage from ".//Pages/Events/SignInPage";
import GuestRegistrationPage from "./Pages/Events/GuestRegistrationPage";
import Register from "./Pages/Events/Register";

export default function App() {
  return (
    <div className="min-h-screen bg-surface-light">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/teams"
          element={<TeamsPage />}
        />

        <Route
          path="/teams/:id"
          element={<TeamDetailsPage />}
        />
        <Route path="/events" element={<EventsPage />} />
<Route path="/events/:id" element={<EventDetailsPage />} />
<Route path="/signin" element={<SignInPage />} />
<Route
  path="/guest-registration"
  element={<GuestRegistrationPage />}
/>
      </Routes>
    </div>
  );
}