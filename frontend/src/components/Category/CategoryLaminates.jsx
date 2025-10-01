import React, { useEffect } from "react";
import { Nav, Tab, Card, Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryLaminates = ({
  postContent = `<h2 class="main-heading" data-aos="fade-up" data-aos-duration="1000">Laminates</h2>
<p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">VIRGO Laminates are made of different layers of impregnated decorative papers and kraft papers through the combined action of heat (140°/150° C) and high pressure (&lt; 7 Mpa) for about 30/30 minutes of Heating and cooling.
VIRGO <a class="hyperlinks" href="https://virgolam.com/laminates/"><strong>Laminates</strong></a> are pure Phenolic/Melamine with uniform &amp; superior sanding ensures best bonding with Substrates.</p>
<p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">Available Sizes: 6’x14’ - 6’x12’ - 5’x12’ - 4.25’x10’ – 4’x10’ – 4’x8’ And with all cut sizes.</p>
<p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400"><strong>Available in 2000+ designs &amp; 250 + Textures.</strong></p>

<div class="row laminate-descriptions">
<div class="col-md-4" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="600">

<strong>Categories:-</strong>
<ul>
 	<li>High Pressure Laminates
<ol>
 	<li>Decorative Laminates</li>
 	<li>Post Forming Laminates</li>
</ol>
</li>
 	<li>Performance Laminates
<ol>
 	<li>FR Grade Laminates</li>
 	<li>Chemical Resistant Laminates</li>
 	<li>Electrostatic Discharge Laminates (ESD)</li>
</ol>
</li>
 	<li>Specialty Laminates
<ol>
 	<li>Spot less (Anti fingers)</li>
 	<li>Synchronized</li>
 	<li>Unicolor</li>
</ol>
</li>
</ul>
</div>
<div class="col-md-4" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="600">

<strong>Compacts Laminates:-</strong>
<ul>
 	<li>Compacts (2 mm to 30 mm)</li>
 	<li>Cubico Restroom Solution)</li>
 	<li>Wall Claddings</li>
</ul>
</div>
<div class="col-md-4" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="600">

<strong>Our Categories in Laminates:-</strong>
<ul>
 	<li>Virgo Mica, Virgo Lam</li>
 	<li>Virgo Croma</li>
 	<li>Virgo Corby</li>
 	<li>Virgo Abco</li>
 	<li>Virgo Looks Lam</li>
 	<li>Virgo Hanger</li>
 	<li>Virgo Croma Verona</li>
 	<li>Virgo Cladding</li>
 	<li>Virgo Cubico – Cubicles</li>
</ul>
</div>
</div>`,
  thumbnailUrl = "/assets/images/product/laminates/thumbnail.png",
  faqs = [], // Optional: FAQs for Laminates
  applications = [], // Optional: Applications data
  permalinks = {
    laminates: "/laminates",
    acp: "/acp",
    pvc: "/pvc",
    plywood: "/plywood",
    aluminium: "/aluminium",
    mdf: "/mdf",
  },
  categoryLink = "/category/laminates",
}) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);

  return (
    <main className="page-wrapper product-page">
      {/* Product Tabs */}
      <section className="product-tabs custom-tabs">
        <div className="container text-center">
          <div className="row custom-transparent">
            <div className="col-12">
              <div data-aos="fade-up" data-aos-duration="1000">
                <Nav className="nav-pills justify-content-center">
                  <Nav.Item>
                    <Nav.Link as={Link} to={permalinks.laminates} active>
                      <span className="sprite-icon icon-layers w-50p"></span>
                      <div>Laminates</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to={permalinks.acp}>
                      <span className="sprite-icon icon-brickes-wall w-50p"></span>
                      <div>ACP</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to={permalinks.pvc}>
                      <span className="sprite-icon icon-pappers w-50p"></span>
                      <div>PVC</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to={permalinks.plywood}>
                      <span className="sprite-icon icon-first-layer w-50p"></span>
                      <div>Plywood</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to={permalinks.aluminium}>
                      <span className="sprite-icon icon-roll-papper w-50p"></span>
                      <div>Aluminium</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to={permalinks.mdf}>
                      <span className="sprite-icon icon-first-layer w-50p"></span>
                      <div>MDF</div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
            <div className="col-lg-9 col-md-10 mx-auto py-5">
              <div dangerouslySetInnerHTML={{ __html: postContent }} />
            </div>
            <div
              className="col-12 mx-auto pb-3"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <h1>
                <img
                  src={thumbnailUrl}
                  alt="Laminate Sheet Suppliers & Manufacturers"
                  className="img-fluid w-100"
                />
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="tabs-to-be-toggle pb-0">
        <div className="product-filter bg-white">
          <div className="container">
            <div
              className="product-categories section"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <Nav className="justify-content-center" id="myTab" role="tablist">
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link eventKey="catalogues" active>
                    <span className="sprite-icon icon-pages-book w-50p mx-auto"></span>
                    <span>Catalogue</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link as={Link} to={categoryLink}>
                    <span className="sprite-icon icon-four-boxes w-50p mx-auto"></span>
                    <span>Laminate</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link eventKey="why-choose">
                    <span className="sprite-icon icon-question-circle w-50p mx-auto"></span>
                    <span>Why choose</span>
                  </Nav.Link>
                </Nav.Item>
                {applications.length > 0 && (
                  <Nav.Item className="col-lg col-auto">
                    <Nav.Link eventKey="applications">
                      <span className="sprite-icon icon-search-boxes w-50p mx-auto"></span>
                      <span>Applications</span>
                    </Nav.Link>
                  </Nav.Item>
                )}
                {faqs.length > 0 && (
                  <Nav.Item className="col-lg col-auto">
                    <Nav.Link eventKey="faq">
                      <span className="sprite-icon icon-message-questions w-50p mx-auto"></span>
                      <span>Faq</span>
                    </Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </div>

            <Tab.Content
              className="py-3"
              id="nav-tabContent"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="200"
            >
              <Tab.Pane eventKey="catalogues" active className="catalogues-tab">
                <div class="col-md-9 col-lg-8 mx-auto text-center">
                  <h3 class="mb-3 text-uppercase main-heading">Catalogues</h3>
                </div>
                <div class="section pt-0">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgolam-plus-2/"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgolam-plus-2.png"
                              alt="virgo-mica"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">Virgolam Plus 2</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-abco-mica-2024-25/"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-abco-mica-2024-25.png"
                              alt="virgo-abco-mica-2024-25"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">
                                Virgo Abco Mica 2024-25
                              </h6>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/croma-1mm"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/croma-1mm-new.png"
                              alt="virgo-croma-laminates-2023"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">Croma 1mm</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-abco-lam-new"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-abco-lam-new.png"
                              alt="virgo-croma-laminates-2023"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">
                                Virgo Abco Lam New
                              </h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-croma-ecatalogue"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-chroma-ecatalogue.png"
                              alt="virgo-croma-laminates-2023"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">
                                Virgo Croma E-Catalogue
                              </h6>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-abco-lam"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-abco-lam.png"
                              alt="virgo-studio"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">Virgo ABCO Lam</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-blinco"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-blinco.png"
                              alt="virgo-studio"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">Virgo Blinco</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-corby"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-corby.png"
                              alt="virgo-studio"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">Virgo Corby</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-looks-plus"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-looks-plus.png"
                              alt="virgo-studio"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">Virgo Looks+</h6>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-the-game"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-the-game.png"
                              alt="virgo-studio"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">Virgo The Game</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-mica"
                            target="_new"
                          >
                            <img
                              src="<?php echo get_template_directory_uri(); ?>/assets/images/catalogue/virgo-mica.png"
                              alt="virgo-studio"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">Virgo Mica</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/chroma-doordecor-1mm/"
                            target="_new"
                          >
                            <img
                              src="https://virgolam.com/wp-content/uploads/2025/09/2.png"
                              alt="virgo-abco-mica-2024-25"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">
                                Chroma Doordecor 1MM
                              </h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-blinco-premium-laminates-catlog-0.92mm/"
                            target="_new"
                          >
                            <img
                              src="https://virgolam.com/wp-content/uploads/2025/09/1-2.png"
                              alt="virgo-abco-mica-2024-25"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">
                                Virgo Blinco Premium Laminates Catlog 0.92MM
                              </h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-corby-15x15-1mm/"
                            target="_new"
                          >
                            <img
                              src="https://virgolam.com/wp-content/uploads/2025/09/4-1.png"
                              alt="virgo-abco-mica-2024-25"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">
                                Virgo Corby 15x15 1MM
                              </h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-doordecor-0.92mm/"
                            target="_new"
                          >
                            <img
                              src="https://virgolam.com/wp-content/uploads/2025/09/virgo-doordecor-0.92mm-2.png"
                              alt="virgo-abco-mica-2024-25"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">
                                Virgo Doordecor 0.92MM
                              </h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-6 py-3">
                        <div class="img-holder col-md-9 mx-auto">
                          <a
                            href="<?= site_url(); ?>/catalogue/virgo-next-liner-0.7mm/"
                            target="_new"
                          >
                            <img
                              src="https://virgolam.com/wp-content/uploads/2025/09/virgo-doordecor-0.92mm-2.png"
                              alt="virgo-abco-mica-2024-25"
                              class="img-fluid"
                            />
                            <div class="box text-center">
                              <h6 class="py-3 text-center">
                                Virgo Next Liner 0.7MM
                              </h6>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="why-choose">
                <div className="section pt-0">
                  <div className="text-center col-sm-9 mx-auto">
                    <h2 className="main-heading">Why Choose Laminate Sheet?</h2>
                    <p>
                      No material is as flexible as the Laminate Sheets.
                      Moreover, it is a modern age material that comes up with
                      lots of practical and technical advantages over
                      traditional materials.
                    </p>
                  </div>
                  <div className="row section justify-content-center pb-0">
                    {[
                      { icon: "icon-sheild-check", text: "Light Weight" },
                      {
                        icon: "icon-cicle-boxes",
                        text: "Variety of <br> Colors & textures",
                      },
                      { icon: "icon-hand-closed", text: "Durable" },
                      { icon: "icon-user-labor", text: "Easy to Install" },
                      { icon: "icon-pencil-rular", text: "Easy to Maintain" },
                      { icon: "icon-boxes-layers", text: "Flexible" },
                      { icon: "icon-ruppees-sign", text: "Cost-Effective" },
                    ].map((item, index) => (
                      <div className="col-xl-auto col-auto" key={index}>
                        <div className="box text-center">
                          <span
                            className={`sprite-icon ${item.icon} w-50p mx-auto`}
                          ></span>
                          <h6
                            className="py-3"
                            dangerouslySetInnerHTML={{ __html: item.text }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Pane>
              {applications.length > 0 && (
                <Tab.Pane eventKey="applications">
                  <div className="col-md-9 col-lg-8 mx-auto text-center">
                    <h3 className="mb-3 text-uppercase main-heading">
                      Applications of Laminate Sheet
                    </h3>
                  </div>
                  <div className="row col-xl-10 mx-auto section pt-3">
                    {applications.map((item, index) => (
                      <div className="col-lg-6 p-2 d-flex" key={index}>
                        <Card className="bg-light p-sm-5 p-4 text-center border-0 rounded-0">
                          <span
                            className={`sprite-icon ${item.icon} w-60p mx-auto`}
                          ></span>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </Card>
                      </div>
                    ))}
                  </div>
                </Tab.Pane>
              )}
              {faqs.length > 0 && (
                <Tab.Pane eventKey="faq">
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
                                dangerouslySetInnerHTML={{
                                  __html: faq.content,
                                }}
                              />
                            </Accordion.Body>
                          </Accordion.Item>
                        </Card>
                      ))}
                    </Accordion>
                  </div>
                </Tab.Pane>
              )}
            </Tab.Content>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryLaminates;
