import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

const BlogPage = () => {
  // Simulated WordPress data
  const siteUrl = "https://virgolam.com";
  const templateDirectoryUri = "/wp-content/themes/virgo";
  const apiUrl = `${siteUrl}/wp-json/wp/v2`;

  // State for blog posts, pagination, and breadcrumbs
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Simulated breadcrumb data
  const breadcrumbs = [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blog" },
  ];

  // Fetch blog posts
  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blog`, {
          params: {
            per_page: 5,
            page: currentPage,
          },
        });
        setPosts(response.data);
        setTotalPages(parseInt(response.headers["x-wp-totalpages"] || "1", 10));
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        // Fallback to mock data if API fails
        setPosts([
          {
            id: 1,
            title: { rendered: "Sample Blog Post" },
            excerpt: {
              rendered: "<p>This is a sample blog post excerpt...</p>",
            },
            date: "2025-09-30",
            featured_media_url: `${templateDirectoryUri}/assets/images/blog/sample.jpg`,
            link: "/blog/sample-post",
            blog_category: [
              {
                id: 1,
                name: "Category 1",
                slug: "category-1",
                link: "/blog/category/category-1",
              },
            ],
          },
        ]);
      }
    };

    fetchPosts();
  }, [currentPage]);

  // Pagination handler
  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  // Pagination component
  const Pagination = ({ currentPage, totalPages }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`btn ${
            currentPage === i ? "btn-primary" : "btn-outline-primary"
          } mx-1`}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="pagination">
        {currentPage > 1 && (
          <button
            className="btn btn-outline-primary mx-1"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {pages}
        {currentPage < totalPages && (
          <button
            className="btn btn-outline-primary mx-1"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <main
      className="page-wrapper blog-outer-page"
      style={{ paddingTop: "124px", marginBottom: "561px" }}
    >
      {/* Banner Section */}
      <section className="blog-outer-banner pb-0">
        <div className="jumbotron jumbotron-fluid mb-0">
          <div className="container">
            <h1
              className="text-uppercase text-white pt-5 mt-5"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Blog
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section className="pt-3 pb-0 bg-white">
        <div className="container">
          <div className="row">
            <div className="breadcrumb">
              <div
                className="breadcrumbs"
                vocab="https://schema.org/"
                typeof="BreadcrumbList"
              >
                {breadcrumbs.map((crumb, index) => (
                  <span key={index}>
                    <Link to={crumb.url}>{crumb.title}</Link>
                    {index < breadcrumbs.length - 1 && " > "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Items Section */}
      <section className="blog-outer-items bg-white pt-0">
        <div className="container">
          {posts.length === 0 ? (
            <div className="row justify-content-center blog-outer-item py-md-5 py-3">
              <img
                src={`${templateDirectoryUri}/assets/images/blog/coming-soon.jpg`}
                alt="coming soon blog"
                className="img-fluid"
              />
            </div>
          ) : (
            posts.map((post) => (
              <div className="row blog-outer-item" key={post.id}>
                <div
                  className="col-lg-4 px-lg-2 py-lg-4"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <img
                    src={
                      post.featured_media_url ||
                      `${templateDirectoryUri}/assets/images/blog/default.jpg`
                    }
                    alt={post.title.rendered}
                    className="img-fluid"
                  />
                </div>
                <div className="col-lg-8 py-3 py-lg-4">
                  <h4 data-aos="fade-up" data-aos-duration="800">
                    {new Date(post.date).toLocaleDateString()}
                  </h4>
                  <h3
                    className="main-heading py-0"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                  >
                    {post.title.rendered}
                  </h3>
                  <div
                    className="pt-2"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {post.blog_category &&
                      post.blog_category.map((term, index) => (
                        <h6 key={term.id} className="d-inline-block">
                          <Link to={term.link} className="text-danger">
                            {term.name}
                          </Link>
                          {index < post.blog_category.length - 1 && ", "}
                        </h6>
                      ))}
                  </div>
                  <div
                    className="mt-3"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="400"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <Link
                    to={post.link}
                    className="btn btn-primary"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-delay="400"
                  >
                    Read More...
                  </Link>
                </div>
                <div className="col-md-4"></div>
              </div>
            ))
          )}
          <div className="row justify-content-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </section>

      {/* Newsletter Component Placeholder */}
      {/* <Newsletter /> */}
    </main>
  );
};

export default BlogPage;
