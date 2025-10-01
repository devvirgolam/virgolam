import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AOS from "aos";

const ContactPage = () => {
  // Simulated WordPress data
  const siteUrl = "https://virgolam.com";
  const templateDirectoryUri = "/wp-content/themes/virgo";
  const dealerPageId = 21; // Simulated page ID for dealer's network

  // Simulated breadcrumb data
  const breadcrumbs = [
    { title: "Home", url: "/" },
    { title: "Contact", url: "/contact" },
  ];

  // International office data
  const internationalOffices = [
    {
      country: "Singapore",
      image: `${templateDirectoryUri}/assets/images/contact/singapore.png`,
      alt: "SINGAPORE",
      name: "Virgo Pacific Pte Ltd",
      address: "5 Sungei Kadut St 2, #06-02 Trendspace, Singapore 729227",
      email: "sg@virgoasia.com",
      phone: "+65 6250 4111",
      fax: "+65 62655070",
    },
    {
      country: "Malaysia - Johor",
      image: `${templateDirectoryUri}/assets/images/contact/malesiajohor.png`,
      alt: "MALAYSIA JOHOR",
      name: "Virgo Pacific Sdn Bhd",
      address:
        "No. 5, Jalan Mutiara Emas 5/25, Taman Mount Austin, 81100 Johor Bahru, Johor, Malaysia",
      email: "my@virgoasia.com",
      phone: "+60 7570 1269",
      fax: "+60 75701265",
    },
    {
      country: "Thailand",
      image: `${templateDirectoryUri}/assets/images/contact/thailand.png`,
      alt: "THAILAND",
      name: "Virgo Pacific (Thailand) Co. Ltd.",
      address: "110/1 Moo 7 Lahan, Bang Bua Thong, Nonthaburi, Thailand 11110",
      email: "th@virgoasia.com",
      phone: "+66 2017 4111",
      fax: "+66 2017 4119",
    },
    {
      country: "Malaysia - Selangor",
      image: `${templateDirectoryUri}/assets/images/contact/malesiastelangor.png`,
      alt: "MALAYSIA SELANGOR",
      name: "Virgo Pacific Sdn Bhd",
      address:
        "14 Jalan TSB2, Taman Industri Sungai Buloh, 47000 Sungai Buloh, Selangor, Malaysia",
      email: "sg@virgoasia.com",
      phone: "+60 3 7496 7677",
      fax: "+60 37494 3877",
    },
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main className="page-wrapper contact-page">
      {/* Get in Touch Section */}
      <section className="get-in-touch">
        <div className="container">
          <div className="row">
            <div className="breadcrumb">
              <div
                className="breadcrumbs"
                vocab="https://schema.org/"
                typeof="BreadcrumbList"
              >
                {breadcrumbs.map((crumb, index) => (
                  <span key={index}>
                    <Link to={crumb.url}>{crumb.title}</Link>
                    {index < breadcrumbs.length - 1 && " > "}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div
              className="col-12 text-center"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <h1 className="main-heading text-uppercase">Get in Touch</h1>
            </div>
          </div>
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="400"
          >
            <div
              className="col-lg-5 col-md-6 col-sm-10"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <form>
                <div className="form-group mb-1">
                  <input
                    type="text"
                    id="name"
                    name="your-name"
                    className="form-control py-md-4 py-3 rounded-0"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="form-group mb-1">
                  <input
                    type="tel"
                    id="phone"
                    name="your-phone"
                    className="form-control py-md-4 py-3 rounded-0"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="form-group mb-1">
                  <input
                    type="email"
                    id="email"
                    name="your-email"
                    className="form-control py-md-4 py-3 rounded-0"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="form-group mb-1">
                  <input
                    type="text"
                    id="city"
                    name="your-city"
                    className="form-control py-md-4 py-3 rounded-0"
                    placeholder="City"
                    required
                  />
                </div>

                <div className="form-group mb-1">
                  <textarea
                    id="message"
                    name="your-message"
                    className="form-control py-md-4 py-3 rounded-0"
                    rows="3"
                    placeholder="Message"
                    required
                  />
                </div>

                <div className="form-group mb-1 text-center pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Office Section */}
      <section className="main-office pt-0 pb-md-0">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="1000">
            <img
              src={`${templateDirectoryUri}/assets/images/contact/phone.jpg`}
              alt="GET IN TOUCH"
              className="img-fluid w-100"
            />
          </div>
          <div className="row justify-content-between main-address-content">
            <div
              className="col-md-5 text-right py-lg-5 py-md-3 py-4 pr-md-0"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <h3 className="text-primary text-uppercase">Head Office</h3>
              <p className="mb-0">
                Plot No.-828, Industrial Area,
                <br />
                Phase-2, Chandigarh - 160002
              </p>
              <p className="mb-0">PH:- +91-172-4011111, 2639222-333</p>
              <p className="mb-0">Fax:- +91-172-2639444</p>
            </div>
            <div
              className="col-md-6 text-left py-lg-5 py-md-3 py-4 pl-md-5"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <h3 className="text-primary text-uppercase">Corporate Office</h3>
              <h5>Virgo Group</h5>
              <p className="mb-0">
                406, Rectangle 1, Saket District Centre,
                <br />
                Saket, New Delhi, 110017
              </p>
              <p className="mb-0">PH:- +91-11-47422222</p>
            </div>
          </div>
        </div>
      </section>

      {/* International Office Section */}
      <section className="international-office">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-12 text-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h2 className="text-uppercase">International Office</h2>
            </div>
          </div>
          <div className="row justify-content-center international-office-address-content text-center">
            {internationalOffices.map((office, index) => (
              <div
                key={index}
                className="col-md-3 col-sm-6 py-3"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="card-box">
                  <div>
                    <img
                      src={office.image}
                      alt={office.alt}
                      className="img-fluid col-lg-8 col-md-12 col-sm-6 col-6 mx-auto"
                    />
                    <h6 className="text-primary text-uppercase mt-3">
                      {office.country}
                    </h6>
                    <p className="mb-0">
                      {office.name}
                      <br />
                      {office.address.split(",").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                    <p className="mb-0">
                      E:- <a href={`mailto:${office.email}`}>{office.email}</a>
                    </p>
                    <p className="mb-0">P:- {office.phone}</p>
                    <p className="mb-0">Fax:- {office.fax}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="text-center mt-5 pt-md-4 pb-5 pb-lg-0"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Link to="/dealers-network" className="btn btn-primary rounded">
              Check Dealer's Network
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
