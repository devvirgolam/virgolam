import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/error.css";
const NotFoundPage = () => {
  // Simulated WordPress data
  const siteUrl = "https://www.example.com"; // Replace with your site's URL
  const templateDirectoryUri = "/wp-content/themes/your-theme"; // Replace with your theme's directory

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init();
    // Load Owl Carousel and Slick if needed
    // Note: These libraries may require additional setup or jQuery
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <main className="error-page bg-white text-center py-5">
      <section className="position-relative">
        <Container className="min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
          <div className="text-content px-3 px-md-0">
            <h1 className="display-1 text-danger fw-bold">404</h1>
            <h2 className="h4 text-muted">
              Oops! The page you're looking for doesn’t exist.
            </h2>
            <p className="lead mt-3 mb-4 text-black-50">
              Try using the search bar or go back to the{" "}
              <Link to="/" className="text-primary fw-bold">
                Homepage
              </Link>
              .
            </p>
            <Button
              as={Link}
              to="/"
              variant="primary"
              className="rounded px-4 py-2"
            >
              Go to Homepage
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default NotFoundPage;
