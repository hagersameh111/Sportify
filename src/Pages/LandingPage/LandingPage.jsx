import Navbar from "../../components/Navbar";
import Hero from "./components/Hero";
import EventsSection from "./components/EventsSection";
import TeamsSection from "./components/TeamsSection";
import GallerySection from "./components/GallerySection";
import BrandsSection from "./components/BrandsSection";
import ProductsSection, { AdSlot } from "./components/ProductsSection";
import Footer from "../../components/Footer";
import CTASection from "./components/CTASection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <Hero />
      <EventsSection />
      <TeamsSection />
      <GallerySection />

       <ProductsSection />
      <BrandsSection />
     <CTASection />
      <AdSlot />
      <Footer />
    </div>
  );
}
