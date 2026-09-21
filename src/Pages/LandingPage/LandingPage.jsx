import Navbar from "../../components/Navbar";
import Hero from "./components/Hero";
import EventsSection from "./components/EventsSection";
import TeamsSection from "./components/TeamsSection";
import GallerySection from "./components/GallerySection";
import BrandsSection from "./components/BrandsSection";
import CTASection from "./components/CTASection";
import Footer from "../../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-light">
      <Navbar />
      <Hero />
      <EventsSection />
      <TeamsSection />
      <GallerySection />
      <BrandsSection />
      <CTASection />
      <Footer />
    </div>
  );
}