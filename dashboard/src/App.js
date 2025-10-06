import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Sidebar from "./components/Common/Sidebar";
import Router from "./router/Router";
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const MAINTENANCE_MODE = false;
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const isMaintenancePage = location.pathname === "/under-maintenance";
  const isAuthPage = [
    "/login",
    "/signup",
    "/404",
    "/500",
    "/reset-password/:token",
    "/forgot-password",
    "/under-maintenance",
    "/coming-soon",
    "/no-access",
    "/verify-account",
  ].includes(location.pathname);
  // Maintenance mode
  useEffect(() => {
    if (MAINTENANCE_MODE && !isMaintenancePage) {
      navigate("/under-maintenance", { replace: true });
    }
  }, [MAINTENANCE_MODE, isMaintenancePage, navigate]);
  // Toggle sidebar
  const toggleSidebar = (open) => setSidebarOpen(open);

  // Sidebar resize handler
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside (tablet range)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isSidebarOpen &&
        window.innerWidth >= 768 &&
        window.innerWidth < 992 &&
        !e.target.closest("#sidebar") &&
        !e.target.closest("#toggle_btn")
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSidebarOpen]);

  const token = localStorage.getItem("accessToken");
  console.log(token);
  return (
    <div class="main-wrapper">
      {!isAuthPage && <Header />}
      {!isAuthPage && <Sidebar />}

      <div class="page-wrapper">
        <Router />
      </div>
      <Footer />
    </div>
  );
}

export default App;
