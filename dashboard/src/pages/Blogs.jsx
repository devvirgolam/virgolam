// src/components/Blogs/Blogs.jsx
import React, { useState } from "react";
import { useListBlogsQuery } from "../api/blogApi";
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
  const [activeTab, setActiveTab] = useState("blogs");
  const { data: blogs, isLoading, isError, error } = useListBlogsQuery();

  if (isLoading) {
    return (
      <div className="blogs-container">
        <PageHeader />
        <div className="blogs-card">
          <div className="blogs-card-content">Loading blogs...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="blogs-container">
        <PageHeader />
        <div className="blogs-error">
          Error fetching blogs: {error?.data?.error || "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-container">
      <PageHeader />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="blogs-tabs"
      >
        <TabPane tab="Blogs" key="blogs" />
        <TabPane tab="Blog Categories" key="categories" />
      </Tabs>

      {activeTab === "blogs" && (
        <>
          <div className="blogs-search-container">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search blogs"
              className="blogs-search-input"
            />
            <Button
              type="primary"
              href="/blogs/add"
              className="blogs-button-primary"
              icon={<PlusSquareFilled />}
            >
              Add Blog
            </Button>
          </div>

          <div className="blogs-grid row row-gap-3">
            {blogs?.map((blog) => (
              <div key={blog._id} className="col-md-6 col-lg-4">
                <div className="blogs-card">
                  <div className="blogs-card-img">
                    <a href={`blog-details.html?slug=${blog.slug}`}>
                      <img
                        src={blog.bannerImage || "assets/img/blogs/default.jpg"}
                        alt={blog.title}
                        className="img-fluid"
                      />
                    </a>
                    <a href="javascript:void(0);" className="category-badge">
                      {blog.category?.name || "Uncategorized"}
                    </a>
                  </div>
                  <div className="blogs-card-content">
                    <div className="blogs-card-meta">
                      <span>
                        <MessageOutlined />
                        {blog.comments?.length || 0} Comments
                      </span>
                      <span>
                        <CalendarOutlined />
                        {new Date(
                          blog.publishedAt || blog.createdAt
                        ).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      <h6 className="blogs-card-title">
                        <a href={`blog-details.html?slug=${blog.slug}`}>
                          {blog.title}
                        </a>
                      </h6>
                      <p className="blogs-card-excerpt">
                        {blog.excerpt || "No excerpt available"}
                      </p>
                    </div>
                    <hr />
                    <div className="blogs-card-footer">
                      <Button
                        href={`edit-blog.html?id=${blog._id}`}
                        className="blogs-card-button"
                        icon={<EditOutlined />}
                      >
                        Edit
                      </Button>
                      <span
                        className={`blogs-card-status ${
                          blog.status === "published"
                            ? "blogs-card-status-active"
                            : "blogs-card-status-inactive"
                        }`}
                      >
                        {blog.status === "published" ? "Active" : "Inactive"}
                      </span>
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
