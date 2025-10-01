import React from "react";
import { Link } from "react-router-dom"; // For navigation

// Sample data (replace with API data)
const pageData = {
  title: "CSR",
  thumbnailUrl: "https://example.com/csr-banner.jpg",
  thumbnailAlt: "CSR Banner",
};

const csrPosts = [
  {
    id: "1",
    title: "CSR Initiative 1",
    permalink: "/csr/initiative-1",
    thumbnailUrl: "https://example.com/csr-image-1.jpg",
  },
  {
    id: "2",
    title: "CSR Initiative 2",
    permalink: "/csr/initiative-2",
    thumbnailUrl: "https://example.com/csr-image-2.jpg",
  },
  // Add more posts as needed
];

const videoData = {
  url: "https://www.virgolam.com/wp-content/uploads/2021/10/virgo-1.mp4",
  title: "For The Future",
};

const CSRPage = () => {
  return (
    <main className="page-wrapper csr-page">
      {/* BANNER */}
      <section className="card py-0">
        <img
          src={pageData.thumbnailUrl}
          alt={pageData.thumbnailAlt}
          className="card-img-top img-fluid w-100 p-0"
        />
        <div className="card-img-overlay">
          {/* Uncomment if needed */}
          {/* <h1
            className="text-uppercase text-white pt-5 mt-5 aos-init aos-animate h3"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            CSR
          </h1> */}
        </div>
      </section>
      {/* /BANNER */}

      {/* BREADCRUMBS */}
      <section className="pt-3 pb-0">
        <div className="container">
          <div className="row">
            <div className="breadcrumb">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    CSR
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* /BREADCRUMBS */}

      {/* CSR ALBUM */}
      <section className="pt-1 events-album position-relative">
        <div className="container">
          <div className="col-md-9 col-lg-8 mx-auto text-center">
            <h1
              className="mb-3 text-uppercase main-heading"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {pageData.title}
            </h1>
          </div>
          <div
            className="row"
            data-aos="fade-up"
            data-aos-duration="1400"
            data-aos-delay="400"
          >
            {csrPosts.map((post) => (
              <div className="col-md-3 col-sm-6 mb-3" key={post.id}>
                <Link to={post.permalink} className="card border-0 bg-none">
                  <img
                    src={post.thumbnailUrl}
                    className="img-fluid w-100"
                    alt={post.title}
                  />
                  <div className="card-body text-center">
                    <h6 className="main-heading text-uppercase">
                      {post.title}
                    </h6>
                  </div>
                </Link>
              </div>
            ))}
            <div className="col-md-3 col-sm-6 mb-3">
              <h4 className="main-heading text-uppercase">Videos</h4>
              <video width="320" height="240" controls>
                <source src={videoData.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="card-body text-center">
                <h6 className="main-heading text-uppercase">
                  {videoData.title}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /CSR ALBUM */}
    </main>
  );
};

export default CSRPage;
