import React, { useEffect } from "react";
import { Nav, Tab, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryPvc = ({
  postContent = `<h2 class="main-heading" data-aos="fade-up" data-aos-duration="1000">PVC LAMINATES</h2>
<p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">Virgolam presents eco-friendly PVC laminates that can beautify your interiors with its highly attractive prints and finish. Available in myriad designs, colours and textures, these decorative PVC laminates can give a new and chic outlook to any surface. Besides being decorative, PVC sheets by Virgolam are corrosion and weather proof and termite resistant with 90-degree flexibility. Available in 1mm thickness, Virgolam, one of the leading PVC Panel Suppliers offers the Laminates in two broad categories: Sparkling solid and Patterned. Easy to apply on a good quality substrate and easy to clean, the laminates are perfect way to revamp your interior space.</p>`,
  thumbnailUrl = "/assets/images/product/pvc/thumbnail.png",
  permalinks = {
    laminates: "/laminates",
    acp: "/acp",
    pvc: "/pvc",
    plywood: "/plywood",
    aluminium: "/aluminium",
    mdf: "/mdf",
  },
  categoryLink = "/category/pvc",
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
                    <Nav.Link as={Link} to={permalinks.pvc} active>
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
                  alt="PVC Sheet Manufacturers & Suppliers"
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
              <Nav
                className="col-xl-11 col-lg-11 mx-auto justify-content-center"
                id="myTab"
                role="tablist"
              >
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link eventKey="catalogues" active>
                    <span className="sprite-icon icon-pages-book w-50p mx-auto"></span>
                    <span>Catalogue</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link as={Link} to={categoryLink}>
                    <span className="sprite-icon icon-four-boxes w-50p mx-auto"></span>
                    <span>PVC</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link eventKey="why-choose">
                    <span className="sprite-icon icon-question-circle w-50p mx-auto"></span>
                    <span>Why choose</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link eventKey="degree-90-bendable">
                    <span className="sprite-icon icon-90-rotate-arrow w-50p mx-auto"></span>
                    <span>90% Bendable</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="col-lg col-auto">
                  <Nav.Link eventKey="applications">
                    <span className="sprite-icon icon-search-boxes w-50p mx-auto"></span>
                    <span>Applications</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            <Tab.Content
              className="py-3"
              id="nav-tabContent"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="200"
            >
              <Tab.Pane eventKey="catalogues" active>
                <div className="col-md-9 col-lg-8 mx-auto text-center">
                  <h3 className="mb-3 text-uppercase main-heading">
                    Catalogue
                  </h3>
                </div>
                <div className="section pt-0">
                  <div className="container">
                    <div className="row justify-content-center">
                      {[
                        {
                          href: "/catalogue/3mm-pvc/",
                          img: "/assets/images/catalogue/3mm-pvc.png",
                          title: "3MM PVC",
                        },
                        {
                          href: "/catalogue/moments-pvc/",
                          img: "/assets/images/catalogue/moments-pvc.png",
                          title: "Moments PVC",
                        },
                        {
                          href: "/catalogue/virgo-corby-pvc-laminates/",
                          img: "/assets/images/catalogue/virgo-corby-pvc laminates.png",
                          title: "Virgo Corby PVC Laminates",
                        },
                        {
                          href: "/catalogue/virgo-croma-pvc/",
                          img: "/assets/images/catalogue/virgo-croma-pvc.png",
                          title: "Virgo Croma PVC",
                        },
                      ].map((item, index) => (
                        <div className="col-md-4 col-sm-6 py-3" key={index}>
                          <div className="img-holder col-md-9 mx-auto">
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={item.img}
                                alt={item.title}
                                className="img-fluid w-100"
                              />
                              <div className="box text-center">
                                <h6 className="py-3">{item.title}</h6>
                              </div>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="why-choose">
                <div className="section pt-0">
                  <div className="container">
                    <div className="row col-xl-11 col-lg-11 mx-auto justify-content-center text-center">
                      {[
                        { icon: "icon-insect-cross", text: "Borer Resistant" },
                        {
                          icon: "icon-small-insect-cross",
                          text: "Termite Resistant",
                        },
                        { icon: "icon-ice-sun", text: "Corrosion Resistant" },
                        { icon: "icon-water-sheild", text: "Water Resistant" },
                        {
                          icon: "icon-hand-printer-wall",
                          text: "Easy to Clean",
                        },
                        { icon: "icon-stain-sheild", text: "Stain Resistant" },
                        {
                          icon: "icon-emission-free",
                          text: "Harmful Emission Free",
                        },
                        {
                          icon: "icon-world-leaf",
                          text: "Environment Friendly",
                        },
                      ].map((item, index) => (
                        <div className="col-auto" key={index}>
                          <span
                            className={`sprite-icon ${item.icon} w-50p`}
                          ></span>
                          <div>{item.text}</div>
                        </div>
                      ))}
                    </div>
                    <div className="row section pb-0 col-xl-10 col-lg-11 mx-auto">
                      <div className="col-12 text-center">
                        <p>
                          Artists invented the first pigments-a combination of
                          soil, animal fat, burnt charcoal and chalk-as early as
                          40,000 years ago, creating a basic palette of five
                          colours: red, yellow, brown, black and white. From
                          that time to now millions of colours developed. Each
                          colour has unique story, let’s sparkle it. The
                          honeycomb design on breakfast cereal, the fleur-de-lis
                          spikes on an iron gate, a constellation of guilloche
                          spirals on our banknotes-if we look close enough, most
                          of our built environment is embossed or embellished
                          with some kind of pattern. But behind those everyday
                          patterns are surprising, sometimes scandalous stories.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="degree-90-bendable">
                <div className="section pt-0">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <img
                        src="/assets/images/product/pvc/virgo-pvc_-90-degree_03.png"
                        alt="image"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="mb-2 bg-primary text-white p-3">
                        PVC 90° BENDABLE TECHNOLOGY
                      </div>
                      <div className="mb-1 bg-lighter-light p-3">
                        Don’t you hate the harsh & cheap looking edges of
                        kitchen cabinets, wardrobes, beds, etc?
                      </div>
                      <div className="mb-1 bg-lighter-light p-3">
                        Then sit back and relax, we have found a solution for
                        this problem. Use our PVC 90° Bendable PVC laminates and
                        forget the visible edgy joints. With 90° bend PVC
                        laminates you can simply bend the PVC laminates and give
                        your interiors a stylish & adorable looks.
                      </div>
                      <div className="mb-1 bg-lighter-light p-3">
                        You can simply use V-Groove Cutter by giving a groove of
                        0.3 mm to 0.5 mm for bending the sheet up-to 90 degrees.
                        For any further enquiry,
                      </div>
                      <div className="mb-1 bg-lighter-light p-3">
                        Do not hesitate to contact us. We would love to serve
                        you.
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="applications" className="pvc-application">
                <div className="row">
                  <div className="col-lg-1 d-flex justify-content-center">
                    <h2 className="main-heading heading-md mt-lg-0 pb-lg-3 pb-5 text-center">
                      APPLICATION PROCEDURE
                    </h2>
                  </div>
                  <div className="col-lg-11 d-flex justify-content-center">
                    <div className="row">
                      {[
                        {
                          title: "ADHESIVE",
                          text: "It is easy to apply with the standard Laminates system, conventional adhesives (water/solvent base) normally used with plastic Laminates. Heat activated adhesive are not preferable.",
                        },
                        {
                          title: "LAMINATION",
                          text: "Proper substrates must be used and bonding procedures must be observed carefully. Substrates should be of good quality plywood, high density particle board or high quality fiber board and must be smooth and free of grease, wax, dust, chips and others foreign matter.",
                        },
                        {
                          title: "BENDING & FORMING",
                          text: "It can be bend and all radius bending should be handled in the same manner as all grades of non post farming decorative Laminates. Kindly use special blade to bend the sheets at 90 degree.",
                        },
                        {
                          title: "CUTTING & MACHINING",
                          text: "It can be cut, routed and drilled, with most standard wood working tools or equipments. All blades must be sharp, to remove any burrs that may occur in the cutting process, we recommend the use of smooth file to feather all edges.",
                        },
                        {
                          title: "MAINTENANCE",
                          text: "Any cleaning agent containing acids, alkalis or abrasive should not be used to clean. Exposure to sunlight should be avoided. Remove protective film after installation.",
                        },
                        {
                          title: "WARRANTY",
                          text: "Colour-shade may vary lot to lot. Inspect properly before cutting, altering or pasting. Company’s liability is limited to the cost of product only.",
                        },
                      ].map((item, index) => (
                        <div
                          className="col-lg-4 col-sm-6 mb-sm-5 mb-4 d-flex"
                          key={index}
                        >
                          <Card>
                            <Card.Body>
                              <Card.Title className="pb-1 my-3">
                                <span className="pt-2 d-block">
                                  {item.title}
                                </span>
                              </Card.Title>
                              <p className="pt-2">{item.text}</p>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
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

export default CategoryPvc;
