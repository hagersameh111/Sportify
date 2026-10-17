
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
