import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../../styles/header.css";
import logo from "../../assets/images/logos/virgo_group_white.png";
import interior from "../../assets/images/interior-background.jpg";
const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showDropdown, setShowDropdown] = useState({
    about: false,
    products: false,
    press: false,
  });
  const [showSearch, setShowSearch] = useState(false);

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const toggleDropdown = (menu) => {
    setShowDropdown((prev) => ({
      about: menu === "about" ? !prev.about : false,
      products: menu === "products" ? !prev.products : false,
      press: menu === "press" ? !prev.press : false,
    }));
  };

  const handleOutsideClick = (e) => {
    if (
      showOffcanvas &&
      !e.target.closest("#offcanvassidebar") &&
      !e.target.closest(".navbar-toggler")
    ) {
      setShowOffcanvas(false);
    }
  };

  // Add event listener for outside clicks when offcanvas is open
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showOffcanvas]);

  // Simulated WordPress data
  const siteUrl = "https://www.virgolam.com";
  const templateDirectoryUri = "/wp-content/themes/virgo";
  const permalinks = {
    aboutVirgo: "/about-us",
    missionVision: "/mission-vision-values",
    initiatives: "/initiatives-environment",
    laminates: "/laminates",
    acp: "/acp",
    pvc: "/pvc",
    plywood: "/plywood",
    aluminium: "/aluminium",
    mdf: "/mdf",
    csr: "/csr",
    events: "/events",
    coverages: "/coverages",
    certifications: "/certifications",
    whereToBuy: "/where-to-buy",
    career: "/careers",
    contact: "/contact",
  };

  return (
    <header id="top-header" className="site-header">
      <nav
        className="navbar navbar-expand-xl navbar-dark px-md-0 py-0 container"
        style={{ top: 0 }}
      >
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="logo img-fluid" />
          </Link>
          <div className="floating-cta">
            <a
              href="/contact"
              className="cta-icon where-icon"
              title="Contact Us"
            >
              <img
                src="https://img.icons8.com/ios-filled/30/ffffff/edit-file.png"
                alt="Contact"
              />
            </a>
            <a
              href="tel:+911147422222"
              className="cta-icon phone-icon"
              title="Call Us"
            >
              <img
                src="https://img.icons8.com/ios-filled/30/ffffff/phone.png"
                alt="Call Us"
              />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=919832722222&text=Hi%2C%20I%20am%20reaching%20you%20via%20virgolam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-icon whatsapp-icon"
              title="Chat on WhatsApp"
            >
              <img
                src="https://img.icons8.com/ios-filled/30/ffffff/whatsapp.png"
                alt="WhatsApp"
              />
            </a>
          </div>
        </div>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleOffcanvas}
          aria-controls="offcanvassidebar"
          aria-expanded={showOffcanvas}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" style={{ color: "#fff" }}></i>
        </button>

        <div
          className={`offcanvas offcanvas-start${showOffcanvas ? " show" : ""}`}
          id="offcanvassidebar"
          aria-labelledby="offcanvasLabel"
        >
          <div className="offcanvas-header px-3 pt-3 mt-3 border-0 text-right">
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowOffcanvas(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul
              className="navbar-nav ml-auto"
              id="mainmenu"
              style={{ paddingTop: 0 }}
            >
              {/* About Dropdown */}
              <li className="nav-item custom-navs-linked">
                <a
                  className="nav-link"
                  href="/about-us"
                  id="aboutmenu"
                  role="button"
                  onClick={() => toggleDropdown("about")}
                  aria-expanded={showDropdown.about}
                >
                  About
                </a>
              </li>

              {/* Products Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="productmenu"
                  role="button"
                  onClick={() => toggleDropdown("products")}
                  aria-expanded={showDropdown.products}
                >
                  Products
                </a>
                <div
                  className={`dropdown-menu${
                    showDropdown.products ? " show" : ""
                  }`}
                  aria-labelledby="productmenu"
                >
                  <div className="row">
                    {[
                      {
                        link: permalinks.laminates,
                        icon: "icon-layers",
                        text: "Laminates",
                      },
                      {
                        link: permalinks.acp,
                        icon: "icon-brickes-wall",
                        text: "ACP",
                      },
                      {
                        link: permalinks.pvc,
                        icon: "icon-pappers",
                        text: "PVC",
                      },
                      {
                        link: permalinks.plywood,
                        icon: "icon-first-layer",
                        text: "Plywood",
                      },
                      {
                        link: permalinks.aluminium,
                        icon: "icon-roll-papper",
                        text: "Aluminium",
                      },
                      {
                        link: permalinks.mdf,
                        icon: "icon-first-layer",
                        text: "MDF",
                      },
                    ].map((item, index) => (
                      <Link
                        to={item.link}
                        className="dropdown-item col-xl"
                        key={index}
                        onClick={() => setShowOffcanvas(false)}
                      >
                        <div className="card flex-xl-column flex-row align-items-center">
                          <div className="d-flex justify-content-center align-items-center px-3 pt-4 mb-2">
                            <div
                              className={`sprite-icon ${item.icon} w-50p`}
                            ></div>
                          </div>
                          <div className="card-body text-center pb-xl-5">
                            {item.text}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {/* Press Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="pressmenu"
                  role="button"
                  onClick={() => toggleDropdown("press")}
                  aria-expanded={showDropdown.press}
                >
                  Press
                </a>
                <div
                  className={`dropdown-menu${
                    showDropdown.press ? " show" : ""
                  }`}
                  aria-labelledby="pressmenu"
                >
                  <div className="row">
                    {[
                      {
                        link: permalinks.csr,
                        icon: "icon-users-bulding",
                        text: "CSR",
                      },
                      {
                        link: permalinks.events,
                        icon: "icon-calender-time",
                        text: "Events",
                      },
                      {
                        link: permalinks.coverages,
                        icon: "icon-page-turn",
                        text: "Coverages",
                      },
                      {
                        link: permalinks.certifications,
                        icon: "icon-certifications",
                        text: "Certifications",
                      },
                    ].map((item, index) => (
                      <Link
                        to={item.link}
                        className="dropdown-item col-xl-3"
                        key={index}
                        onClick={() => setShowOffcanvas(false)}
                      >
                        <div className="card flex-xl-column flex-row align-items-center">
                          <div className="d-flex justify-content-center align-items-center px-3 pt-4 mb-2">
                            <div
                              className={`sprite-icon ${item.icon} w-50p`}
                            ></div>
                          </div>
                          <div className="card-body text-center pb-xl-5">
                            {item.text}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={permalinks.whereToBuy}
                  onClick={() => setShowOffcanvas(false)}
                >
                  Where to Buy
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/blogs"
                  onClick={() => setShowOffcanvas(false)}
                >
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={permalinks.career}
                  onClick={() => setShowOffcanvas(false)}
                >
                  Career
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={permalinks.contact}
                  onClick={() => setShowOffcanvas(false)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="nav-btns nav-item ml-auto">
              <button
                className="btn btn-link btn-search d-none d-md-block rounded-0 navlink"
                onClick={() => setShowSearch(!showSearch)}
              >
                <i className="ti-search"></i>
              </button>
              {showSearch && (
                <div className="collapse show" id="searchdrop">
                  <form method="get" action={`${siteUrl}/`}>
                    <div className="input-group">
                      <input
                        type="text"
                        name="s"
                        placeholder="Enter your search here"
                        className="form-control rounded-0 h-100 py-3"
                      />
                      <button
                        className="btn btn-primary rounded-0"
                        type="submit"
                      >
                        Find
                      </button>
                    </div>
                    <div className="p-4 mx-auto text-center">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="post_type"
                          id="post_type_any"
                          value="any"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="post_type_any"
                        >
                          Any
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="post_type"
                          id="post_type_dealer"
                          value="dealer"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="post_type_dealer"
                        >
                          Dealers
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="post_type"
                          id="post_type_laminate"
                          value="laminate"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="post_type_laminate"
                        >
                          Laminates
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="post_type"
                          id="post_type_acp"
                          value="acp"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="post_type_acp"
                        >
                          ACP
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="post_type"
                          id="post_type_pvc"
                          value="pvc"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="post_type_pvc"
                        >
                          PVC
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="post_type"
                          id="post_type_plywood"
                          value="plywood"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="post_type_plywood"
                        >
                          Plywood
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="post_type"
                          id="post_type_aluminium"
                          value="aluminium"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="post_type_aluminium"
                        >
                          Aluminium
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mob_where_contact d-flex align-items-center d-md-none">
          <a href="/where-to-buy" className="where_buy_btn">
            Where to Buy
          </a>
          <span className="mx-2 text-white">|</span>
          <a href="tel:+911147422222">
            Contact Us <br /> 1147422222
          </a>
          <span className="mx-2 text-white">|</span>
          <button
            className="btn btn-link btn-search d-block d-md-none rounded-0 navlink"
            onClick={() => setShowSearch(!showSearch)}
          >
            <i className="ti-search"></i>
          </button>
          <span className="mx-2 text-white">|</span>
        </div>
      </nav>

      <section className="interior-section position-relative py-0">
        <img
          className="img-fluid w-100"
          src={interior}
          alt="Architect or Interior Designer"
        />
        <div className="architect-design">
          <div className="container">
            <div className="row align-items-center m-0">
              <div
                className="col-12 d-flex align-items-center justify-content-center"
                data-aos="fade-up"
                data-aos-duration="500"
                style={{ top: 5 }}
              >
                <h5 className="mt-2 mt-md-0 mb-0">
                  Are you an Architect or Interior Designer?
                </h5>
                <button
                  className="btn btn-secondary designer_arrow rounded-circle align-items-center justify-content-center d-flex ml-4"
                  data-bs-toggle="modal"
                  data-bs-target="#interior-modal"
                >
                  <i className="ti-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
