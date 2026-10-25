
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import StoreLayout from "./Pages/Store/StoreLayout";
import LandingPage from "./Pages/LandingPage/LandingPage";
import TeamsPage from "./Pages/Teams/teams";
import TeamDetailsPage from "./Pages/Teams/TeamDetailsPage";
import EventsPage from "./Pages/Events/EventsPage";
import EventDetailsPage from "./Pages/Events/EventDetailsPage";
import SignInPage from "./Pages/Events/SignInPage";
import GuestRegistrationPage from "./Pages/Events/GuestRegistrationPage";
import Register from "./Pages/Events/Register";
import TrainingPage from "./Pages/Training/TrainingPage";
import SignupPage from "./Pages/SignupPage";
import GamesPage from "./Pages/Games/GamesPage";
import StorePage from "./Pages/Store/StorePage";
import ProductDetailsPage from "./Pages/Store/ProductDetailsPage";
import WishlistPage from "./Pages/Store/Wishlist/WishlistPage";
import CartPage from "./Pages/Store/Cart/CartPage";

// Admin is lazy-loaded so it stays out of the public bundle
const AdminApp = lazy(() => import("./Admin/AdminApp"));

export default function App() {
  return (
    <div className="min-h-screen bg-surface-light">
      <Suspense fallback={null}>
        <Routes>
          {/* Public pages share the same Navbar and Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDetailsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route element={<StoreLayout />}>
          <Route path="/store" element={<StorePage />} />
          <Route
            path="/store/:id"
            element={<ProductDetailsPage />}
          />
        </Route>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route
              path="/guest-registration"
              element={<GuestRegistrationPage />}
            />
          </Route>

          {/* Admin routes use their own layout */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    </div>
  );
}
