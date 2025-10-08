import React, { useState } from "react";
import {
  useListCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../api/categoryApi";
import { useGetParentCategoriesQuery } from "../api/parentCategoryApi";
import {
  Tabs,
  Card,
  Table,
  Modal,
  Row,
  Col,
  Badge,
  Space,
  Alert,
  Breadcrumb,
  Button,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryModal from "../components/Category/CategoryModal";
const { TabPane } = Tabs;

const Categories = () => {
  // State for modal, selected parent category, active tab, and edit mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null); // Store category to edit
  const [error, setError] = useState(null);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [activeTab, setActiveTab] = useState("parent-categories");

  // Fetch categories and parent categories
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useListCategoriesQuery();
  const { data: parentCategories = [], isLoading: isParentCategoriesLoading } =
    useGetParentCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Handle form submission (create or update)
  const handleSubmit = async (values) => {
    try {
      if (editCategory) {
        // Update category
        await updateCategory({
          id: editCategory.id,
          name: values.name,
          slug: values.slug,
          parent_id: values.parent_id || null,
        }).unwrap();
      } else {
        // Create category
        await createCategory({
          name: values.name,
          slug: values.slug,
          parent_id: values.parent_id || null,
        }).unwrap();
      }
      setIsModalOpen(false);
      setEditCategory(null);
      setError(null);
    } catch (err) {
      setError(
        err.data?.error ||
          `Failed to ${editCategory ? "update" : "create"} category`
      );
    }
  };

  // Handle edit button click
  const handleEdit = (category) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      onOk: async () => {
        try {
          await deleteCategory(id).unwrap();
        } catch (err) {
          Modal.error({
            title: "Failed to delete category",
            content: err.data?.error || "Unknown error",
          });
        }
      },
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get categories for a specific parent
  const getChildCategories = (parentId) => {
    return categories.filter(
      (category) => (category.parent_id || null) === parentId
    );
  };

  // Get independent categories (no parent)
  const getIndependentCategories = () => {
    return getChildCategories(null);
  };

  // Handle parent category click
  const handleParentClick = (parentId) => {
    setSelectedParentId(selectedParentId === parentId ? null : parentId);
  };

  // Table columns for child and independent categories
  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => formatDate(date),
    },
    {
      title: "Status",
      key: "status",
      render: () => <Badge status="success" text="Active" />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 24px" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h4 style={{ marginBottom: 8 }}>
            Sources
            <Badge
              count={`${parentCategories.length} Parent Categories`}
              style={{ backgroundColor: "#1890ff", marginLeft: 8 }}
            />
            <Badge
              count={`${
                getIndependentCategories().length
              } Independent Categories`}
              style={{ backgroundColor: "#8c8c8c", marginLeft: 8 }}
            />
          </h4>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="index.html">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Sources</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditCategory(null); // Clear edit mode for new category
            setIsModalOpen(true);
          }}
        >
          Add New Category
        </Button>
      </div>
      {/* End Page Header */}

      {/* Tabs for Parent Categories and Independent Categories */}
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Parent Categories" key="parent-categories">
          {/* Parent Categories as Cards */}
          {isParentCategoriesLoading ? (
            <div>Loading parent categories...</div>
          ) : (
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              {parentCategories.map((parent) => {
                const childCount = getChildCategories(parent.id).length;
                return (
                  <Col xs={24} sm={12} md={8} lg={6} key={parent.id}>
                    <Card
                      hoverable
                      onClick={() => handleParentClick(parent.id)}
                      style={{ height: "100%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%",
                        }}
                      >
                        <div>
                          <h5 style={{ margin: 0 }}>{parent.name}</h5>
                          <p style={{ color: "#8c8c8c", margin: "8px 0 0" }}>
                            {childCount}{" "}
                            {childCount === 1 ? "Category" : "Categories"}
                          </p>
                        </div>
                        <Badge
                          count={childCount}
                          style={{ backgroundColor: "#1890ff", marginTop: 16 }}
                        />
                      </div>
                    </Card>
                  </Col>
                );
              })}
              {/* Card for categories without parent */}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => handleParentClick(null)}
                  style={{ height: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <div>
                      <h5 style={{ margin: 0 }}>No Parent</h5>
                      <p style={{ color: "#8c8c8c", margin: "8px 0 0" }}>
                        {getChildCategories(null).length}{" "}
                        {getChildCategories(null).length === 1
                          ? "Category"
                          : "Categories"}
                      </p>
                    </div>
                    <Badge
                      count={getChildCategories(null).length}
                      style={{ backgroundColor: "#1890ff", marginTop: 16 }}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          )}

          {/* Child Categories Table */}
          {selectedParentId !== null && (
            <Card
              title={`Categories under ${
                parentCategories.find((p) => p.id === selectedParentId)?.name ||
                "No Parent"
              }`}
              style={{ marginTop: 24 }}
            >
              {isCategoriesLoading ? (
                <div>Loading categories...</div>
              ) : categoriesError ? (
                <Alert
                  message="Error"
                  description={
                    categoriesError.data?.error || "Failed to load categories"
                  }
                  type="error"
                  showIcon
                />
              ) : getChildCategories(selectedParentId).length === 0 ? (
                <div>No categories found for this parent.</div>
              ) : (
                <Table
                  columns={columns}
                  dataSource={getChildCategories(selectedParentId)}
                  rowKey="id"
                  pagination={false}
                  loading={isCategoriesLoading}
                />
              )}
            </Card>
          )}
        </TabPane>

        <TabPane tab="Independent Categories" key="independent-categories">
          <Card title="Independent Categories" style={{ marginTop: 24 }}>
            {isCategoriesLoading ? (
              <div>Loading categories...</div>
            ) : categoriesError ? (
              <Alert
                message="Error"
                description={
                  categoriesError.data?.error || "Failed to load categories"
                }
                type="error"
                showIcon
              />
            ) : getIndependentCategories().length === 0 ? (
              <div>No independent categories found.</div>
            ) : (
              <Table
                columns={columns}
                dataSource={getIndependentCategories()}
                rowKey="id"
                pagination={false}
                loading={isCategoriesLoading}
              />
            )}
          </Card>
        </TabPane>
      </Tabs>

      {/* Category Modal for Create/Edit */}
      <CategoryModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditCategory(null);
          setError(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editCategory || { name: "", slug: "", parent_id: "" }}
        parentCategories={parentCategories}
        isSubmitting={editCategory ? isUpdating : isCreating}
        error={error}
      />
    </div>
  );
};

export default Categories;
