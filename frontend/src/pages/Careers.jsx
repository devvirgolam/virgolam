import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

const CareerPage = () => {
  // Simulated WordPress data
  const siteUrl = "https://virgolam.com";
  const templateDirectoryUri = "/wp-content/themes/virgo";
  const bannerImage = `${siteUrl}/wp-content/uploads/2025/08/career-banner.jpg`; // Replace with actual banner image URL
  const careerManImage = `${templateDirectoryUri}/assets/images/career-man.png`;

  // File input handling
  const fileInputRef = useRef(null);
  const fileLabelRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });

    // File input change handler
    const handleFileChange = (e) => {
      const fileName = e.target.files[0]?.name || "No file chosen";
      if (fileLabelRef.current) {
        fileLabelRef.current.innerText = fileName;
      }
    };

    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.addEventListener("change", handleFileChange);
    }

    // Cleanup event listener
    return () => {
      if (fileInput) {
        fileInput.removeEventListener("change", handleFileChange);
      }
    };
  }, []);

  return (
    <main className="page-wrapper career-page">
      {/* BANNER */}
      <section className="card py-0">
        <img
          src={bannerImage}
          alt="Career Banner"
          className="card-img-top img-fluid w-100 p-0"
        />
        <div className="card-img-overlay">
          <h1
            className="text-uppercase text-white pt-5 mt-5 h3 aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            Career
          </h1>
        </div>
      </section>
      {/* /BANNER */}

      {/* BREADCRUMB */}
      <section className="pb-0">
        <div className="container">
          <div className="row">
            <div className="breadcrumb">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Career
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* /BREADCRUMB */}

      {/* CAREER FORM */}
      <section className="career-form position-relative">
        <div
          className="career-man d-none d-lg-block"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <img src={careerManImage} alt="career image" className="img-fluid" />
        </div>
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-duration="1000">
            <div className="col-xl-9 col-lg-8">
              <h2 className="h3">SEND US YOUR APPLICATION</h2>
              <h4 className="text-primary h5">APPLICATION FORM</h4>
              <p className="py-3">
                Candidates interested can submit their application by filling
                out the Contact Form and attaching a detailed curriculum vitae,
                accompanied by authorization for the processing of their
                personal data.
              </p>
            </div>
          </div>
          <div className="row" data-aos="fade-up" data-aos-duration="1000">
            <div className="col-lg-7">
              <form className="career-form-content">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
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
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="custom-file-upload-input"
                    className="form-label"
                  >
                    Upload CV
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input form-control"
                      id="custom-file-upload-input"
                      ref={fileInputRef}
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      className="custom-file-label"
                      ref={fileLabelRef}
                      htmlFor="custom-file-upload-input"
                    >
                      Choose file
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="dataConsent"
                      required
                    />
                    <label className="form-check-label" htmlFor="dataConsent">
                      I authorize the processing of my personal data.
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareerPage;
