import React from "react";

import Navbar from "../components/dashboard/navbar/Navbar.jsx";
import Footer from "../components/dashboard/footer/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
