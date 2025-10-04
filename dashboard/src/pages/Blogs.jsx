import React from "react";
import PageHeader from "../components/Common/PageHeader";

const Blogs = () => {
  return (
    <div class="content">
      <PageHeader />

      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <div class="input-icon input-icon-start position-relative">
              <span class="input-icon-addon text-dark">
                <i class="ti ti-search"></i>
              </span>
              <input type="text" class="form-control" placeholder="Search" />
            </div>
            <a href="add-blog.html" class="btn btn-primary">
              <i class="ti ti-square-rounded-plus-filled me-1"></i>Add Blog
            </a>
          </div>
        </div>
      </div>

      <div class="row row-gap-3">
        <div class="col-md-6 col-lg-4">
          <div class="card blog-item mb-0">
            <div class="card-body">
              <div class="blog-img rounded position-relative mb-3">
                <a href="blog-details.html">
                  <img
                    src="assets/img/blogs/blog-1.jpg"
                    alt="img"
                    class="img-fluid position-relative rounded"
                  />
                </a>
                <a
                  href="javascript:void(0);"
                  class="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                >
                  Sales Optimization
                </a>
              </div>
              <div class="blog-content">
                <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                  <span>
                    <i class="ti ti-message-minus me-1"></i>40 Comments
                  </span>
                  <span>
                    <i class="ti ti-calendar me-1"></i>27 May 2025
                  </span>
                </div>
                <div class="mb-3">
                  <h6 class="mb-2">
                    <a href="blog-details.html">Improve Efficiency for Sales</a>
                  </h6>
                  <p class="mb-0 truncate-2-lines">
                    Discover how to optimize tools to boost your sales team’s
                    productivity and track important metrics.
                  </p>
                </div>
                <hr />
                <div class="d-flex align-items-center justify-content-between">
                  <a
                    href="edit-blog.html"
                    class="btn btn-xs px-3 fs-12 btn-outline-dark"
                  >
                    <i class="ti ti-edit me-1"></i>Edit
                  </a>
                  <span class="badge badge-sm badge-soft-success">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="card blog-item mb-0">
              <div class="card-body">
                <div class="blog-img rounded position-relative mb-3">
                  <a href="blog-details.html">
                    <img
                      src="assets/img/blogs/blog-2.jpg"
                      alt="img"
                      class="img-fluid position-relative rounded"
                    />
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                  >
                    Automation
                  </a>
                </div>
                <div class="blog-content">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <span>
                      <i class="ti ti-message-minus me-1"></i>123 Comments
                    </span>
                    <span>
                      <i class="ti ti-calendar me-1"></i>15 May 2025
                    </span>
                  </div>
                  <div class="mb-3">
                    <h6 class="mb-2">
                      <a href="blog-details.html">
                        Automation Benefits for Growth
                      </a>
                    </h6>
                    <p class="mb-0 truncate-2-lines">
                      Learn how automation features can streamline workflows and
                      accelerate your business’s growth effortlessly.
                    </p>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center justify-content-between">
                    <a
                      href="edit-blog.html"
                      class="btn btn-xs px-3 fs-12 btn-outline-dark"
                    >
                      <i class="ti ti-edit me-1"></i>Edit
                    </a>
                    <span class="badge badge-sm badge-soft-danger">
                      Inactive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card blog-item mb-0">
              <div class="card-body">
                <div class="blog-img rounded position-relative mb-3">
                  <a href="blog-details.html">
                    <img
                      src="assets/img/blogs/blog-3.jpg"
                      alt="img"
                      class="img-fluid position-relative rounded"
                    />
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                  >
                    Marketing
                  </a>
                </div>
                <div class="blog-content">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <span>
                      <i class="ti ti-message-minus me-1"></i>54 Comments
                    </span>
                    <span>
                      <i class="ti ti-calendar me-1"></i>04 May 2025
                    </span>
                  </div>
                  <div class="mb-3">
                    <h6 class="mb-2">
                      <a href="blog-details.html">
                        Marketing Integration Guide
                      </a>
                    </h6>
                    <p class="mb-0 truncate-2-lines">
                      Explore seamless integration strategies between customer
                      management and marketing tools to enhance outreach and
                      engagement.
                    </p>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center justify-content-between">
                    <a
                      href="edit-blog.html"
                      class="btn btn-xs px-3 fs-12 btn-outline-dark"
                    >
                      <i class="ti ti-edit me-1"></i>Edit
                    </a>
                    <span class="badge badge-sm badge-soft-success">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card blog-item mb-0">
              <div class="card-body">
                <div class="blog-img rounded position-relative mb-3">
                  <a href="blog-details.html">
                    <img
                      src="assets/img/blogs/blog-4.jpg"
                      alt="img"
                      class="img-fluid position-relative rounded"
                    />
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                  >
                    Implementation
                  </a>
                </div>
                <div class="blog-content">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <span>
                      <i class="ti ti-message-minus me-1"></i>152 Comments
                    </span>
                    <span>
                      <i class="ti ti-calendar me-1"></i>29 Apr 2025
                    </span>
                  </div>
                  <div class="mb-3">
                    <h6 class="mb-2">
                      <a href="blog-details.html">Avoid Setup Mistakes</a>
                    </h6>
                    <p class="mb-0 truncate-2-lines">
                      Identify common pitfalls in implementation and learn
                      proactive steps to avoid costly mistakes during setup.
                    </p>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center justify-content-between">
                    <a
                      href="edit-blog.html"
                      class="btn btn-xs px-3 fs-12 btn-outline-dark"
                    >
                      <i class="ti ti-edit me-1"></i>Edit
                    </a>
                    <span class="badge badge-sm badge-soft-danger">
                      Inactive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card blog-item mb-0">
              <div class="card-body">
                <div class="blog-img rounded position-relative mb-3">
                  <a href="blog-details.html">
                    <img
                      src="assets/img/blogs/blog-5.jpg"
                      alt="img"
                      class="img-fluid position-relative rounded"
                    />
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                  >
                    Product Features
                  </a>
                </div>
                <div class="blog-content">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <span>
                      <i class="ti ti-message-minus me-1"></i>58 Comments
                    </span>
                    <span>
                      <i class="ti ti-calendar me-1"></i>17 Apr 2025
                    </span>
                  </div>
                  <div class="mb-3">
                    <h6 class="mb-2">
                      <a href="blog-details.html">Top Features for 2025</a>
                    </h6>
                    <p class="mb-0 truncate-2-lines">
                      Uncover must-have features for 2025 that improve customer
                      relationships and operational efficiency.
                    </p>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center justify-content-between">
                    <a
                      href="edit-blog.html"
                      class="btn btn-xs px-3 fs-12 btn-outline-dark"
                    >
                      <i class="ti ti-edit me-1"></i>Edit
                    </a>
                    <span class="badge badge-sm badge-soft-success">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card blog-item mb-0">
              <div class="card-body">
                <div class="blog-img rounded position-relative mb-3">
                  <a href="blog-details.html">
                    <img
                      src="assets/img/blogs/blog-6.jpg"
                      alt="img"
                      class="img-fluid position-relative rounded"
                    />
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                  >
                    Data & Analytics
                  </a>
                </div>
                <div class="blog-content">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <span>
                      <i class="ti ti-message-minus me-1"></i>78 Comments
                    </span>
                    <span>
                      <i class="ti ti-calendar me-1"></i>03 Apr 2025
                    </span>
                  </div>
                  <div class="mb-3">
                    <h6 class="mb-2">
                      <a href="blog-details.html">Data Insights for Success</a>
                    </h6>
                    <p class="mb-0 truncate-2-lines">
                      Leverage data insights to enhance customer engagement,
                      identify opportunities, and make data-driven decisions.
                    </p>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center justify-content-between">
                    <a
                      href="edit-blog.html"
                      class="btn btn-xs px-3 fs-12 btn-outline-dark"
                    >
                      <i class="ti ti-edit me-1"></i>Edit
                    </a>
                    <span class="badge badge-sm badge-soft-danger">
                      Inactive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card blog-item mb-0">
              <div class="card-body">
                <div class="blog-img rounded position-relative mb-3">
                  <a href="blog-details.html">
                    <img
                      src="assets/img/blogs/blog-7.jpg"
                      alt="img"
                      class="img-fluid position-relative rounded"
                    />
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                  >
                    Customization
                  </a>
                </div>
                <div class="blog-content">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <span>
                      <i class="ti ti-message-minus me-1"></i>56 Comments
                    </span>
                    <span>
                      <i class="ti ti-calendar me-1"></i>26 Mar 2025
                    </span>
                  </div>
                  <div class="mb-3">
                    <h6 class="mb-2">
                      <a href="blog-details.html">Customizing Effectively</a>
                    </h6>
                    <p class="mb-0 truncate-2-lines">
                      Tailor your system to fit your business processes,
                      improving usability, adoption, and productivity across
                      teams.
                    </p>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center justify-content-between">
                    <a
                      href="edit-blog.html"
                      class="btn btn-xs px-3 fs-12 btn-outline-dark"
                    >
                      <i class="ti ti-edit me-1"></i>Edit
                    </a>
                    <span class="badge badge-sm badge-soft-success">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card blog-item mb-0">
              <div class="card-body">
                <div class="blog-img rounded position-relative mb-3">
                  <a href="blog-details.html">
                    <img
                      src="assets/img/blogs/blog-8.jpg"
                      alt="img"
                      class="img-fluid position-relative rounded"
                    />
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                  >
                    Customization
                  </a>
                </div>
                <div class="blog-content">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <span>
                      <i class="ti ti-message-minus me-1"></i>97 Comments
                    </span>
                    <span>
                      <i class="ti ti-calendar me-1"></i>13 Mar 2025
                    </span>
                  </div>
                  <div class="mb-3">
                    <h6 class="mb-2">
                      <a href="blog-details.html">
                        Future Trends & Innovations
                      </a>
                    </h6>
                    <p class="mb-0 truncate-2-lines">
                      Explore emerging trends and innovations that are shaping
                      the future of customer relationship management.
                    </p>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center justify-content-between">
                    <a
                      href="edit-blog.html"
                      class="btn btn-xs px-3 fs-12 btn-outline-dark"
                    >
                      <i class="ti ti-edit me-1"></i>Edit
                    </a>
                    <span class="badge badge-sm badge-soft-danger">
                      Inactive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card blog-item mb-0">
              <div class="card-body">
                <div class="blog-img rounded position-relative mb-3">
                  <a href="blog-details.html">
                    <img
                      src="assets/img/blogs/blog-9.jpg"
                      alt="img"
                      class="img-fluid position-relative rounded"
                    />
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                  >
                    Training & Adoption
                  </a>
                </div>
                <div class="blog-content">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <span>
                      <i class="ti ti-message-minus me-1"></i>34 Comments
                    </span>
                    <span>
                      <i class="ti ti-calendar me-1"></i>06 Mar 2025
                    </span>
                  </div>
                  <div class="mb-3">
                    <h6 class="mb-2">
                      <a href="blog-details.html">User Training Tips</a>
                    </h6>
                    <p class="mb-0 truncate-2-lines">
                      Ensure your team’s success with essential training
                      strategies and onboarding tips to boost adoption rates.
                    </p>
                  </div>
                  <hr />
                  <div class="d-flex align-items-center justify-content-between">
                    <a
                      href="edit-blog.html"
                      class="btn btn-xs px-3 fs-12 btn-outline-dark"
                    >
                      <i class="ti ti-edit me-1"></i>Edit
                    </a>
                    <span class="badge badge-sm badge-soft-success">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
