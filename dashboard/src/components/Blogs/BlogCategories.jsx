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
  } = useFetchAllBlogCategoriesQuery();
  const [createBlogCategory, { isLoading: isCreating }] =
    useCreateBlogCategoryMutation();
  const [categoryName, setCategoryName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }
    try {
      await createBlogCategory({ name: categoryName }).unwrap();
      setCategoryName("");
      setIsModalVisible(false);
    } catch (err) {
      alert(
        `Failed to create category: ${
          err.data?.error || "Something went wrong"
        }`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="wp-content">
        <PageHeader />
        <div className="wp-card">
          <div className="wp-card-body">Loading categories...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wp-content">
        <PageHeader />
        <div className="wp-card">
          <div className="wp-card-body">
            Error fetching categories:{" "}
            {error?.data?.error || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  const sortMenu = (
    <Menu>
      <Menu.Item key="newest">Newest</Menu.Item>
      <Menu.Item key="oldest">Oldest</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      render: () => (
        <div className="wp-form-check">
          <input className="wp-checkbox" type="checkbox" />
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
      render: () => <span className="wp-badge wp-badge-success">Active</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Button
          href="javascript:void(0);"
          className="wp-button wp-button-outline"
          icon={<EditOutlined />}
        >
          Edit
        </Button>
      ),
      className: "no-sort",
    },
  ];

  const dataSource = categories?.map((category) => ({
    key: category._id,
    name: category.name,
    createdAt: category.createdAt,
  }));

  return (
    <>
      <div className="wp-card">
        <div className="wp-card-header">
          <div className="wp-input-group">
            <span className="wp-input-icon">
              <SearchOutlined />
            </span>
            <Input placeholder="Search" className="wp-input" />
          </div>
          <Button
            className="wp-button wp-button-primary"
            icon={<PlusSquareFilled />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Blog Category
          </Button>
        </div>
        <div className="wp-card-body">
          <div className="wp-toolbar">
            <div className="wp-toolbar-left">
              <div className="wp-date-picker">
                <CalendarOutlined />
                <RangePicker
                  className="wp-range-picker"
                  defaultValue={[null, null]}
                  format="D MMM YY"
                />
              </div>
            </div>
            <div className="wp-toolbar-right">
              <Dropdown overlay={sortMenu}>
                <Button className="wp-button wp-button-outline">
                  <SortAscendingOutlined />
                  Sort By
                </Button>
              </Dropdown>
            </div>
          </div>
          <div className="wp-table-container">
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              className="wp-table"
              id="categories_list"
            />
            <div className="wp-table-footer">
              <div className="wp-table-length"></div>
              <div className="wp-table-paginate"></div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Add Blog Category"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="wp-modal"
        wrapClassName="wp-modal-dialog"
        style={{ top: 20 }}
      >
        <div className="wp-modal-content">
          <div className="wp-modal-body">
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
                  className="wp-input"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="wp-button wp-button-primary"
                loading={isCreating}
              >
                {isCreating ? "Creating..." : "Create Category"}
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BlogCategories;
