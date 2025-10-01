import React, { useEffect } from "react";
import { Nav, Tab, Card, Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryPlywood = ({
  postContent = "",
  thumbnailUrl = "/assets/images/product/plywood/thumbnail.png",
  faqs = [], // Array of FAQs
  plywoodTypes = [
    // Example structure for plywood types
    {
      id: 1,
      slug: "plywood-type-1",
      title: "Plywood Type 1",
      thumbnailUrl: "/assets/images/plywood/type1.png",
      content: `<h2 class="main-heading" data-aos="fade-up" data-aos-duration="1000">Plywood</h2>
<p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">Plywood by Virgolam is made of premium quality natural wood with the best wood refining and bonding process. The result is an exclusive range of plywood categories, which are used in various different applications. Virgolam, one of the leading Plywood Manufacturers in India brings to its customers an elite product range including General plywood, Block Board, Shuttering plywood, Marine plywood, Flexi plywood and Chequered plywood. Made up of thin layers of wood bonded together with a strong adhesive, each type of plywood has distinct application offering strength and style to any surface.</p>`,
      menuImage: "/assets/images/plywood/menu-type1.png",
      applicationDescription: "Used in furniture, construction, etc.",
      technicalSpecifications: "<table>...</table>",
    },
    // Add more plywood types as needed
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
      <section className="product-tabs custom-tabs">
        <div className="container text-center">
          <div className="row custom-transparent">
            <div className="col-12">
              <div data-aos="fade-up" data-aos-duration="1000">
                <Nav className="nav-pills justify-content-center">
                  <Nav.Item>
                    <Nav.Link as={Link} to={permalinks.laminates}>
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
                    <Nav.Link as={Link} to={permalinks.plywood} active>
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
            <div
              className="col-lg-8 col-md-10 mx-auto py-5"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div dangerouslySetInnerHTML={{ __html: postContent }} />
            </div>
            <div
              className="col-12 mx-auto pb-3"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1>
                <img
                  src={thumbnailUrl}
                  alt="Plywood Suppliers & Manufacturers In India"
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
                  <Nav.Link eventKey="categories" active>
                    <span className="sprite-icon icon-four-boxes w-50p mx-auto"></span>
                    <span>Plywood</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link eventKey="catalogues">
                    <span className="sprite-icon icon-pages-book w-50p mx-auto"></span>
                    <span>Catalogues</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link eventKey="faq">
                    <span className="sprite-icon icon-message-questions w-50p mx-auto"></span>
                    <span>Faq</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            <Tab.Content className="py-3" id="nav-tabContent">
              <Tab.Pane eventKey="categories" active>
                <div
                  className="product-categories"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <Nav
                    className="justify-content-center pt-4 pb-4"
                    id="myTab"
                    role="tablist"
                  >
                    {plywoodTypes.map((type, index) => (
                      <Nav.Item key={type.id}>
                        <Nav.Link eventKey={type.slug} active={index === 0}>
                          <img
                            src={type.menuImage}
                            alt={type.title}
                            className="img-fluid"
                          />
                          <span>{type.title}</span>
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </div>
                <Tab.Content className="pt-3">
                  {plywoodTypes.map((type, index) => (
                    <Tab.Pane
                      eventKey={type.slug}
                      key={type.id}
                      className={`fade ${index === 0 ? "show active" : ""}`}
                    >
                      <div className="card border-0 text-center justify-content-center">
                        <div
                          className="img-holder"
                          data-aos="zoom-in"
                          data-aos-duration="1000"
                        >
                          <img
                            src={type.thumbnailUrl}
                            alt={type.title}
                            className="img-fluid w-100"
                          />
                        </div>
                        <div className="py-md-5 py-3 px-4 col-md-10 mx-auto">
                          <div
                            dangerouslySetInnerHTML={{ __html: type.content }}
                          />
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-xl-11 px-xl-1 pt-3">
                          <h3
                            className="text-danger bottom-gray-line pt-2 mb-2 text-uppercase"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                          >
                            Applications
                          </h3>
                          <p data-aos="fade-up" data-aos-duration="1000">
                            {type.applicationDescription}
                          </p>
                          <div className="custom-accordion">
                            <Card data-aos="fade-up" data-aos-duration="1000">
                              <Card.Header>
                                <h5 className="mb-0 sub-heading">
                                  Technical Specification
                                </h5>
                              </Card.Header>
                              <Card.Body className="overflow-x-scroll">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: type.technicalSpecifications,
                                  }}
                                />
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Pane>
              <Tab.Pane eventKey="catalogues" className="catalogues-tab">
                <div className="col-md-9 col-lg-8 mx-auto text-center">
                  <h3 className="mb-3 text-uppercase main-heading">
                    Catalogues
                  </h3>
                </div>
                <div className="section pt-0">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-4 col-sm-6 py-3">
                        <div className="img-holder col-md-9 mx-auto">
                          <a href="javascript:void(0);">
                            <img
                              src="/assets/images/catalogue/catalogue-coming-soon.png"
                              alt="Plywood"
                              className="img-fluid w-100"
                            />
                            <div className="box text-center">
                              <h6 className="py-3">Plywood</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
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
                            <div className="card-body py-4 my-2">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: faq.content,
                                }}
                              />
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Card>
                    ))}
                  </Accordion>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryPlywood;
