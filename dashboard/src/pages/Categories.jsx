// src/components/Categories.jsx
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [error, setError] = useState(null);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [activeTab, setActiveTab] = useState("parent-categories");

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

  const handleSubmit = async (values) => {
    try {
      if (editCategory) {
        await updateCategory({
          id: editCategory.id,
          name: values.name,
          slug: values.slug,
          parent_id: values.parent_id || null,
        }).unwrap();
      } else {
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

  const handleEdit = (category) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getChildCategories = (parentId) => {
    return categories.filter(
      (category) => (category.parent_id || null) === parentId
    );
  };

  const getIndependentCategories = () => {
    return getChildCategories(null);
  };

  const handleParentClick = (parentId) => {
    setSelectedParentId(selectedParentId === parentId ? null : parentId);
  };

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
            className="categories-table-button categories-table-button-edit"
          />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDelete(record.id)}
            className="categories-table-button categories-table-button-delete"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="categories-container">
      {/* Page Header */}
      <div className="categories-header">
        <div>
          <h4 className="categories-title">
            Sources
            <Badge
              count={`${parentCategories.length} Parent Categories`}
              className="categories-badge"
            />
            <Badge
              count={`${
                getIndependentCategories().length
              } Independent Categories`}
              className="categories-badge categories-badge-independent"
            />
          </h4>
          <Breadcrumb className="categories-breadcrumb">
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
            setEditCategory(null);
            setIsModalOpen(true);
          }}
          className="categories-button-primary"
        >
          Add New Category
        </Button>
      </div>

      {/* Tabs for Parent Categories and Independent Categories */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="categories-tabs"
      >
        <TabPane tab="Parent Categories" key="parent-categories">
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
                      className="categories-card"
                    >
                      <div className="categories-card-content">
                        <div>
                          <h5 className="categories-card-title">
                            {parent.name}
                          </h5>
                          <p className="categories-card-description">
                            {childCount}{" "}
                            {childCount === 1 ? "Category" : "Categories"}
                          </p>
                        </div>
                        <Badge
                          count={childCount}
                          className="categories-card-badge"
                        />
                      </div>
                    </Card>
                  </Col>
                );
              })}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => handleParentClick(null)}
                  className="categories-card"
                >
                  <div className="categories-card-content">
                    <div>
                      <h5 className="categories-card-title">No Parent</h5>
                      <p className="categories-card-description">
                        {getChildCategories(null).length}{" "}
                        {getChildCategories(null).length === 1
                          ? "Category"
                          : "Categories"}
                      </p>
                    </div>
                    <Badge
                      count={getChildCategories(null).length}
                      className="categories-card-badge"
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          )}

          {selectedParentId !== null && (
            <Card
              title={`Categories under ${
                parentCategories.find((p) => p.id === selectedParentId)?.name ||
                "No Parent"
              }`}
              className="categories-table-card"
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
                  className="categories-error-alert"
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
                  className="categories-table"
                />
              )}
            </Card>
          )}
        </TabPane>

        <TabPane tab="Independent Categories" key="independent-categories">
          <Card
            title="Independent Categories"
            className="categories-table-card"
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
                className="categories-error-alert"
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
                className="categories-table"
              />
            )}
          </Card>
        </TabPane>
      </Tabs>

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
