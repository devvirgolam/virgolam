import React, { useEffect } from "react";
import { Nav, Tab, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryAluminium = ({
  postContent = "",
  thumbnailUrl = "/assets/images/product/aluminium/thumbnail.png",
  aluminiumTypes = [
    // Example structure for aluminium types
    {
      id: 1,
      slug: "aluminium-type-1",
      title: "Aluminium Type 1",
      content: `<h2 class="main-heading" data-aos="fade-up" data-aos-duration="1000">ALUMINIUM</h2>
<p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">At Virgolam, we offer quality, design, systems and environmental commitment with our range of aluminium products. We are a renowned Aluminium plate manufacturer and other aluminium products with customers all across the globe. Our wide range of aluminium products includes Rolled Sheets, Rolled Coils, Building Sheets, Closure Stock, Chequered Plates and Caul Board Sheet. Each product is packed meticulously and has quite versatile applications. They can be used from commercial purpose and indoor, outdoor application to, false ceiling, roof-on-roof roofing, bus flooring, cabins etc. </p>`,
      thumbnailUrl: "/assets/images/aluminium/type1.png",
      featuresName: "Features",
      featuresDescriptions: "<p>Key features of Aluminium Type 1...</p>",
      types: [
        {
          type_name: "Type A",
          type_descriptions: "<p>Description of Type A...</p>",
        },
        {
          type_name: "Type B",
          type_descriptions: "<p>Description of Type B...</p>",
        },
      ],
    },
    // Add more aluminium types as needed
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
                    <Nav.Link as={Link} to={permalinks.plywood}>
                      <span className="sprite-icon icon-first-layer w-50p"></span>
                      <div>Plywood</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to={permalinks.aluminium} active>
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
            <div className="col-lg-8 col-md-10 mx-auto py-5">
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
                  alt="Aluminum Sheet Supplier & Manufacturers"
                  className="img-fluid w-100"
                />
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section class="tabs-to-be-toggle pb-0">
        <div class="product-filter bg-white">
          <div class="container">
            <div
              class="product-categories section"
              data-aos="fade-up"
              data-aos-duration="1400"
              data-aos-delay="400"
            >
              <ul class="nav justify-content-center" id="myTab" role="tablist">
                <li class="nav-item col-lg col-auto">
                  <a
                    class="nav-link active"
                    id="categories-tab"
                    data-toggle="tab"
                    href="#categories"
                    role="tab"
                    aria-controls="categories"
                    aria-selected="false"
                  >
                    <span class="sprite-icon icon-four-boxes w-50p mx-auto"></span>
                    <span>Aluminium</span>
                  </a>
                </li>
                <li class="nav-item col-lg col-auto">
                  <a
                    class="nav-link"
                    id="catalogues-tab"
                    data-toggle="tab"
                    href="#catalogues"
                    role="tab"
                    aria-controls="catalogues"
                    aria-selected="false"
                  >
                    <span class="sprite-icon icon-pages-book w-50p mx-auto"></span>
                    <span>Catalogues</span>
                  </a>
                </li>
              </ul>
            </div>

            <Tab.Content className="py-3" id="nav-tabContent">
              <Tab.Pane eventKey="categories" active>
                <div className="product-filter bg-white pt-lg-0">
                  <div className="container">
                    <div
                      className="product-categories"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <Nav
                        className="justify-content-center"
                        id="myTab"
                        role="tablist"
                      >
                        {aluminiumTypes.map((type, index) => (
                          <Nav.Item key={type.id}>
                            <Nav.Link eventKey={type.slug} active={index === 0}>
                              <img
                                src={type.thumbnailUrl}
                                alt={type.title}
                                className="img-fluid"
                              />
                              <span>{type.title}</span>
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                    </div>

                    <Tab.Content className="py-3">
                      {aluminiumTypes.map((type, index) => (
                        <Tab.Pane
                          eventKey={type.slug}
                          key={type.id}
                          className={`fade ${index === 0 ? "show active" : ""}`}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: type.content }}
                          />
                          <div className="col-xl-12 px-xl-0 pt-3">
                            <h3
                              className="text-danger bottom-gray-line pt-2 mb-2 text-uppercase"
                              data-aos="fade-up"
                              data-aos-duration="1000"
                            >
                              {type.featuresName}
                            </h3>
                            <div
                              className="text-black"
                              data-aos="fade-up"
                              data-aos-duration="1200"
                              data-aos-delay="200"
                              dangerouslySetInnerHTML={{
                                __html: type.featuresDescriptions,
                              }}
                            />
                          </div>
                          <Nav
                            variant="pills"
                            className="d-flex justify-content-lg-around col-md-9 mx-auto mb-3 py-4"
                            id="pills-tab"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                          >
                            {type.types.map((subType, subIndex) => {
                              const subTypeSlug = `${
                                type.slug
                              }-${subType.type_name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`;
                              return (
                                <Nav.Item key={subIndex}>
                                  <Nav.Link
                                    eventKey={subTypeSlug}
                                    active={subIndex === 0}
                                    className="my-1"
                                  >
                                    {subType.type_name}
                                  </Nav.Link>
                                </Nav.Item>
                              );
                            })}
                          </Nav>
                          <Tab.Content id="pills-tabContent">
                            {type.types.map((subType, subIndex) => {
                              const subTypeSlug = `${
                                type.slug
                              }-${subType.type_name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`;
                              return (
                                <Tab.Pane
                                  eventKey={subTypeSlug}
                                  key={subIndex}
                                  className={`fade ${
                                    subIndex === 0 ? "show active" : ""
                                  }`}
                                >
                                  <div className="col-xl-12 px-xl-0 pt-3">
                                    <div
                                      className="custom-accordion"
                                      data-aos="fade-up"
                                      data-aos-duration="1200"
                                    >
                                      <Card>
                                        <Card.Body className="overflow-x-scroll">
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: subType.type_descriptions,
                                            }}
                                          />
                                        </Card.Body>
                                      </Card>
                                    </div>
                                  </div>
                                </Tab.Pane>
                              );
                            })}
                          </Tab.Content>
                        </Tab.Pane>
                      ))}
                    </Tab.Content>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="catalogues">
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
                              alt="Aluminium"
                              className="img-fluid w-100"
                            />
                            <div className="box text-center">
                              <h6 className="py-3">Aluminium</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryAluminium;
