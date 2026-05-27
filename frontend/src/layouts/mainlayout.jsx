import { Outlet } from "react-router-dom";
import Navbar from "./navbar"

export default function MainLayout() {
  return (
    <>
      {/* Your Navbar will live here */}
      
      <Navbar />
      <Outlet />
    </>
  );
}