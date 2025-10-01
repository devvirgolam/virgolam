import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Nav, Card, Modal, Button } from "react-bootstrap";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const AboutPage = () => {
  // Simulated WordPress data
  const siteUrl = "https://www.virgolam.com";
  const templateDirectoryUri = "/wp-content/themes/virgo";

  // Navigation tabs
  const navLinks = [
    { id: 62, title: "About Virgo", slug: "virgo" },
    { id: 64, title: "Mission Vision and Values", slug: "mission" },
    { id: 66, title: "Initiatives for Environment", slug: "environment" },
  ];

  // Simulated data for each page
  const aboutVirgoData = {
    thumbnail: `${templateDirectoryUri}/assets/images/about-virgo.jpg`,
    content: `
    <p>
      The Virgo Group of companies constantly looks out for innovation and challenges in industry,
      which it meets with its passion to excel in whatever it does. Across all its group companies,
      it maintains a philosophy of reaching out to perfection, no matter what it takes—whether
      high-end resources or a superlative manpower. 
    </p>
    <p>
      With a team size of over 3000+ employees, Virgo Group’s employees all over India continue
      to work together in a rewarding environment to achieve the objectives the company was
      founded upon.
    </p>
    <p>
      Long before there were government-issued regulations concerning the protection of the environment,
      Virgo Group had already invested in “Environment Friendly” initiatives. These included reforestation
      programs and elimination of the use of tropical woods and harmful, ozone-damaging chemicals.
    </p>
    <p>
      Weighing its actions on a philosophical pedestal, Virgo today has evolved into a firm that has been
      generating optimum profit through total satisfaction of customers, suppliers, employees and society.
    </p>
    <p>
      A recipient of the ISO 14001 certifications, Virgo Group continues to invest in new technologies
      that can reduce the environmental impact of its manufacturing processes. Why? Because it is the right thing to do.
    </p>
  `,
    features: [
      {
        title: "R&D Innovation",
        content: `
        <p>
          The group is spread across 6 different verticals in diverse industries and products, with
          a motto to serve the end user with quality products.
        </p>
        <ul>
          <li><strong>1993</strong>: Virgo was founded by Late Shri Ram Prakash Arora, starting with plywood manufacturing.</li>
          <li><strong>1997</strong>: Production of Ply & Boards began in Barwala, Punjab.</li>
          <li><strong>2000</strong>: First laminates production unit started in Derabassi, Punjab, revolutionizing India’s laminate industry.</li>
          <li><strong>2005</strong>: Second laminate plant opened in Kala Amb, Himachal Pradesh.</li>
          <li><strong>2010</strong>: Entered the aluminium industry with a capacity of 2500 tons/month.</li>
          <li><strong>2015</strong>: High-capacity laminates facility set up in Bhiwadi, Rajasthan.</li>
          <li><strong>2017</strong>: International branches opened, expanding global demand.</li>
        </ul>

        <p>
          To boost exports and expand manufacturing, a 95-acre township project was established in Ahmedabad.
          India’s first <strong>A2 Grade ACP panels</strong> were launched along with PVC laminates.
        </p>
        <ul>
          <li><strong>2018</strong>: New plant set up in Hindupur, Andhra Pradesh (South India).</li>
          <li><strong>2018</strong>: Diversified into Pharma by acquiring Higgs Healthcare in Baddi, Himachal.</li>
          <li><strong>2019</strong>: Aluminium capacity expanded to 5000 tons/month, making Virgo the 3rd largest aluminium producer in India.</li>
        </ul>

        <p><strong>Big-size laminates (up to 14ft x 6ft) production began at Ahmedabad with a focus on exports.</strong></p>
        <ul>
          <li><strong>2021</strong>: Specialty laminates launched — Hanger collection, Verona collection, restroom cubicles, and exterior grade laminates.</li>
        </ul>

        <p><strong>Infrastructure Highlights:</strong></p>
        <ul>
          <li>25 HPL presses</li>
          <li>Largest laminate sizes: 8x4, 9x4, 9x4.25, 10x4, 10x4.25, 12x4, 12x5, 12x6, 14x5, 14x6</li>
          <li>Thickness range: 0.5mm to 30mm</li>
          <li>3 in-house ultramodern CNC machines</li>
          <li>All laminates are pure phenolic with superior sanding for best bonding</li>
        </ul>

        <p><strong>PVC Laminates Infrastructure:</strong></p>
        <ul>
          <li>Super gloss & seamless look — 90° bendable for edge-free finishes</li>
          <li>Produced entirely in-house under “Make in India” initiative</li>
          <li>Capacity: 1.05 lakh sheets/month</li>
          <li>400+ designs, 25+ textures</li>
          <li>Thickness: 1.2mm to 3mm</li>
          <li>Lead-free, eco-friendly</li>
        </ul>

        <p><strong>Aluminium Division:</strong></p>
        <ul>
          <li>Total capacity: 7500+ tons/month</li>
          <li>Manufacturing area: 50 acres</li>
          <li>Alloys: 1XXX, 3XXX, 5XXX, 8XXX</li>
          <li>Thickness: 0.10mm – 6mm | Width: 60mm – 1550mm | Length: up to 6m</li>
          <li>Colour coating: Triple Bake Triple Coat</li>
          <li>Heavy duty cut-to-length capacity: 2000 tons/month</li>
          <li>Rolling mill speed: 800 RPM</li>
          <li>10 furnaces (30 tons/day each), 5 annealing furnaces</li>
        </ul>

        <p><strong>ACP Division:</strong></p>
        <ul>
          <li>India’s first A2 Grade ACP with Korean technology</li>
          <li>Production capacity: 30 lakh sq. ft.</li>
          <li>25,000+ projects completed globally</li>
          <li>Special grades: A2, Class B FR with 200+ in-house tests</li>
          <li>Sizes: 8x4 to 16x5 | Thickness: 2mm – 8mm</li>
        </ul>
      `,
        image: {
          url: `${templateDirectoryUri}/assets/images/rd-innovation.jpg`,
          alt: "R&D Innovation",
        },
      },
    ],
  };

  const missionData = [
    {
      title: "Mission",
      image: {
        url: `${templateDirectoryUri}/assets/images/mission.jpg`,
        alt: "Mission",
      },
      content:
        "Our mission is as simple as our working style. We aim at manufacturing best quality products that's high on innovation, providing exceptional service and support to our customers who look upon us with desirable expectations.",
    },
    {
      title: "Vision",
      image: {
        url: `${templateDirectoryUri}/assets/images/vision.jpg`,
        alt: "Vision",
      },
      content:
        "Virgo is a manufacturing company with a distinct and dedicated vision. We believe in churning our products that not just withstand stringiest of quality measurements, but also delight and surprise its customers with their sheer perfection in making..",
    },
    {
      title: "Values",
      image: {
        url: `${templateDirectoryUri}/assets/images/values.jpg`,
        alt: "Values",
      },
      content:
        "Since our inception, we are committed to the continuous involvement into a company that Utilize its resources efficiently resources and manpower to improve consistency and set for itself and others benchmarks of excellence and integrity in all its actions, apart from empowering its employees for their betterment always.",
    },
  ];

  const environmentCertificates = [
    {
      src: `${templateDirectoryUri}/assets/images/about/anti-bacteria.png`,
      alt: "Anti-Bacteria",
    },
    {
      src: `${templateDirectoryUri}/assets/images/about/environment-ce.png`,
      alt: "Environment CE",
    },
    {
      src: `${templateDirectoryUri}/assets/images/about/green-building.png`,
      alt: "Green Building",
    },
    {
      src: `${templateDirectoryUri}/assets/images/about/green-guard.png`,
      alt: "Green Guard",
    },
    {
      src: `${templateDirectoryUri}/assets/images/about/green-label.png`,
      alt: "Green Label",
    },
    {
      src: `${templateDirectoryUri}/assets/images/about/ISO-9001.png`,
      alt: "ISO 9001",
    },
    {
      src: `${templateDirectoryUri}/assets/images/about/ISO-14001.png`,
      alt: "ISO 14001",
    },
    {
      src: `${templateDirectoryUri}/assets/images/about/virgo-urea-free.png`,
      alt: "Virgo Urea Free",
    },
  ];

  const historyItems = [
    {
      year: 1993,
      logo: `${templateDirectoryUri}/assets/images/about/history-logo/virgo-plywood.png`,
      image: `${templateDirectoryUri}/assets/images/about/history-image/1993.jpg`,
      content: "Founded Virgo Plywood, introducing high-grade laminates.",
    },
    {
      year: 1997,
      logo: `${templateDirectoryUri}/assets/images/about/history-logo/virgo-boards.png`,
      image: `${templateDirectoryUri}/assets/images/about/history-image/1997.jpg`,
      content: "Introduced Virgo Boards to the market.",
    },
  ];

  // State management
  const [activeTab, setActiveTab] = useState("virgo"); // Default to "About Virgo"
  const [showMore, setShowMore] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Certificate carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <FontAwesomeIcon icon={faChevronLeft} style={{ color: "red" }} />
    ),
    nextArrow: (
      <FontAwesomeIcon icon={faChevronRight} style={{ color: "red" }} />
    ),
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  // Handle history modal navigation
  const handleHistoryPrev = () => {
    setCurrentHistoryIndex((prev) =>
      prev === 0 ? historyItems.length - 1 : prev - 1
    );
  };

  const handleHistoryNext = () => {
    setCurrentHistoryIndex((prev) =>
      prev === historyItems.length - 1 ? 0 : prev + 1
    );
  };

  // Render functions for each tab content
  const renderEnvironmentPage = () => (
    <div class="environment">
      <div class="section custom-bg-light">
        <div
          class="invironment-hand-bgimage d-none d-lg-block"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <img
            src="<?php echo get_template_directory_uri(); ?>/assets/images/about-invironment-hand.png"
            alt="Initiatives For Environment"
            class="img-fluid"
          />
        </div>
        <div class="container text-right pr-md-5">
          <div class="row pr-lg-5 mr-lg-2">
            <div class="col-lg-6 ml-auto pl-lg-4">
              <h1
                class="main-heading"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                Environment
              </h1>
              <p data-aos="fade-up" data-aos-duration="1000">
                For thousands of years, we have called the planet earth our
                home. A home, which has cherished us, nurtured us and sustained
                us with all its might and resources. Plants and trees have
                always given us oxygen, food, and shelter in abundance.{" "}
              </p>
              <p data-aos="fade-up" data-aos-duration="1000">
                Being always on the receiving end, it is our responsibility to
                give back and look after our home with love and care. Thus, at
                Virgolam, we take sustainable and ethical initiatives as a
                perfect solution for preserving our nature and going
                environmentally friendly.
              </p>
            </div>
          </div>

          <div class="row flex-column pr-lg-5 mr-lg-2">
            <div
              class="col-lg-5 col-md-8 ml-auto"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h2 class="main-heading">How Wood Solution Help Environment</h2>
              <p data-aos="fade-up" data-aos-duration="1000">
                We often use the terms such as eco-friendly, renewable,
                recyclable very easily. However, Wood is one such versatile raw
                material that has been in use for generations now for it is not
                just easy to use but naturally renewable, and an ideal
                environmental friendly material. Here’s why:
              </p>
            </div>
            <div class="col-lg-7 ml-auto">
              <ul class="text-right">
                <li data-aos="fade-up" data-aos-duration="800">
                  <b>Moving Towards 20 Percent Increase in Energy Efficiency</b>
                  <br />
                  Wood is a natural and renewable material that creates minimal
                  waste. The by-products are used to generate energy.{" "}
                </li>
                <li data-aos="fade-up" data-aos-duration="900">
                  <b>Unique Capacity to Store Carbon</b>
                  <br />
                  Wood stores carbon dioxide throughout its lifetime, and in the
                  end, it can replace fossil fuel as bio fuel. Almost fifty
                  percent of the dry weight in wood is carbon making it
                  structurally very strong.
                </li>
                <span id="dots"></span>
                <div class="more-less more-less1">
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <b>Increase the Share of Renewable Energy</b>
                    <br />
                    Wood products giving significantly lower carbon footprint,
                    wood is a perfect substitute for other material requiring
                    fossil fuels for production.
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1100">
                    <b>Wood can be recycled and Reused</b>
                    <br />
                    Sourced responsibly, wood is a durable material not just for
                    homes but also for commercial buildings. It can last
                    hundreds of years if properly looked after.{" "}
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1200">
                    <b>Wood is Great at Retaining Heat</b>
                    <br />
                    Wood serves as a natural insulator owing to air pockets
                    within its cellular structure. This can help reduce the cost
                    of heating and cooling a building structure.
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <b>It is Biodegradable 100 Percent</b>
                    <br />
                    Naturally, beautiful and visually appealing, wood is an
                    organic material that decomposes under certain weather
                    conditions and adds a rustic charm to any place with its raw
                    feel and look.
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1100">
                    <b>Creates Minimal Waste</b>
                    <br />
                    While wood is easy to use, wooden building can be built in
                    short time creating minimal amount of waste as compared to
                    its other substitutes used for construction.{" "}
                  </li>
                </div>
                <div class="more-less1-btn">
                  <button
                    class="btn btn-primary rounded toggle-class add-class"
                    data-target=".more-less1"
                    data-toggle-target=".more-less1-btn"
                    data-add-class="show"
                    data-toggle-class="d-none"
                  >
                    Read more
                  </button>
                </div>
                <div class="more-less1-btn d-none">
                  <button
                    class="btn btn-primary rounded toggle-class remove-class"
                    data-target=".more-less1"
                    data-toggle-target=".more-less1-btn"
                    data-remove-class="show"
                    data-toggle-class="d-none"
                  >
                    Read less
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="section production">
        <div class="container">
          <div class="row align-items-center justify-content-between">
            <div
              class="col-lg-4 col-md-5"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <img
                src="<?php echo get_template_directory_uri(); ?>/assets/images/about-environment-world-tree.png"
                alt="about-environment-world-tree"
                class="img-fluid"
              />
            </div>

            <div class="col-md-7 text-md-right text-center">
              <h2
                class="main-heading col-md-10 ml-md-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                Sustainable Production
              </h2>
              <p
                class="col-lg-9 col-md-10 px-md-0 ml-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                Our Nature is our establishment, and our largest asset that we
                have been trying to conserve since day one. With sustainability
                continues to be a prominent factor within the commercial and
                specifically manufacturing community, it is our obligation to
                the world we live in to find solutions to lower the
                environmental impact. For that, it is significant to include
                sustainability at all levels of the life cycle of products that
                are manufactured. The entire process should integrate green
                activities at all levels including product, process and system
                while keeping in mind the three R – reduce, reuse and recycle.{" "}
              </p>
              <p
                class="col-lg-9 col-md-10 px-md-0 ml-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                At Virgolam, our products are ecologically produced using
                natural raw materials, producing low emission, durable in
                quality, offering easy recycling, and disposal solutions. We
                continue our search for methods for sustainable ways of
                manufacturing to ensure that our customers and end consumers
                receive products that have minimal impact on the environment.
              </p>
              <p
                class="col-lg-9 col-md-10 px-md-0 ml-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                Our ultimate goal is to promote self-recovery capability of the
                earth while minimising the carbon footprint during manufacturing
                our products.
              </p>
            </div>
          </div>

          <div class="row align-items-center justify-content-between">
            <div
              class="col-lg-4 col-md-5 order-md-2"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <img
                src="<?php echo get_template_directory_uri(); ?>/assets/images/about-environment-recycle.png"
                alt="about-environment-recycle"
                class="img-fluid"
              />
            </div>

            <div class="col-md-7 text-md-left text-center">
              <h2
                class="main-heading col-md-10 mr-md-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                Initiatives for Environment
              </h2>
              <p
                class="col-lg-9 col-md-10 px-md-0 mr-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                Virgolam deals with wood almost every day and thus, it is our
                primary concern how this is going to affect our environment.
                Being aware of our consumption of natural resources, we work
                meticulously towards imbuing sustainability through every
                element of our business as a part of our Green Policy instead of
                just displaying our certificates and setting some goals.{" "}
              </p>
              <p
                class="col-lg-9 col-md-10 px-md-0 mr-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                With no magical formula to reverse the existing environmental
                problems, the eco-enable solution is our contribution to this
                challenge. As a company, we try to incorporate clean technology,
                innovation in product and material in our manufacturing that is
                not only natural but also:
              </p>
              <ul
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <li>Responsibly Procured</li>
                <li>Reduce Energy Use </li>
                <li>Reduce Water Footprint </li>
                <li>Reduce Greenhouse Gas Emissions</li>
                <li>Reduce Waste Generation </li>
              </ul>
              <p
                class="col-lg-9 col-md-10 px-md-0 mr-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                As a manufacturing entity operating on a large scale across the
                country, we are dedicated to ensure that our each product meet
                the relevant Green building standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="section custom-bg-light certificates">
        <div class="container text-right pr-md-5">
          <div
            class="row mb-4 justify-content-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h2 class="main-heading text-center">
              Certification - Environment
            </h2>
          </div>
          <div
            class="col-xl-11 mx-auto text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div class="certificate-carousel">
              <div class="d-flex justify-content-center">
                <img
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/about/anti-bacteria.png"
                  alt="anti-bacteria"
                  class="img-fluid"
                />
              </div>

              <div class="d-flex justify-content-center">
                <img
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/about/environment-ce.png"
                  alt="environment-ce"
                  class="img-fluid"
                />
              </div>

              <div class="d-flex justify-content-center">
                <img
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/about/green-building.png"
                  alt="green-building"
                  class="img-fluid"
                />
              </div>

              <div class="d-flex justify-content-center">
                <img
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/about/green-guard.png"
                  alt="green-guard"
                  class="img-fluid"
                />
              </div>

              <div class="d-flex justify-content-center">
                <img
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/about/green-label.png"
                  alt="green-label"
                  class="img-fluid"
                />
              </div>

              <div class="d-flex justify-content-center">
                <img
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/about/ISO-9001.png"
                  alt="ISO-9001"
                  class="img-fluid"
                />
              </div>

              <div class="d-flex justify-content-center">
                <img
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/about/ISO-14001.png"
                  alt="ISO-14001"
                  class="img-fluid"
                />
              </div>

              <div class="d-flex justify-content-center">
                <img
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/about/virgo-urea-free.png"
                  alt="virgo-urea-free"
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMissionPage = () => (
    <div className="mission-vision-value">
      <div className="section custom-bg-light">
        <Container>
          <Row>
            {missionData.map((item, index) => (
              <Col
                md={4}
                key={index}
                className="text-center d-flex"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <Card className="card1">
                  <Card.Img
                    variant="top"
                    src={item.image.url}
                    alt={item.image.alt}
                    className="img-fluid"
                  />
                  <Card.Body className="pt-5">
                    <Card.Title as="h2">{item.title}</Card.Title>
                    <Card.Text>{item.content}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );

  const renderVirgoPage = () => (
    <div className="about-virgo">
      <div className="section pt-0 text-center">
        <div class="container" data-aos="fade-up" data-aos-duration="1000">
          <div class="row py-5 px-4">
            <img
              src="<?php echo get_the_post_thumbnail_url(); ?>"
              alt="About Virgo Group"
              class="img-fluid w-100"
            />
          </div>
          <div class="row py-5 px-4">
            <h1 class="main-heading mx-auto">About</h1>
            <div dangerouslySetInnerHTML={{ __html: aboutVirgoData.content }} />
          </div>
        </div>
      </div>

      <div class="section custom-counter know-us-better-counter">
        <div class="container text-center">
          <div class="row">
            <div class="col-12 text-center py-3 mt-md-2">
              <h2 class="main-heading">Know Us Better</h2>
              <small class="text-uppercase text-primary font-weight-bold">
                Our Strengths
              </small>
            </div>
          </div>
          <div class="row justify-content-around counter-transparent py-3">
            <div class="col-md-4 col-xl-4 col-lg-4 col-12 d-flex justify-content-center p-4">
              <div class="counter-box">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon/manufacturing-plants.png" />
                <p class="mb-1">Total Manufacturing Plants</p>
                <div class="h3 d-flex align-items-center justify-content-center">
                  <span>13 Plants</span>
                </div>
              </div>
            </div>
            <div
              class="col-md-4 col-xl-4 col-lg-4 col-12 d-flex justify-content-center p-4"
              data-aos-duration="1200"
            >
              <div class="counter-box">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon/employees-in-virgo-group.png" />
                <p class="mb-1">Employees in Virgo Group</p>
                <div class="h4 align-items-center justify-content-center">
                  <span>3000</span> <span class="fas fa-plus"></span> <br />
                  <span> Staffs</span>
                </div>
              </div>
            </div>
            <div
              class="col-md-4 col-xl-4 col-lg-4 col-12 d-flex justify-content-center p-4"
              data-aos-duration="1200"
            >
              <div class="counter-box">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon/distributors.png" />
                <p class="mb-1">Distributors </p>
                <div class="h4 align-items-center justify-content-center">
                  <span>469</span> <span class="fas fa-plus"></span>{" "}
                  <span>Distributors </span>
                  <br />
                  <span>22000</span> <span class="fas fa-plus"></span>
                  <span> Retailer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="experience-center">
        <Container>
          <Row className="align-items-center">
            <Col
              lg={12}
              className="py-3 text-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div data-aos="fade-up" data-aos-duration="1000">
                <h2 className="main-heading h3 mb-0 pb-0">Experience</h2>
                <small
                  className="text-uppercase text-primary font-weight-bold"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                >
                  the exquisite
                </small>
              </div>
            </Col>
            <Col md={12} data-aos="fade-up" data-aos-duration="1000">
              <img
                src={`${templateDirectoryUri}/assets/images/virgo_tree.png`}
                alt="Virgolam Journey"
                className="img-fluid w-100"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {aboutVirgoData.features.map((feature, index) => (
        <div key={index} className="section r-d-innovation bg-light py-0">
          <Container>
            <Row>
              <Col lg={12} className="pt-5">
                <h2 className="mb-3 pb-sm-3 main-heading">{feature.title}</h2>
              </Col>
              <Col lg={5} className="order-2 p-3">
                <div className="img-holder">
                  <img
                    src={feature.image.url}
                    alt={feature.image.alt}
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col lg={7}>
                <div dangerouslySetInnerHTML={{ __html: feature.content }} />
              </Col>
            </Row>
          </Container>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <main className="page-wrapper contact-page">
        {/* Navigation Tabs */}
        <section className="custom-tabs about-tabs">
          <Container className="text-center">
            <Row className="custom-transparent">
              <Col xs={12}>
                <Nav className="nav-pills justify-content-md-around flex-column flex-md-row">
                  {navLinks.map((link) => (
                    <Nav.Item
                      key={link.id}
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <Nav.Link
                        className={activeTab === link.slug ? "active" : ""}
                        onClick={() => setActiveTab(link.slug)}
                      >
                        <div>{link.title}</div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Main Content */}
        <section className="bg-white py-0">
          <Container fluid className="px-0">
            <Row>
              <Col xs={12}>
                <div className="tab-content">
                  {activeTab === "environment" && renderEnvironmentPage()}
                  {activeTab === "mission" && renderMissionPage()}
                  {activeTab === "virgo" && renderVirgoPage()}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      {/* History Modal */}
      <Modal
        show={showHistoryModal}
        onHide={() => setShowHistoryModal(false)}
        size="xl"
        centered
      >
        <Modal.Body className="bg-light-gray">
          <Button
            variant="light"
            className="history-prev d-flex justify-content-center align-items-center"
            onClick={handleHistoryPrev}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button
            variant="light"
            className="history-next d-flex justify-content-center align-items-center"
            onClick={handleHistoryNext}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
          <Button
            variant="link"
            className="close"
            onClick={() => setShowHistoryModal(false)}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
          <Row className="p-4">
            <Col lg={6}>
              <img
                className="historystep-image img-fluid w-100"
                src={historyItems[currentHistoryIndex]?.image}
                alt="history"
              />
            </Col>
            <Col lg={6} className="d-flex align-items-center text-center">
              <div className="w-100">
                <div className="my-3">
                  <img
                    src={historyItems[currentHistoryIndex]?.logo}
                    alt="logo"
                    id="historystep-logo"
                  />
                </div>
                <div className="h3 mb-4 text-gray" id="historystep-date">
                  {historyItems[currentHistoryIndex]?.year}
                </div>
                <div>
                  <p className="text-dark" id="historystep-content">
                    {historyItems[currentHistoryIndex]?.content}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AboutPage;
