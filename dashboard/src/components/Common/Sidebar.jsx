import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Example icons for toggle and close buttons
import masterRoutes from "../../router/routes"; // Adjust path as needed
import logo from "../../assets/img/logo.jpeg";
import { IoIosArrowDropdownCircle } from "react-icons/io";
// Sidebar Component
const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({}); // Track open submenus
  const location = useLocation(); // Get current route for active state

  const toggleSubmenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-logo">
        <div>
          <a href="index.html" className="logo logo-normal">
            <img src={logo} alt="Logo" />
          </a>
          <a href="index.html" className="logo-small">
            <img src={logo} alt="Logo" />
          </a>
          <a href="index.html" className="dark-logo">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <button
          className="sidenav-toggle-btn btn border-0 p-0 active"
          id="toggle_btn"
        >
          <FaBars /> {/* Replaced ti-arrow-bar-to-left with FaBars */}
        </button>
        <button className="sidebar-close">
          <FaTimes /> {/* Replaced ti-x with FaTimes */}
        </button>
      </div>

      <div className="sidebar-inner" data-simplebar>
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            {masterRoutes
              .filter((route) => route.isSidebarActive) // Only show routes with isSidebarActive: true
              .map((route, index) => {
                const isSubmenuActive = route.submenu.some((subRoute) =>
                  location.pathname.startsWith(subRoute.path)
                ); // Check if any submenu item is active

                return (
                  <li
                    key={index}
                    className={route.submenu.length > 0 ? "submenu" : ""}
                  >
                    <NavLink
                      to={route.path}
                      className={({ isActive }) =>
                        `${isActive && !route.submenu.length ? "active" : ""} ${
                          isSubmenuActive && route.submenu.length > 0
                            ? "subdrop"
                            : ""
                        }`
                      }
                      end={route.submenu.length === 0}
                      onClick={(e) => {
                        if (route.submenu.length > 0) {
                          e.preventDefault(); // Prevent navigation for parent routes with submenus
                          toggleSubmenu(index);
                        }
                      }}
                    >
                      <span className="menu-icon">
                        {route.icon} {/* Render react-icons component */}
                      </span>
                      <span>{route.name}</span>
                      {route.submenu.length > 0 && (
                        <span className="menu-arrow">
                          <IoIosArrowDropdownCircle />
                        </span>
                      )}
                    </NavLink>
                    {route.submenu.length > 0 && (
                      <ul
                        style={{
                          display:
                            openMenus[index] || isSubmenuActive
                              ? "block"
                              : "none",
                        }}
                      >
                        {route.submenu
                          .filter((subRoute) => subRoute.isSidebarActive) // Filter submenu items
                          .map((subRoute, subIndex) => (
                            <li key={subIndex}>
                              <NavLink
                                to={subRoute.path}
                                className={({ isActive }) =>
                                  isActive ? "active" : ""
                                }
                              >
                                <span className="menu-icon">
                                  {subRoute.icon}{" "}
                                  {/* Render react-icons component */}
                                </span>
                                {subRoute.name}
                              </NavLink>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
