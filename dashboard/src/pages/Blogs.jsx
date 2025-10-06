import React, { useState } from "react";
import { useListBlogsQuery } from "../api/blogApi"; // Adjust path as needed
import { Tabs, Input, Button } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  EditOutlined,
  MessageOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import PageHeader from "../components/Common/PageHeader";
import BlogCategories from "../components/Blogs/BlogCategories";

const { TabPane } = Tabs;

const Blogs = () => {
  const [activeTab, setActiveTab] = useState("blogs"); // State to manage active tab
  const { data: blogs, isLoading, isError, error } = useListBlogsQuery(); // Fetch blogs using RTK Query

  // Render loading state
  if (isLoading) {
    return (
      <div className="content">
        <PageHeader />
        <div className="card">
          <div className="card-body">Loading blogs...</div>
        </div>
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className="content">
        <PageHeader />
        <div className="card">
          <div className="card-body">
            Error fetching blogs: {error?.data?.error || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <PageHeader />

      {/* Tabs Navigation */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="nav nav-tabs mb-3"
      >
        <TabPane
          tab={
            <button
              className={`nav-link ${activeTab === "blogs" ? "active" : ""}`}
            >
              Blogs
            </button>
          }
          key="blogs"
        />
        <TabPane
          tab={
            <button
              className={`nav-link ${
                activeTab === "categories" ? "active" : ""
              }`}
            >
              Blog Categories
            </button>
          }
          key="categories"
        />
      </Tabs>

      {/* Tab Content */}
      {activeTab === "blogs" && (
        <>
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div className="input-icon input-icon-start position-relative">
                  <Input
                    prefix={
                      <SearchOutlined className="input-icon-addon text-dark" />
                    }
                    placeholder="Search"
                    className="form-control"
                  />
                </div>
                <Button
                  type="primary"
                  href="add-blog.html"
                  className="btn btn-primary"
                  icon={<PlusSquareFilled className="me-1" />}
                >
                  Add Blog
                </Button>
              </div>
            </div>
          </div>

          <div className="row row-gap-3">
            {blogs?.map((blog) => (
              <div key={blog._id} className="col-md-6 col-lg-4">
                <div className="card blog-item mb-0">
                  <div className="card-body">
                    <div className="blog-img rounded position-relative mb-3">
                      <a href={`blog-details.html?slug=${blog.slug}`}>
                        <img
                          src={
                            blog.bannerImage || "assets/img/blogs/default.jpg"
                          }
                          alt={blog.title}
                          className="img-fluid position-relative rounded"
                        />
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-xs btn-info position-absolute fs-12 py-0 top-0 start-0 mt-2 ms-2"
                      >
                        {blog.category?.name || "Uncategorized"}
                      </a>
                    </div>
                    <div className="blog-content">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                        <span>
                          <MessageOutlined className="ti ti-message-minus me-1" />
                          {blog.comments?.length || 0} Comments
                        </span>
                        <span>
                          <CalendarOutlined className="ti ti-calendar me-1" />
                          {new Date(
                            blog.publishedAt || blog.createdAt
                          ).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-2">
                          <a href={`blog-details.html?slug=${blog.slug}`}>
                            {blog.title}
                          </a>
                        </h6>
                        <p className="mb-0 truncate-2-lines">
                          {blog.excerpt || "No excerpt available"}
                        </p>
                      </div>
                      <hr />
                      <div className="d-flex align-items-center justify-content-between">
                        <Button
                          href={`edit-blog.html?id=${blog._id}`}
                          className="btn btn-xs px-3 fs-12 btn-outline-dark"
                          icon={<EditOutlined className="ti ti-edit me-1" />}
                        >
                          Edit
                        </Button>
                        <span
                          className={`badge badge-sm badge-soft-${
                            blog.status === "published" ? "success" : "danger"
                          }`}
                        >
                          {blog.status === "published" ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "categories" && <BlogCategories />}
    </div>
  );
};

export default Blogs;
