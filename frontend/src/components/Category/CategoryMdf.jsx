import React from "react";
import { Link } from "react-router-dom"; // Assuming React Router for navigation

// Sample data structure (replace with actual API data)
const productTabs = [
  { id: "7", title: "Laminates", icon: "icon-layers", url: "/laminates" },
  { id: "15", title: "ACP", icon: "icon-brickes-wall", url: "/acp" },
  { id: "164", title: "PVC", icon: "icon-pappers", url: "/pvc" },
  {
    id: "11",
    title: "Plywood",
    icon: "icon-first-layer",
    url: "/plywood",
    active: true,
  },
  { id: "9", title: "Aluminium", icon: "icon-roll-papper", url: "/aluminium" },
  { id: "4801", title: "MDF", icon: "icon-first-layer", url: "/mdf" },
];

// Sample content data (replace with API data)
const pageData = {
  content: `<h2>Virgo MDF Solutions</h2>
<p>Explore Virgo's range of high-quality MDF options tailored for various needs:</p>
<ul>
  <li>Standard MDF Smooth, versatile, and ideal for dry spaces like furniture, cabinetry, and partitions.</li>
  <li>Fire-Retardant MDF Enhanced fire protection for commercial and residential spaces needing fire safety.</li>
 <li>High-Density MDF Tough and durable, designed for heavy-duty and high-use areas.</li>
 <li>Low-Density MDF Lightweight and budget-friendly, perfect for decorative panels and light applications.</li>
</ul>
<p>Virgo MDF offers reliability and versatility for any project.</p>
`,
  thumbnailUrl: "https://example.com/mdf-image.jpg",
  thumbnailAlt: "Plywood Suppliers & Manufacturers In India",
};

const CategoryMdf = () => {
  return (
    <main className="page-wrapper product-page">
      {/* PRODUCT TABS */}
      <section className="product-tabs custom-tabs">
        <div className="container text-center">
          <div className="row custom-transparent">
            <div className="col-12">
              <div data-aos="fade-up" data-aos-duration="1000">
                <ul className="nav nav-pills justify-content-center">
                  {productTabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <Link
                        className={`nav-link ${tab.active ? "active" : ""}`}
                        to={tab.url}
                      >
                        <span
                          className={`sprite-icon ${tab.icon} w-50p`}
                        ></span>
                        <div>{tab.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="col-lg-8 col-md-10 mx-auto py-5"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
            </div>
            <div
              className="col-12 mx-auto pb-3"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1>
                <img
                  src={pageData.thumbnailUrl}
                  alt={pageData.thumbnailAlt}
                  className="img-fluid w-100"
                />
              </h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryMdf;
