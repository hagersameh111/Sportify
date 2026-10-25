import { Outlet } from "react-router-dom";
import StoreQuickDrawer from "./Components/StoreQuickDrawer";

export default function StoreLayout() {
  return (
    <>
      <Outlet />
      <StoreQuickDrawer />
    </>
  );
}