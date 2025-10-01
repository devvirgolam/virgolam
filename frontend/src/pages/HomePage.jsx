import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  // Simulated WordPress data (unchanged)
  const siteUrl = "https://www.virgolam.com";
  const templateDirectoryUri = "/wp-content/themes/virgo";
  const permalinks = {
    about: "/about",
    whereToBuy: "/where-to-buy",
  };

  // Simulated slider, productSolutions, brands, testimonials data (unchanged)
  const sliders = [
    {
      id: 1,
      title: "Virgo Plywood",
      desktopImg: `${templateDirectoryUri}/assets/images/plywood.jpg`,
      mobileImg: `${templateDirectoryUri}/assets/images/plywood-mobile.jpg`,
      content: `
      <div class="flex-column"> 
        <h2 class="p-0" data-aos="fade-up" data-aos-duration="800">Virgo Plywood</h2>
        &nbsp;
        <h3 class="p-0" data-aos="fade-up" data-aos-duration="1000">Perfection Rewarded</h3>
      </div>`,
    },
    {
      id: 2,
      title: "Virgo Aluminium",
      desktopImg: `${templateDirectoryUri}/assets/images/aluminium.jpg`,
      mobileImg: `${templateDirectoryUri}/assets/images/aluminium-mobile.jpg`,
      content: `
      <div class="flex-column"> 
        <h2 class="p-0" data-aos="fade-up" data-aos-duration="800">Virgo Aluminium</h2>
        &nbsp;
        <h3 class="p-0 h4" data-aos="fade-up" data-aos-duration="1000">Customer Focused Innovative Solutions</h3>
      </div>`,
    },
    {
      id: 3,
      title: "Higgs Healthcare",
      desktopImg: `${templateDirectoryUri}/assets/images/healthcare.jpg`,
      mobileImg: `${templateDirectoryUri}/assets/images/healthcare-mobile.jpg`,
      content: `
      <div class="flex-column">
        <h2 class="p-0" data-aos="fade-up" data-aos-duration="800">Higgs Healthcare</h2>
        <h3 class="p-0" data-aos="fade-up" data-aos-duration="1000">Quality Healthcare available to everyone</h3>
      </div>`,
    },
    {
      id: 4,
      title: "Virgo Laminates",
      desktopImg: `${templateDirectoryUri}/assets/images/laminates.jpg`,
      mobileImg: `${templateDirectoryUri}/assets/images/laminates-mobile.jpg`,
      content: `
      <div class="flex-column">
        <h2 class="p-0" data-aos="fade-up" data-aos-duration="800">Virgo Laminates</h2>
        &nbsp;
        <h3 class="p-0 h4" data-aos="fade-up" data-aos-duration="1000">Anti Bacterial Lam - Changing technology with challenging times</h3>
      </div>`,
    },
  ];

  const productSolutions = [
    {
      title: "Laminates",
      image: `${templateDirectoryUri}/assets/images/product-laminates.jpg`,
      content: "High-quality laminates for various applications.",
      url: "/laminates",
    },
    {
      title: "ACP",
      image: `${templateDirectoryUri}/assets/images/acp.jpg`,
      url: "/acp",
      content: `<h2>ACP</h2>
      <p>Virgo Group with more than ten years of experience of making aluminum rolls & coils have come up with best in class ACP products by the name of Virgo ACP...</p>
      <a href="https://www.virgolam.com/acp/" target="_blank">Learn More</a>`,
    },
    {
      title: "PVC",
      image: `${templateDirectoryUri}/assets/images/pvc.jpg`,
      url: "/pvc",
      content: `<h2>PVC</h2>
      <p>We facilitate huge variety of PVC Laminates for our customers. Acknowledged for their features like attractive design, weather and corrosion proof, termite and borer resistant, perfect finish...</p>
      <a href="https://www.virgolam.com/pvc/" target="_blank">Learn More</a>`,
    },
    {
      title: "Plywood",
      image: `${templateDirectoryUri}/assets/images/plywood.jpg`,
      url: "/plywood",
      content: `<h2>Plywood</h2>
      <p>Virgo is a name reckoned for superior quality products that are high on performance and quality. Virgo keeps a complete control over all aspects of the development procedure, in-house manufacturing & testing...</p>
      <a href="https://www.virgolam.com/plywood/" target="_blank">Learn More</a>`,
    },
    {
      title: "Aluminium",
      image: `${templateDirectoryUri}/assets/images/aluminium.jpg`,
      url: "/aluminium",
      content: `<h2>Aluminium</h2>
      <p>Virgo Aluminum Limited is a customer focused innovative solutions-driven company which manufactures, processes and distributes various Aluminum products to customers worldwide....</p>
      <a href="https://www.virgolam.com/aluminium/" target="_blank">Learn More</a>`,
    },
    {
      title: "MDF",
      image: `${templateDirectoryUri}/assets/images/mdf.jpg`,
      url: "/mdf",
      content: `<h2>MDF</h2>
      <p><strong>Standard</strong> Ideal for furniture and partitions.<br/>
         <strong>Fire-Retardant</strong> Extra fire safety.<br/>
         <strong>High-Density</strong> Durable for heavy use.<br/>
         <strong>Low-Density</strong> Lightweight for décor.</p>
      <a href="https://virgolam.com/mdf/" target="_blank">Learn More</a>`,
    },
  ];

  const brands = [
    {
      src: `${templateDirectoryUri}/assets/images/logos/virgo-laminates.png`,
      alt: "laminate",
    },
    {
      src: `${templateDirectoryUri}/assets/images/logos/lam-abco.png`,
      alt: "lam abco",
    },
  ];

  const testimonials = [
    {
      video: "https://www.youtube.com/embed/ELe5GDrgFKs",
      quote:
        "When I came across Virgo Group six years ago, I knew that I had found something special...",
      author: "Sanjeev Goel",
      cite: "Ply & Decor Kotla, Delhi",
    },
  ];

  const [activeCountry, setActiveCountry] = useState("india");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const hoverImage = (imageUrl) => {
    console.log("Hover image:", imageUrl);
  };

  return (
    <main className="page-wrapper home-page">
      {/* Banner Section */}
      <section className="banner">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="banner-swiper"
        >
          {sliders.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="banner-slide">
                <div className="dark-overlay"></div>
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={slide.mobileImg || slide.desktopImg}
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={slide.desktopImg}
                  />
                  <img
                    className="banner-img"
                    src={slide.desktopImg}
                    alt={slide.title}
                  />
                </picture>
                <div className="banner-caption">
                  <div dangerouslySetInnerHTML={{ __html: slide.content }} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div class="row align-items-center">
            <div
              class="col-lg-6 order-lg-2 py-3"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1>
                <img
                  src=""
                  alt="Home Decor Manufacturers & Suppliers"
                  class="img-fluid w-100"
                />
              </h1>
            </div>
            <div class="col-lg-6 order-lg-1 py-3">
              <div class="pb-3 pb-md-4">
                <h2
                  class="main-heading h3 py-0 mb-0"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  About Virgo
                </h2>
                <small
                  class="text-uppercase text-primary font-weight-bold"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                >
                  passion with excellence
                </small>
              </div>
              <p data-aos="fade-up" data-aos-duration="500">
                Welcome to Virgo Group, a leading name in the decorative
                laminate and industrial solutions sector with over 31 years of
                expertise. We take pride in our expansive network that includes
                3500+ employees, 588+ distributor channel nodes, and 44+
                branches across India, all working together to deliver
                high-quality products and services.
              </p>
              <p data-aos="fade-up" data-aos-duration="800">
                With a production capacity of 129+ million sq. mt. of laminates
                annually, we serve more than 22,500+ retail outlets and
                collaborate with 21,000+ architects and interior designers as
                well as 9700+ network fabricators nationwide.
              </p>
              <p data-aos="fade-up" data-aos-duration="1000">
                Our innovative and reliable products are manufactured at our 13
                state-of-the-art plants, ensuring the highest standards of
                quality and sustainability. At Virgo, we’re committed to
                creating better living and working spaces through design,
                technology, and a passion for excellence.
              </p>
              <a
                href="<?php echo get_the_permalink('62'); ?>"
                class="btn btn-primary"
              >
                Find out more...
              </a>
              {/* <!-- <a href="<?php //echo get_the_permalink('62'); ?>" class="btn custom-btn-primary">
              <svg>
                <rect></rect>
              </svg>
              Find out more...</a> --> */}
            </div>
          </div>
        </div>
      </section>

      {/* Product Solutions Section */}
      <section className="product-solutions bg-white">
        <div class="container-fluid px-0">
          <div class="row m-0">
            <div
              class="col-12 mb-md-4 mb-3 text-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h2 class="main-heading h3">Product Solutions</h2>
            </div>
          </div>
          <div className="product-solution-bg" data-aos="fade-up">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={3}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
            >
              {productSolutions.map((product, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="product-solution-card"
                    onMouseMove={() => hoverImage(product.image)}
                    onTouchStart={() => hoverImage(product.image)}
                    onClick={() => hoverImage(product.image)}
                    data-image={product.image}
                  >
                    <div className="card">
                      <div className="card-body">
                        <Link to={product.url}>
                          <h5>{product.title}</h5>
                        </Link>
                        <p>{product.content}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section class="brands py-0">
        <div class="container">
          <div class="row">
            <div
              class="col-12 py-3 text-center align-self-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div class="mx-auto px-0">
                <h2
                  class="h3 main-heading"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  Our Branded Solutions
                </h2>
              </div>
            </div>
            <div
              class="col-lg-12 py-3 text-center brand-logos"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div
                class="row col-md-12"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/virgo-laminates.png"
                    alt="laminate"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-abco.png"
                    alt="lam abco"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-corby.png"
                    alt="lam corby"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-croma.png"
                    alt="lam croma"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/virgo-looks-lam.png"
                    alt="lam croma"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-pvc.png"
                    alt="lam pvc"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-cromaply.png"
                    alt="lam cromaply"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-digital.png"
                    alt="lam digital"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-syncro.png"
                    alt="lam syncro"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-spotless.png"
                    alt="lam spotless"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-metal.png"
                    alt="lam metal"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-cromapvc.png"
                    alt="lam cromapvc"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-corbypvc.png"
                    alt="lam corbypvc"
                    class="img-fluid"
                  />
                </div>

                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/virgo-plywood.png"
                    alt="plywood"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/mdf.png"
                    alt="higgs"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/aluminium.png"
                    alt="aluminium"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3 col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/higgs.png"
                    alt="higgs"
                    class="img-fluid"
                  />
                </div>

                <div class="col-sm-3  col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/acp.png"
                    alt="acp"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3  col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/acp-antifire.png"
                    alt="acp antifire"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3  col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/acp-al.png"
                    alt="acp al"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3  col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/acp-hpl.png"
                    alt="acp hpl"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3  col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/acp-sleek.png"
                    alt="acp sleek"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3  col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/lam-croma.png"
                    alt="lam croma"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3  col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/Hanger.png"
                    alt="lam croma"
                    class="img-fluid"
                  />
                </div>
                <div class="col-sm-3  col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/Verona.png"
                    alt="lam croma"
                    class="img-fluid"
                  />
                </div>

                <div class="col-sm-3  col-6 my-4">
                  <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/Clad.png"
                    alt="lam croma"
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section class="bg-dark text-light pt-5 pb-5">
        <div class="col-lg-12 ">
          <div
            id="client-testimonial-carousel"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner pt-5 pb-5" role="listbox">
              <h3 class="text-center text-white">
                Virgo Dealers Success Story
              </h3>
              <div class="carousel-item active text-center p-4">
                <div class="row">
                  <div class="col-lg-6">
                    <iframe
                      width="100%"
                      height="300px"
                      src="https://www.youtube.com/embed/ELe5GDrgFKs"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div class="col-lg-6" style={{ marginTop: "20px" }}>
                    <blockquote class="blockquote text-center">
                      <p class="mb-0">
                        <i class="fa fa-quote-left"></i> When I came across
                        Virgo Group six years ago, I knew that I had found
                        something special.From the very beginning, I was
                        impressed by the company's commitment to excellence and
                        its philosophy of striving for perfection. These values
                        are evident in every aspect of the business, from the
                        innovative product solutions to the outstanding customer
                        service
                      </p>
                      <p class="blockquote-footer">
                        Sanjeev Goel <cite>Ply & Decor Kotla, Delhi</cite>
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div class="carousel-item text-center p-4">
                <div class="row">
                  <div class="col-lg-6" style={{ marginTop: "20px" }}>
                    <iframe
                      width="100%"
                      height="300px"
                      src="https://www.youtube.com/embed/-9dovmFxG24"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div class="col-lg-6" style={{ marginTop: "80px" }}>
                    <blockquote class="blockquote text-center">
                      <p class="mb-0">
                        <i class="fa fa-quote-left"></i> Amit Batra has a very
                        positive view of VIRGO and their place in the laminate
                        industry. He sees the company as a leader in innovation
                        and quality, and he values his partnership with them as
                        a key part of his own business success.{" "}
                      </p>
                      <p class="blockquote-footer">
                        Amit Batra <cite>Om Sai Plywood, Kotla Delhi</cite>
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div class="carousel-item text-center p-4">
                <div class="row">
                  <div class="col-lg-6">
                    <iframe
                      width="100%"
                      height="300px"
                      src="https://www.youtube.com/embed/te855ts_LYQ"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div class="col-lg-6" style={{ marginTop: "20px" }}>
                    <blockquote class="blockquote text-center">
                      <p class="mb-0">
                        <i class="fa fa-quote-left"></i> The story of Kamal
                        Sahni and the Virgo Group is a tale of unwavering
                        determination, unyielding passion, and unparalleled
                        success. In 1993, Kamal Sahni took a leap of faith and
                        embarked on a journey that would forever change his
                        life. With a clear vision and the guidance of Mr. Chadha
                        and SP Arora, he founded Goodwill Enterprises and set
                        out to conquer the market.{" "}
                      </p>
                      <p class="blockquote-footer">
                        Kamal Sahani{" "}
                        <cite title="Source Title">
                          Goodwill Enterprises- Ghaziabad
                        </cite>
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div class="carousel-item text-center p-4">
                <div class="row">
                  <div class="col-lg-6">
                    <iframe
                      width="100%"
                      height="300px"
                      src="https://www.youtube.com/embed/TC6oWA6qvd4"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div class="col-lg-6" style={{ marginTop: "20px" }}>
                    <blockquote class="blockquote text-center">
                      <p class="mb-0">
                        <i class="fa fa-quote-left"></i> As a business owner in
                        the laminate industry, I have had the pleasure of
                        partnering with Virgo Group and I can confidently say
                        that they are a true leader in innovation and quality.
                        Their commitment to excellence is unmatched and has been
                        instrumental in helping my business achieve success.
                        Virgo Group's range of laminate products is extensive
                        and of the highest quality. Their laminates are not only
                        visually appealing but also durable and long-lasting,
                        making them a popular choice among my customers.
                      </p>
                      <p class="blockquote-footer">
                        Amit Bansal
                        <cite title="Source Title">
                          Surya Timber & Plywood- Noida
                        </cite>
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div class="carousel-item text-center p-4">
                <div class="row">
                  <div class="col-lg-6">
                    <iframe
                      width="100%"
                      height="300px"
                      src="https://www.youtube.com/embed/jTiC4kM3Uak"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div class="col-lg-6" style={{ marginTop: "20px" }}>
                    <blockquote class="blockquote text-center">
                      <p class="mb-0">
                        <i class="fa fa-quote-left"></i> The partnership between
                        Virgo and Mittal Group is a strong one that has been
                        built on trust, mutual respect, and a commitment to
                        excellence. The Virgo Group is known for its
                        high-quality products in the Laminate industry, and
                        Virgo's expertise in logistics and customer service has
                        helped the Mittal Group expand its reach and increase
                        its customer base. With Virgo's support, the Mittal
                        Group has been able to streamline its operations,
                        improve its delivery times, and offer more personalized
                        services to its customers.
                      </p>
                      <p class="blockquote-footer">
                        Anuj Mittal{" "}
                        <cite title="Source Title">
                          Mittal Timber & Plywood Company- Noida
                        </cite>
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div class="carousel-item text-center p-4">
                <div class="row">
                  <div class="col-lg-6">
                    <iframe
                      width="100%"
                      height="300px"
                      src="https://www.youtube.com/embed/T55CD2wmjlQ"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div class="col-lg-6" style={{ marginTop: "20px" }}>
                    <blockquote class="blockquote text-center">
                      <p class="mb-0">
                        <i class="fa fa-quote-left"></i> The Virgo Group offers
                        an impressive range of high-quality laminate products
                        that are both beautiful and functional. Virgo Group's
                        expertise in the industry is apparent in the superior
                        quality of their products, which are known for their
                        strength and durability. I have found that Virgo
                        products are a popular choice among my customers, and
                        for good reason. Their laminates are not only visually
                        stunning but also long-lasting, making them a practical
                        and reliable option for a wide range of applications.
                      </p>
                      <p class="blockquote-footer">
                        Pawan Goyal
                        <cite title="Source Title">
                          Sai Kiran Plywood - Faridabad
                        </cite>
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div class="carousel-item text-center p-4">
                <div class="row">
                  <div class="col-lg-6">
                    <iframe
                      width="100%"
                      height="300px"
                      src="https://www.youtube.com/embed/B5q3OIkUx8U"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div class="col-lg-6" style={{ marginTop: "20px" }}>
                    <blockquote class="blockquote text-center">
                      <p class="mb-0">
                        <i class="fa fa-quote-left"></i> As a business owner in
                        the Laminate industry, I am thrilled to have partnered
                        with Virgo Group. Their dedication to providing
                        top-notch products and exceptional customer service is
                        truly commendable.I am confident in recommending Virgo
                        Products to anyone in need of top-quality Laminates.
                        Virgo and his team have earned their reputation as
                        leaders in the industry, and I look forward to
                        continuing our successful partnership.
                      </p>
                      <p class="blockquote-footer">
                        Mukesh Agarwal
                        <cite title="Source Title">
                          MP, Plywood Emporium, Delhi
                        </cite>
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            <ol class="carousel-indicators">
              <li
                data-target="#client-testimonial-carousel"
                data-slide-to="0"
                class="active"
              ></li>
              <li
                data-target="#client-testimonial-carousel"
                data-slide-to="1"
              ></li>
              <li
                data-target="#client-testimonial-carousel"
                data-slide-to="2"
              ></li>
              <li
                data-target="#client-testimonial-carousel"
                data-slide-to="3"
              ></li>
              <li
                data-target="#client-testimonial-carousel"
                data-slide-to="4"
              ></li>
              <li
                data-target="#client-testimonial-carousel"
                data-slide-to="5"
              ></li>
              <li
                data-target="#client-testimonial-carousel"
                data-slide-to="6"
              ></li>
            </ol>
          </div>
        </div>
      </section>

      {/* Vertical Gallery Section (unchanged, already uses Swiper) */}
      <section className="vertical-gallery">
        <div className="split-slideshow">
          <div className="slideshow">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
            >
              <SwiperSlide>
                <div className="item">
                  <img
                    src={`${templateDirectoryUri}/assets/images/product-solution-laminate Compress.jpg`}
                    alt="Manufacturer Of Home Decor Products"
                    className="img-fluid"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <img
                    src={`${templateDirectoryUri}/assets/images/product-solution-pvc Compress.jpg`}
                    alt="Home Decor Wholesale Suppliers"
                    className="img-fluid"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="vertical-gallery-content">
          <div className="container container-small">
            <h2 className="main-title"></h2>
          </div>
        </div>
      </section>

      {/* Where to Buy Section */}
      <section class="where-to-buy bg-white">
        <div class="container px-0">
          <div class="row align-items-center m-0">
            <div class="col-lg-5" data-aos="fade-up" data-aos-duration="1000">
              <h2
                class="h4 px-0 mb-4 main-heading"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <span class="d-sm-block">Our Worldwide Network </span>
              </h2>
              <p data-aos="fade-up" data-aos-duration="1000">
                Virgo Group is not only a leading manufacturer, marketer, and
                distributor of Laminates, Plywood, Aluminium Rolled Products,
                ACP, PVC Laminates, Restroom Cubicles, Cladding in India, but
                also has a strong global presence. With branches in the USA, Sri
                Lanka, Malaysia, China, and Singapore, Virgo Group caters to
                customers worldwide with its innovative and high-quality
                products. At Virgo, we strive to provide exceptional service and
                support to our customers, no matter where they are located.
              </p>
            </div>
            <div class="col-lg-7" data-aos="fade-up" data-aos-duration="1000">
              <div class="img-holder">
                <img
                  src="<?php echo get_template_directory_uri(); ?>/assets/images/where-to-buy.jpg"
                  alt="Wholesale Home Decor Suppliers"
                  class="img-fluid w-100"
                />
              </div>
            </div>
            <div class="col-12" data-aos="fade" data-aos-duration="1000">
              <div class="row px-3">
                <div class="col-lg px-0">
                  <ul class="nav w-100 flex-lg-row flex-column py-md-3">
                    <li class="nav-item has-active" id="india">
                      <button class="nav-link">India</button>
                    </li>
                    <li class="nav-item" id="usa">
                      <button class="nav-link">USA</button>
                    </li>
                    <li class="nav-item" id="malaysia">
                      <button class="nav-link">Malaysia</button>
                    </li>
                    <li class="nav-item" id="singapore">
                      <button class="nav-link">Singapore</button>
                    </li>
                    <li class="nav-item" id="china">
                      <button class="nav-link">China</button>
                    </li>
                    <li class="nav-item" id="srilanka">
                      <button class="nav-link">Sri Lanka</button>
                    </li>
                    <li class="nav-item" id="">
                      <button class="nav-link"></button>
                    </li>
                  </ul>
                </div>
                <div>
                  <a
                    href="<?php echo get_the_permalink('21'); ?>"
                    class="btn btn-primary my-md-3"
                  >
                    Where to Buy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
