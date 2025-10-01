import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../assets/images/footer-logo.jpeg";
import {
  FaCopyright,
  FaArrowUp,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = ({ isHomePage }) => {
  // Simulated WordPress data
  const siteUrl = "https://www.virgolam.com";
  const templateDirectoryUri = "/wp-content/themes/virgo";
  const currentYear = new Date().getFullYear();

  // ✅ Secondary Menu (top bar)
  const secondaryMenu = [
    { title: "Home", url: "/" },
    { title: "About Virgo", url: "/about" },
    { title: "Mission, Vision and Values", url: "/mission-vision-values" },
    { title: "Initiatives for Environment", url: "/initiatives-environment" },
    { title: "CSR", url: "/csr" },
    { title: "Events", url: "/events" },
    { title: "Coverages", url: "/coverages" },
    { title: "Certifications", url: "/certifications" },
    { title: "Contact Us", url: "/contact" },
  ];

  // ✅ Footer Products Menu
  const footerProductsMenu = [
    { title: "Laminate", url: "/products/laminate" },
    { title: "ACP", url: "/products/acp" },
    { title: "PVC", url: "/products/pvc" },
    { title: "Plywood", url: "/products/plywood" },
    { title: "Aluminium", url: "/products/aluminium" },
    { title: "Pharma", url: "/products/pharma" },
    { title: "MDF", url: "/products/mdf" },
  ];

  // ✅ Footer Quick Links
  const footerQuickMenu = [
    { title: "Blogs", url: "/blogs" },
    { title: "Career", url: "/career" },
    { title: "Where to Buy", url: "/where-to-buy" },
    { title: "Company Profile", url: "/company-profile" },
    { title: "Privacy Policy", url: "/privacy-policy" },
    { title: "Company Policy", url: "/company-policy" },
  ];

  // Modal states
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showInteriorModal, setShowInteriorModal] = useState(false);

  // Scroll-to-top state
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Vertical gallery state
  const leftSliderRef = useRef(null);
  const rightSliderRef = useRef(null);
  const [lockedUp, setLockedUp] = useState(false);
  const [lockedDown, setLockedDown] = useState(false);

  // Simulated vertical gallery data
  const galleryItems = [
    {
      src: `${templateDirectoryUri}/assets/images/product-solution-laminate.jpg`,
      alt: "Manufacturer Of Home Decor Products",
    },
    {
      src: `${templateDirectoryUri}/assets/images/product-solution-pvc.jpg`,
      alt: "Home Decor Wholesale Suppliers",
    },
  ];

  // Initialize AOS and scroll-to-top
  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Vertical gallery settings
  const leftSliderSettings = {
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    infinite: true,
    dots: true,
    speed: 900,
    cssEase: "cubic-bezier(.42,0,.58,1)",
    touchThreshold: 30,
    touchMove: false,
    beforeChange: (current, next) => {
      const maxItems = galleryItems.length;
      if (current > next && next === 0 && current === maxItems - 1) {
        rightSliderRef.current.slickGoTo(-1);
        setLockedUp(true);
      } else if (current < next && current === 0 && next === maxItems - 1) {
        rightSliderRef.current.slickGoTo(maxItems);
        setLockedDown(true);
      } else {
        rightSliderRef.current.slickGoTo(maxItems - 1 - next);
      }
    },
    afterChange: (current) => {
      const maxItems = galleryItems.length;
      if (current === 0 && lockedUp) {
        setLockedUp(true);
      } else if (current === maxItems - 1 && lockedDown) {
        setLockedDown(true);
      } else {
        setLockedUp(false);
        setLockedDown(false);
      }
    },
  };

  const rightSliderSettings = {
    vertical: true,
    arrows: false,
    infinite: true,
    speed: 850,
    cssEase: "cubic-bezier(.42,0,.58,1)",
    initialSlide: galleryItems.length - 1,
    swipe: false,
    touchThreshold: 30,
    touchMove: false,
  };

  // Handle hoverimage
  const hoverImage = (bghoverimage) => {
    const bgElement = document.querySelector(".product-solution-bg");
    if (bgElement) {
      bgElement.style.backgroundImage = `url(${bghoverimage})`;
    }
  };

  return (
    <footer className="footer">
      <section className="pb-0">
        <div className="container pb-lg-5 pb-4">
          <div className="row">
            <div className="col-lg-3 col-12 d-flex flex-lg-column flex-row my-2 justify-content-lg-around justify-content-between align-items-lg-start align-items-center">
              <div className="mr-3">
                <Link to="/">
                  <img src={logo} alt="logo image" className="img-fluid logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6 my-3 justify-content-md-center d-flex">
              <ul className="nav flex-column">
                <h5 className="mb-5">Menu</h5>
                {secondaryMenu.map((item) => (
                  <li className="nav-item" key={item.title}>
                    <Link className="nav-link pl-0 py-1" to={item.url}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 col-6 my-3 justify-content-md-center d-flex">
              <ul className="nav flex-column">
                <h5 className="mb-5">Product</h5>
                {footerProductsMenu.map((item) => (
                  <li className="nav-item" key={item.title}>
                    <Link className="nav-link pl-0 py-1" to={item.url}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-5 my-3 justify-content-md-center d-flex">
              <ul className="nav flex-column">
                <h5 className="mb-5">Quick Links</h5>
                {footerQuickMenu.map((item) => (
                  <li className="nav-item" key={item.title}>
                    <Link className="nav-link pl-0 py-1" to={item.url}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row pt-2 align-items-center text-center">
              <div className="col-md-6 py-2 text-white">
                <FaCopyright className="mr-2" />
                {currentYear} All Right Reserved by Virgo Laminates Limited
              </div>
              <div className="col-md-2 py-2">
                <div className="footer-social d-flex justify-content-center">
                  <a
                    href="https://www.facebook.com/virgoindia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://x.com/VirgoLaminates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://www.instagram.com/virgolaminates?igsh=MXZ1bTV6a3NoN2J2bQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.youtube.com/@VirgoGroupofCompanies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/106634415"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
              <div className="col-md-4 py-2 text-white">
                Powered by{" "}
                <a
                  href="https://www.rocklime.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-rocklime"
                >
                  Rocklime
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <div
        className={`scroll-to-top ${showScrollToTop ? "" : "hide"}`}
        onClick={scrollToTop}
      >
        <button className="btn d-flex align-items-center justify-content-center text-white">
          <FaArrowUp />
        </button>
      </div>
      {/* Download Catalog Modal */}
      <button
        className="download-fixed-btn border-0"
        onClick={() => setShowCatalogModal(true)}
      >
        <div className="img-holder w-100">
          <img
            src={`${templateDirectoryUri}/assets/images/download-ecataugu.png`}
            alt="image"
            className="img-fluid"
          />
        </div>
      </button>
      <div
        className={`modal fade${showCatalogModal ? " show" : ""}`}
        id="catalogModal"
        tabIndex="-1"
        aria-labelledby="catalogModalLabel"
        aria-hidden={!showCatalogModal}
        style={{ display: showCatalogModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="catalogModalLabel">
                Request for Catalogue
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowCatalogModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control rounded-0 mb-4 py-4 border-dark"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0 mb-4 py-4 border-dark"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0 mb-4 py-4 border-dark"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showCatalogModal && <div className="modal-backdrop fade show"></div>}

      {/* Interior Modal */}
      <div
        className={`modal fade${showInteriorModal ? " show" : ""}`}
        id="interiorModal"
        tabIndex="-1"
        aria-labelledby="interiorModalLabel"
        aria-hidden={!showInteriorModal}
        style={{ display: showInteriorModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close p-3"
              onClick={() => setShowInteriorModal(false)}
              aria-label="Close"
            ></button>
            <div className="row">
              <div className="col-xl-6 p-0 d-none d-xl-block">
                <img
                  className="img-fluid"
                  src={`${templateDirectoryUri}/assets/images/interior.jpg`}
                  alt="interior"
                />
              </div>
              <div className="col-xl-6 align-self-center pr-0 pl-4 py-5">
                <div className="px-sm-3 px-1">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows={4}
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showInteriorModal && <div className="modal-backdrop fade show"></div>}

      {/* Vertical Gallery Slider (only on homepage) */}
      {isHomePage && (
        <div className="split-slideshow">
          <div className="slideshow slideshow-left">
            <Slider ref={leftSliderRef} {...leftSliderSettings}>
              {galleryItems.map((item, index) => (
                <div className="item" key={index}>
                  <h2>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="img-fluid w-100"
                    />
                  </h2>
                </div>
              ))}
            </Slider>
          </div>
          <div className="slideshow slideshow-right">
            <Slider ref={rightSliderRef} {...rightSliderSettings}>
              {galleryItems
                .slice()
                .reverse()
                .map((item, index) => (
                  <div className="item" key={index}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="img-fluid w-100"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
