import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import { Modal, Button } from "react-bootstrap"; // For modal
// Imported Newsletter component
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "aos/dist/aos.css"; // AOS CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Font Awesome
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

// Sample data (replace with API data)
const pageData = {
  title: "Coverages",
  thumbnailUrl: "https://example.com/coverages-banner.jpg",
  thumbnailAlt: "Coverages Banner",
  content: "<p>This is the content for the Coverages page.</p>",
};

const galleryImages = [
  {
    id: "1",
    url: "https://example.com/gallery-image-1.jpg",
    alt: "Gallery Image 1",
    largeUrl: "https://example.com/gallery-image-1-large.jpg",
  },
  {
    id: "2",
    url: "https://example.com/gallery-image-2.jpg",
    alt: "Gallery Image 2",
    largeUrl: "https://example.com/gallery-image-2-large.jpg",
  },
  // Add more images as needed
];

const CoveragesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleShow = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };
  const handleClose = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <main className="page-wrapper events-page">
      {/* BANNER */}
      <section className="card py-0">
        <img
          src={pageData.thumbnailUrl}
          alt={pageData.thumbnailAlt}
          className="card-img-top img-fluid w-100 p-0"
        />
        <div className="card-img-overlay">
          {/* Uncomment if needed */}
          {/* <h1
            className="text-uppercase text-white pt-5 mt-5 aos-init aos-animate h3"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            Coverages
          </h1> */}
        </div>
      </section>
      {/* /BANNER */}

      {/* BREADCRUMBS */}
      <section className="pt-3 pb-0 breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="breadcrumb">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Coverages
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* /BREADCRUMBS */}

      {/* EVENTS ALBUM */}
      <section className="pt-2 events-album position-relative">
        <div className="container">
          <div className="col-md-9 col-lg-8 mx-auto text-center">
            <h1
              className="mb-3 text-uppercase main-heading"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {pageData.title}
            </h1>
          </div>
          <div className="row px-3 gallery">
            {galleryImages.map((image) => (
              <div
                className="col-md-4 col-sm-4 col-6 overflow py-3"
                key={image.id}
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <a href="#!" onClick={() => handleShow(image)}>
                  <img
                    className="img-fluid w-100 scale1"
                    src={image.largeUrl}
                    alt={image.alt}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-text">
                      <FontAwesomeIcon icon={faSearchPlus} />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* /EVENTS ALBUM */}

      {/* COVERAGES MODAL */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        size="xl"
        aria-labelledby="Coverages-modalTitle"
      >
        <Modal.Body className="bg-light-gray">
          <Button
            variant="link"
            className="close"
            onClick={handleClose}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </Button>
          <div className="row p-4">
            <div className="col-lg-6">
              <img
                className="historystep-image img-fluid w-100"
                src={
                  selectedImage?.largeUrl ||
                  "https://www.virgolam.com/wp-content/uploads/2020/12/coverages_image.jpg"
                }
                alt={selectedImage?.alt || "Coverage Image"}
              />
            </div>
            <div className="col-lg-6 d-flex align-items-center text-center">
              <div className="w-100">
                <div>
                  <p
                    className="text-dark"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default CoveragesPage;
