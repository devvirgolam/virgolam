import React, { useEffect } from "react";
import { Nav, Tab, Card, Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryACP = ({
  postContent = "",
  thumbnailUrl = "/assets/images/product/acp/price.png",
  faqs = [
    { id: 1, title: "FAQ 1", content: "Content for FAQ 1" },
    { id: 2, title: "FAQ 2", content: "Content for FAQ 2" },
  ],
  permalinks = {
    laminates: "/laminates",
    acp: "/acp",
    pvc: "/pvc",
    plywood: "/plywood",
    aluminium: "/aluminium",
    mdf: "/mdf",
  },
}) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);

  return (
    <main className="page-wrapper product-page">
      {/* Product Tabs */}
      <section class="product-tabs custom-tabs">
        <div class="container text-center">
          <div class="row custom-transparent">
            <div class="col-12">
              <div data-aos="fade-up" data-aos-duration="1000">
                <ul class="nav nav-pills justify-content-center">
                  <li class="nav-item">
                    <a class="nav-link" href="<?= get_the_permalink('7'); ?>">
                      <span class="sprite-icon icon-layers w-50p"></span>
                      <div>Laminates</div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="<?= get_the_permalink('15'); ?>"
                    >
                      <span class="sprite-icon icon-brickes-wall w-50p"></span>
                      <div>ACP</div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="<?= get_the_permalink('164'); ?>">
                      <span class="sprite-icon icon-pappers w-50p"></span>
                      <div>PVC</div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="<?= get_the_permalink('11'); ?>">
                      <span class="sprite-icon icon-first-layer w-50p"></span>
                      <div>Plywood</div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="<?= get_the_permalink('9'); ?>">
                      <span class="sprite-icon icon-roll-papper w-50p"></span>
                      <div>Aluminium</div>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a
                      class="nav-link "
                      href="<?= get_the_permalink('166'); ?>"
                    >
                      <span class="sprite-icon icon-first-layer w-50p"></span>
                      <div>MDF</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-8 col-md-10 mx-auto py-5">
              <h2
                class="main-heading"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                ALUMINIUM COMPOSITE PANEL (ACP) Sheets
              </h2>
              <p
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="200"
              >
                <strong>Aluminium Composite Panel</strong> or ACP is a flat pane
                made up of two thinly coated aluminium sheets with a core
                polyethylene stuffed in between the two sheets. Virgolam, one of
                the largest <strong>ACP Sheet Manufacturer</strong> based in
                India offers premium quality <strong>ACP panels</strong> in a
                visually striking palette and textures. Ideal for external
                cladding, interior application and signage, the panels by{" "}
                <a href="https://www.virgolam.com/">
                  <strong>Virgolam</strong>
                </a>{" "}
                help create visual aesthetics that enhance the appearance of any
                space. Highly durable, stain-resistant, and weatherproof, these{" "}
                <strong>ACP sheets</strong> are the epitome of our creativity
                and hard work.
              </p>
            </div>
            <div
              class="col-12 mx-auto pb-3"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1>
                <img
                  src=""
                  alt="Aluminium Composite Panel Manufacturers & Suppliers"
                  class="img-fluid w-100"
                />
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section class="tabs-to-be-toggle pb-0">
        <div class="product-filter bg-white">
          <div class="container">
            <div
              class="product-categories section"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <ul class="nav justify-content-center" id="myTab" role="tablist">
                <li class="nav-item col-lg col-auto">
                  <a
                    class="nav-link active"
                    id="catalogues-tab"
                    data-toggle="tab"
                    href="#catalogues"
                    role="tab"
                    aria-controls="catalogues"
                    aria-selected="false"
                  >
                    <span class="sprite-icon icon-pages-book w-50p mx-auto"></span>
                    <span>Catalogue</span>
                  </a>
                </li>
                <li class="nav-item col-lg col-auto">
                  <a
                    class="nav-link"
                    href="<?php echo get_category_link('8'); ?>"
                  >
                    <span class="sprite-icon icon-four-boxes w-50p mx-auto"></span>
                    <span>ACP</span>
                  </a>
                </li>
                <li class="nav-item col-lg col-auto">
                  <a
                    class="nav-link"
                    id="why-choose-tab"
                    data-toggle="tab"
                    href="#why-choose"
                    role="tab"
                    aria-controls="why-choose"
                    aria-selected="true"
                  >
                    <span class="sprite-icon icon-question-circle w-50p mx-auto"></span>
                    <span>Why choose</span>
                  </a>
                </li>
                <li class="nav-item col-lg col-auto">
                  <a
                    class="nav-link"
                    id="applications-tab"
                    data-toggle="tab"
                    href="#applications"
                    role="tab"
                    aria-controls="applications"
                    aria-selected="false"
                  >
                    <span class="sprite-icon icon-search-boxes w-50p mx-auto"></span>
                    <span>Applications</span>
                  </a>
                </li>
                <li class="nav-item col-lg col-auto">
                  <a
                    class="nav-link"
                    id="price-tab"
                    data-toggle="tab"
                    href="#price"
                    role="tab"
                    aria-controls="price"
                    aria-selected="false"
                  >
                    <span class="sprite-icon icon-price-tag w-50p mx-auto"></span>
                    <span>Price</span>
                  </a>
                </li>
                <li class="nav-item col-lg col-auto">
                  <a
                    class="nav-link"
                    id="offer-tab"
                    data-toggle="tab"
                    href="#offer"
                    role="tab"
                    aria-controls="offer"
                    aria-selected="false"
                  >
                    <span class="sprite-icon icon-hand-holding-right-check w-50p mx-auto"></span>
                    <span>What We Offer</span>
                  </a>
                </li>
                <li class="nav-item col-lg col-auto">
                  <a
                    class="nav-link"
                    id="faq-tab"
                    data-toggle="tab"
                    href="#faq"
                    role="tab"
                    aria-controls="faq"
                    aria-selected="false"
                  >
                    <span class="sprite-icon icon-message-questions w-50p mx-auto"></span>
                    <span>Faq</span>
                  </a>
                </li>
              </ul>
            </div>

            <div
              class="tab-content py-3"
              id="nav-tabContent"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="200"
            >
              <div
                class="tab-pane fade show active"
                id="catalogues"
                role="tabpanel"
                aria-labelledby="catalogues-tab"
              >
                <div class="col-md-9 col-lg-8 mx-auto text-center">
                  <h3 class="mb-3 text-uppercase main-heading">Catalogue</h3>
                </div>
                <div class="section pt-0">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-acp/"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-acp.png"
                              alt=""
                              class="img-fluid w-100"
                            />
                            <div class="box text-center">
                              <h6 class="py-3">Virgo ACP</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-cladding/"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/cladding.png"
                              alt="cladding"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">Virgo Cladding</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="why-choose"
                role="tabpanel"
                aria-labelledby="why-choose-tab"
              >
                <div class="section pt-0">
                  <div class="text-center col-sm-9 mx-auto">
                    <h2 class="main-heading">Why Choose ACP Sheet?</h2>
                    <p>
                      No material is as flexibile as the ACP Sheets, Moreover,
                      It is a modern age material that comes up with lots of
                      practicle and technical advantages over traditional
                      materials.
                    </p>
                  </div>
                  <div class="row section justify-content-center pb-0">
                    <div class="col-xl-auto col-auto">
                      <div class="box text-center">
                        <span class="sprite-icon icon-sheild-check w-50p mx-auto"></span>
                        <h6 class="py-3">Light Weight</h6>
                      </div>
                    </div>

                    <div class="col-xl-auto col-auto">
                      <div class="box text-center">
                        <span class="sprite-icon icon-cicle-boxes w-50p mx-auto"></span>
                        <h6 class="py-3">
                          Variety of <br /> Colors & textures
                        </h6>
                      </div>
                    </div>

                    <div class="col-xl-auto col-auto">
                      <div class="box text-center">
                        <span class="sprite-icon icon-hand-closed w-50p mx-auto"></span>
                        <h6 class="py-3">Durable</h6>
                      </div>
                    </div>

                    <div class="col-xl-auto col-auto">
                      <div class="box text-center">
                        <span class="sprite-icon icon-user-labor w-50p mx-auto"></span>
                        <h6 class="py-3">Easy to Install</h6>
                      </div>
                    </div>

                    <div class="col-xl-auto col-auto">
                      <div class="box text-center">
                        <span class="sprite-icon icon-pencil-rular w-50p mx-auto"></span>
                        <h6 class="py-3">Easy to Maintain</h6>
                      </div>
                    </div>

                    <div class="col-xl-auto col-auto">
                      <div class="box text-center">
                        <span class="sprite-icon icon-boxes-layers w-50p mx-auto"></span>
                        <h6 class="py-3">Flexible</h6>
                      </div>
                    </div>

                    <div class="col-xl-auto col-auto">
                      <div class="box text-center">
                        <span class="sprite-icon icon-ruppees-sign w-50p mx-auto"></span>
                        <h6 class="py-3">Cost-Effective</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="applications"
                role="tabpanel"
                aria-labelledby="applications-tab"
              >
                <div class="col-md-9 col-lg-8 mx-auto text-center">
                  <h3 class="mb-3 text-uppercase main-heading">
                    Applications of ACP Sheet
                  </h3>
                </div>
                <div class="row col-xl-10 mx-auto section pt-3">
                  <div class="col-lg-6 p-2 d-flex">
                    <div class="card bg-light p-sm-5 p-4 text-center border-0 rounded-0">
                      <span class="sprite-icon icon-watering-shape-wall w-60p mx-auto"></span>
                      <h3>Facade or cladding</h3>
                      <p>
                        The Simplicity, Great Evenness, The lightweight of it
                        and the most Stretched out Shading Choices make Virgo
                        ACP a Designer’s Delight. ACP Panels can be used for
                        cladding in the external architecture as well as in
                        interiors due to its high durability and flexibility.
                        Our ACP Sheets can withstand rigorous wear and tear
                        being UV Resistant and extends the lifespan of the
                        establishment.
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6 p-2 d-flex">
                    <div class="card bg-light p-sm-5 p-4 text-center border-0 rounded-0">
                      <span class="sprite-icon icon-blockes-breaking w-60p mx-auto"></span>
                      <h3>Partitions</h3>
                      <p>
                        All the office structures these days want to use the
                        available floor space to the highest optimum levels. And
                        to achieve this, they use internal partitions. The
                        material which is in demand for being used in making
                        these partitions are ACP Panels by Virgo. ACP is also
                        one of the most cost effective variant among the range
                        of partition materials. Therefore, it is widely used
                        material in the construction world.
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6 p-2 d-flex">
                    <div class="card bg-light p-sm-5 p-4 text-center border-0 rounded-0">
                      <span class="sprite-icon icon-letter-box w-60p mx-auto"></span>
                      <h3>Signage</h3>
                      <p>
                        Virgo ACP Sheet products have always emerged as the best
                        in creating one-of-its-kind signages. Virgo ACP
                        encompasses all the major Aluminum signage materials for
                        all of your signboard design needs. Our ACP can be used
                        to make a range of versatile outdoor signages because
                        signage and hoardings are used for outside applications
                        and it need to withstand the temperature & weather
                        changes. Therefore, in this case ACP is the ideal
                        material to cater these applications.
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6 p-2 d-flex">
                    <div class="card bg-light p-sm-5 p-4 text-center border-0 rounded-0">
                      <span class="sprite-icon icon-house-pen-pencil w-60p mx-auto"></span>
                      <h3>Interiors</h3>
                      <p>
                        Virgo also offers world class building materials for all
                        your interior application requirements such as facial
                        panels, column covers, furniture, display units canopy
                        etc. With an extraordinary range of finishes available
                        at Virgo ACP, it has become extremely easy to create
                        wardrobes, bookshelves as well as other furniture units
                        from Virgo ACP as these are elegant and beautiful albeit
                        being durable, water & stain resistant and light weight.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="price"
                role="tabpanel"
                aria-labelledby="price-tab"
              >
                <div class="section pt-0">
                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <img
                        src="<?php echo get_template_directory_uri(); ?>/assets/images/product/acp/price.png"
                        alt="image"
                        class="img-fluid w-100"
                      />
                    </div>
                    <div class="col-md-6">
                      <h3 class="main-heading">ACP Sheet Price</h3>
                      <p>
                        Want to have a dynamic look for your building? Come to
                        your own Virgo Group, we have designed ACP sheets as per
                        your needs and demands with very affordable ACP sheet
                        price in India. That means you will be investing in ACP
                        sheet once, but you will be witnessing their lasting
                        impact for years. ACP cladding in India by the best
                        aluminium composite panel manufacturers livens up a
                        building by augmenting its style quotient. However, most
                        people compromise with the ACP sheets quality due to the
                        high price. But, no worries, we understand your feelings
                        and value them at the same time. Therefore, we have
                        brought to you the best quality and colorful sheet range
                        with wallet-friendly ACP sheet price per sqft.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade offer-tab"
                id="offer"
                role="tabpanel"
                aria-labelledby="offer-tab"
              >
                <div class="  ">
                  <h2 class="text-uppercase h1 main-heading py-0">
                    What we offer
                  </h2>
                </div>
                <div class="row section pt-0">
                  <div class="col-xl-3 col-md-6 mb-3 px-2 d-flex">
                    <div class="card bg-light p-sm-5 p-4 text-center border-0 rounded-0">
                      <span class="sprite-icon icon-technology w-60p mx-auto"></span>
                      <h5 class="py-2">Advanced Technology</h5>
                      <p>
                        At Virgo, we use advanced technology to take care of our
                        clients as well as our productivity in order to meet our
                        Client’s Requirements.
                      </p>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-6 mb-3 px-2 d-flex">
                    <div class="card bg-light p-sm-5 p-4 text-center border-0 rounded-0">
                      <span class="sprite-icon icon-user-setting w-60p mx-auto"></span>
                      <h5 class="py-2">Expert Engineers</h5>
                      <p>
                        We have a team of talented expert engineers and amazing
                        architects who will find a way to make all the dreams of
                        Excellent Interior & Exterior Designs come true.
                      </p>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-6 mb-3 px-2 d-flex">
                    <div class="card bg-light p-sm-5 p-4 text-center border-0 rounded-0">
                      <span class="sprite-icon icon-user-advice w-60p mx-auto"></span>
                      <h5 class="py-2">Customer Support</h5>
                      <p>
                        A customer-centric approach has been instilled in the
                        staff at Virgo to improve relationships with customers.
                        They are trained and experienced to handle all queries
                        and concerns.{" "}
                      </p>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-6 mb-3 px-2 d-flex">
                    <div class="card bg-light p-sm-5 p-4 text-center border-0 rounded-0">
                      <span class="sprite-icon icon-clock-ven w-60p mx-auto"></span>
                      <h5 class="py-2">On Time Delivery</h5>
                      <p>
                        We are adhered to deliver on time as per the
                        requirements of the clients and that material delivery
                        always remained and will always remain on priority for
                        our business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="faq"
                role="tabpanel"
                aria-labelledby="faq-tab"
              >
                <div className="section pt-0">
                  <Accordion defaultActiveKey="faq1">
                    {faqs.map((faq, index) => (
                      <Card
                        key={faq.id}
                        className="border-0 px-5 bg-light rounded-0 mb-xl-3 mb-lg-2 mb-1"
                      >
                        <Accordion.Item eventKey={`faq${faq.id}`}>
                          <Accordion.Header
                            as={Card.Header}
                            id={`heading-faq${faq.id}`}
                            className="bg-none p-0"
                          >
                            <Button
                              variant="link"
                              className="py-4 h5 m-0 btn-block text-left text-decoration-none"
                            >
                              {faq.title}
                            </Button>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div
                              className="card-body py-4 my-2"
                              dangerouslySetInnerHTML={{ __html: faq.content }}
                            />
                          </Accordion.Body>
                        </Accordion.Item>
                      </Card>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryACP;
