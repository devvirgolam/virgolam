import React, { useState } from "react";
import {
  useFetchAllBlogCategoriesQuery,
  useCreateBlogCategoryMutation,
} from "../../api/blogApi";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  DatePicker,
  Dropdown,
  Menu,
} from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  EditOutlined,
  CalendarOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import PageHeader from "../Common/PageHeader";

const { RangePicker } = DatePicker;

const BlogCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useFetchAllBlogCategoriesQuery(); // Fetch categories
  const [createBlogCategory, { isLoading: isCreating }] =
    useCreateBlogCategoryMutation(); // Create category mutation
  const [categoryName, setCategoryName] = useState(""); // State for new category name
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  // Handle form submission for creating a category
  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }
    try {
      await createBlogCategory({ name: categoryName }).unwrap();
      setCategoryName(""); // Reset form
      setIsModalVisible(false); // Close modal
    } catch (err) {
      alert(
        `Failed to create category: ${
          err.data?.error || "Something went wrong"
        }`
      );
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="content pb-0">
        <PageHeader />
        <div className="card border-0 rounded-0">
          <div className="card-body">Loading categories...</div>
        </div>
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className="content pb-0">
        <PageHeader />
        <div className="card border-0 rounded-0">
          <div className="card-body">
            Error fetching categories:{" "}
            {error?.data?.error || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  // Dropdown menu for sorting
  const sortMenu = (
    <Menu>
      <Menu.Item key="newest">Newest</Menu.Item>
      <Menu.Item key="oldest">Oldest</Menu.Item>
    </Menu>
  );

  // Table columns
  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      render: () => (
        <div className="form-check form-check-md">
          <input className="form-check-input" type="checkbox" />
        </div>
      ),
      className: "no-sort",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        new Date(date).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => (
        <span className="badge badge-sm badge-soft-success">Active</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Button
          href="javascript:void(0);"
          className="btn btn-xs px-3 fs-12 btn-outline-dark"
          icon={<EditOutlined className="ti ti-edit me-1" />}
        >
          Edit
        </Button>
      ),
      className: "no-sort",
    },
  ];

  // Table data
  const dataSource = categories?.map((category) => ({
    key: category._id,
    name: category.name,
    createdAt: category.createdAt,
  }));

  return (
    <div className="content pb-0">
      <PageHeader />

      <div className="card border-0 rounded-0">
        <div className="card-header d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <div className="input-icon input-icon-start position-relative">
            <Input
              prefix={<SearchOutlined className="input-icon-addon text-dark" />}
              placeholder="Search"
              className="form-control"
            />
          </div>
          <Button
            type="primary"
            className="btn btn-primary"
            icon={
              <PlusSquareFilled className="ti ti-square-rounded-plus-filled me-1" />
            }
            onClick={() => setIsModalVisible(true)}
          >
            Add Blog Category
          </Button>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div className="reportrange-picker reportrange d-flex align-items-center shadow">
                <CalendarOutlined className="ti ti-calendar-due text-dark fs-14 me-1" />
                <RangePicker
                  className="reportrange-picker-field"
                  defaultValue={[null, null]}
                  format="D MMM YY"
                />
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Dropdown overlay={sortMenu}>
                <Button className="btn btn-outline-light px-2 shadow">
                  <SortAscendingOutlined className="ti ti-sort-ascending-2 me-2" />
                  Sort By
                </Button>
              </Dropdown>
            </div>
          </div>

          <div className="table-responsive custom-table">
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              className="table table-nowrap"
              id="categories_list"
            />
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="datatable-length"></div>
              </div>
              <div className="col-md-6">
                <div className="datatable-paginate"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding Category */}
      <Modal
        title="Add Blog Category"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="modal fade"
        wrapClassName="modal-dialog"
        style={{ top: 20 }}
      >
        <div className="modal-content">
          <div className="modal-body">
            <Form onFinish={handleCreateCategory}>
              <Form.Item
                label="Category Name"
                name="categoryName"
                rules={[
                  { required: true, message: "Category name is required" },
                ]}
              >
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="form-control"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="btn btn-primary"
                loading={isCreating}
              >
                {isCreating ? "Creating..." : "Create Category"}
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlogCategories;
