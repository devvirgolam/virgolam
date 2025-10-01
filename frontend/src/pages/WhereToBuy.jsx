import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "../styles/wheretobuy.css";

const WhereToBuyPage = () => {
  // Simulated WordPress data
  const siteUrl = "https://www.virgolam.com";
  const templateDirectoryUri = "/wp-content/themes/virgo";
  const ajaxUrl = `${siteUrl}/wp-admin/admin-ajax.php`;

  // Simulated taxonomy data
  const productTerms = [
    {
      slug: "laminates",
      name: "Laminates",
      image: {
        url: `${templateDirectoryUri}/assets/images/laminates.jpg`,
        alt: "Laminates",
      },
    },
    {
      slug: "plywood",
      name: "Plywood",
      image: {
        url: `${templateDirectoryUri}/assets/images/plywood.jpg`,
        alt: "Plywood",
      },
    },
  ];

  const countryTerms = [
    {
      slug: "india",
      name: "India",
      image: {
        url: `${templateDirectoryUri}/assets/images/country/india.png`,
        alt: "India",
      },
    },
    {
      slug: "usa",
      name: "USA",
      image: {
        url: `${templateDirectoryUri}/assets/images/country/usa.png`,
        alt: "USA",
      },
    },
  ];

  const stateTerms = [
    {
      slug: "delhi",
      name: "Delhi",
      count: 10,
      image: {
        url: `${templateDirectoryUri}/assets/images/state/delhi.png`,
        alt: "Delhi",
      },
    },
    {
      slug: "maharashtra",
      name: "Maharashtra",
      count: 5,
      image: {
        url: `${templateDirectoryUri}/assets/images/state/maharashtra.png`,
        alt: "Maharashtra",
      },
    },
  ];

  // State management
  const [productSlug, setProductSlug] = useState("");
  const [countrySlug, setCountrySlug] = useState("");
  const [stateSlug, setStateSlug] = useState("");
  const [stateImage, setStateImage] = useState(
    `${templateDirectoryUri}/assets/images/country/india.png`
  );
  const [dealerCount, setDealerCount] = useState("");
  const [dealerResults, setDealerResults] = useState("");
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openDealers, setOpenDealers] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handle dealer fetch
  const fetchDealers = async (product, country, state) => {
    try {
      const response = await axios.post(ajaxUrl, {
        action: "myfilter",
        product,
        country,
        state,
      });
      setDealerResults(response.data);
      setOpenDealers(true);
    } catch (error) {
      console.error("AJAX Error:", error);
      setDealerResults(
        '<p class="text-danger">An error occurred. Please try again later.</p>'
      );
      setOpenDealers(true);
    }
  };

  // Handle product selection
  const handleProductSelect = (slug) => {
    setProductSlug(slug);
    setOpenCountry(true);
    setOpenState(false);
    setOpenDealers(false);
    setStateSlug("");
    setDealerResults("");
  };

  // Handle country selection
  const handleCountrySelect = (slug) => {
    setCountrySlug(slug);
    setOpenState(true);
    setOpenDealers(false);
    setStateSlug("");
    setDealerResults("");
  };

  // Handle state selection
  const handleStateSelect = (slug, image, count) => {
    setStateSlug(slug);
    setStateImage(image);
    setDealerCount(count > 0 ? `${count}+ Dealers` : "No Dealers");
    if (slug) {
      fetchDealers(productSlug, countrySlug, slug);
    }
  };

  return (
    <main className="page-wrapper where-to-buy-page">
      <section className="where-to-buy-tabs bg-white py-2">
        <div className="container where-to-buy-tabs">
          <div
            className="row justify-content-center"
            style={{ paddingTop: "150px" }}
          >
            <div
              className="pb-5 text-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1 className="main-heading mb-0">
                Where to{" "}
                <span className="px-3 pt-1 bg-primary text-white">Buy</span>
              </h1>
              <h4>Find a dealer near you</h4>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mx-auto">
              <div className="tab-content">
                <h5
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <span className="px-3 pt-1 bg-primary text-white">
                    Select the Product
                  </span>
                </h5>
                <div
                  className="col-12"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <input
                    type="hidden"
                    id="product_slug"
                    name="product_slug"
                    value={productSlug}
                  />
                  <ul className="product-nav nav-tabs">
                    {productTerms.map((product) => (
                      <li key={product.slug} className="nav-item">
                        <a
                          href="#collapsecountry"
                          className="nav-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleProductSelect(product.slug);
                          }}
                          data-product-slug={product.slug}
                        >
                          <div className="card">
                            <img
                              src={product.image.url}
                              alt={product.image.alt}
                              className="card-img-top"
                            />
                            <div className="card-body">
                              <div className="name">{product.name}</div>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`collapse ${openCountry ? "show" : ""}`}
                  id="collapsecountry"
                >
                  <div className="country-filter my-5">
                    <div className="country-filter-inner">
                      <input
                        type="hidden"
                        id="country_slug"
                        name="country_slug"
                        value={countrySlug}
                      />
                      <ul className="country-nav nav-pills">
                        {countryTerms.map((country) => (
                          <li key={country.slug} className="nav-item mx-1">
                            <a
                              href="#collapsestate"
                              className="nav-link text-success bg-gray"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCountrySelect(country.slug);
                              }}
                              data-country-slug={country.slug}
                              data-image={country.image.url}
                            >
                              <img
                                src={country.image.url}
                                alt={country.image.alt}
                                width="30px"
                              />
                              <span className="name">{country.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className={`collapse ${openState ? "show" : ""}`}
                  id="collapsestate"
                >
                  <div className="state-filter" style={{ marginBottom: "10%" }}>
                    <div className="state-filter-row">
                      <div className="state-image-col d-md-block d-none">
                        <img
                          src={stateImage}
                          alt="state"
                          className="img-fluid"
                          id="state-filter-image"
                        />
                      </div>
                      <div className="state-filter-col">
                        {/* Mobile State Filter */}
                        <div className="d-block d-md-none">
                          <select
                            id="mobile-state-dropdown"
                            className="form-control"
                            aria-label="Select a state"
                            onChange={(e) => {
                              const selected = stateTerms.find(
                                (state) => state.slug === e.target.value
                              );
                              if (selected) {
                                handleStateSelect(
                                  selected.slug,
                                  selected.image.url,
                                  selected.count
                                );
                              }
                            }}
                          >
                            <option value="">Select a State</option>
                            {stateTerms.map((state) => (
                              <option
                                key={state.slug}
                                value={state.slug}
                                data-image={state.image.url}
                                data-dealer-count={
                                  state.count > 0
                                    ? `${state.count}+ Dealers`
                                    : "No Dealers"
                                }
                              >
                                {state.name}
                              </option>
                            ))}
                          </select>
                          <div
                            id="mobile-dealer-count"
                            className="text-primary mt-2"
                          >
                            {dealerCount}
                          </div>
                        </div>

                        {/* Desktop State Filter */}
                        <div className="d-none d-md-block">
                          <div className="sidebar-state-filter bg-light p-2">
                            <div className="list-group" id="desktop-state-list">
                              {stateTerms.map((state) => (
                                <a
                                  key={state.slug}
                                  href="#"
                                  className="list-group-item"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleStateSelect(
                                      state.slug,
                                      state.image.url,
                                      state.count
                                    );
                                  }}
                                  data-image={state.image.url}
                                  data-state={state.slug}
                                >
                                  {state.name}
                                  <span className="badge">
                                    {state.count > 0 ? state.count : 0}
                                  </span>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`collapse ${openDealers ? "show" : ""}`}
                      id="collapsedealers"
                    >
                      <div
                        id="dealerResults"
                        dangerouslySetInnerHTML={{ __html: dealerResults }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhereToBuyPage;
