// src/components/ProductsWrapper.js
import React, { useState } from "react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetAllProductMetaQuery,
} from "../api/productsApi";
import { useListCategoriesQuery } from "../api/categoryApi";
import PageHeader from "../components/Common/PageHeader";
import {
  Card,
  Table,
  Input,
  Button,
  Dropdown,
  Menu,
  Space,
  Badge,
  Image,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  TableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
const { Search } = Input;

const ProductsWrapper = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();
  const { data: categories, isLoading: isCategoriesLoading } =
    useListCategoriesQuery();
  const { data: productMeta, isLoading: isMetaLoading } =
    useGetAllProductMetaQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [metaFilter, setMetaFilter] = useState([]);

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId).unwrap();
        alert("Product deleted successfully!");
      } catch (err) {
        alert(
          "Failed to delete product: " + (err.data?.error || "Unknown error")
        );
      }
    }
  };

  // Handle search
  const filteredProducts = products?.filter((product) =>
    [product.name, product.sku, product.description || ""]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Handle filter changes
  const handleCategoryFilterChange = (categoryId) => {
    setCategoryFilter((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleMetaFilterChange = (metaId) => {
    setMetaFilter((prev) =>
      prev.includes(metaId)
        ? prev.filter((id) => id !== metaId)
        : [...prev, metaId]
    );
  };

  // Apply filters
  const finalProducts = filteredProducts?.filter((product) => {
    const matchesCategory =
      categoryFilter.length === 0 ||
      categoryFilter.includes(product.category_id) ||
      categoryFilter.includes(product.parent_category_id);
    const matchesMeta =
      metaFilter.length === 0 ||
      metaFilter.some((metaId) => {
        const meta = productMeta?.find((m) => m.id === metaId);
        return meta && product.meta?.[meta.title] === meta.unit;
      });
    return matchesCategory && matchesMeta;
  });

  // Filter menu
  const filterMenu = (
    <Menu>
      <div style={{ padding: "16px", minWidth: "300px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: "8px",
          }}
        >
          <h4 style={{ margin: 0 }}>
            <FilterOutlined /> Filter
          </h4>
        </div>
        <div style={{ marginTop: "16px" }}>
          {/* Category Filter */}
          <div>
            <h5>Category</h5>
            <Search
              placeholder="Search categories"
              style={{ marginBottom: "8px" }}
            />
            {isCategoriesLoading ? (
              <p>Loading categories...</p>
            ) : (
              categories?.map((category) => (
                <div key={category.id} style={{ padding: "4px 0" }}>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={categoryFilter.includes(category.id)}
                      onChange={() => handleCategoryFilterChange(category.id)}
                      style={{ marginRight: "8px" }}
                    />
                    {category.name}
                  </label>
                </div>
              ))
            )}
          </div>
          {/* Meta Filter */}
          <div style={{ marginTop: "16px" }}>
            <h5>Meta Fields</h5>
            <Search
              placeholder="Search meta fields"
              style={{ marginBottom: "8px" }}
            />
            {isMetaLoading ? (
              <p>Loading meta fields...</p>
            ) : (
              productMeta?.map((meta) => (
                <div key={meta.id} style={{ padding: "4px 0" }}>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={metaFilter.includes(meta.id)}
                      onChange={() => handleMetaFilterChange(meta.id)}
                      style={{ marginRight: "8px" }}
                    />
                    {meta.title}: {meta.unit || "N/A"}
                  </label>
                </div>
              ))
            )}
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <Button
              onClick={() => {
                setCategoryFilter([]);
                setMetaFilter([]);
              }}
              style={{ flex: 1 }}
            >
              Reset
            </Button>
            <Button type="primary" style={{ flex: 1 }}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Menu>
  );

  // Action menu for each product
  const getActionMenu = (product) => (
    <Menu>
      <Menu.Item key="edit">
        <a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_edit">
          <EditOutlined /> Edit
        </a>
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDeleteProduct(product.id)}>
        <DeleteOutlined /> Delete
      </Menu.Item>
      <Menu.Item key="view-variants">
        <Link to={`/products/${product.id}/variants`}>
          <EyeOutlined /> View Variants
        </Link>
      </Menu.Item>
    </Menu>
  );

  // Table columns for list view
  const columns = [
    { title: "SKU", dataIndex: "sku", key: "sku" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/products/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Parent Category ID",
      dataIndex: "parent_category_id",
      key: "parent_category_id",
    },
    { title: "Category ID", dataIndex: "category_id", key: "category_id" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text || "No description",
    },
    {
      title: "Design Code",
      key: "design_code",
      render: (record) => record.meta?.design_code || "N/A",
    },
    {
      title: "Thickness",
      key: "thickness",
      render: (record) => record.meta?.thickness || "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Dropdown overlay={getActionMenu(record)} trigger={["click"]}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="content" style={{ padding: "24px" }}>
      <PageHeader />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <Space>
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <Button icon={<FilterOutlined />}>Filter</Button>
          </Dropdown>
          <Search
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
        </Space>
        <Space>
          <Button
            icon={<TableOutlined />}
            type={viewMode === "list" ? "primary" : "default"}
            onClick={() => setViewMode("list")}
          />
          <Button
            icon={<AppstoreOutlined />}
            type={viewMode === "grid" ? "primary" : "default"}
            onClick={() => setViewMode("grid")}
          />
          <Link to="/products/add">
            <Button type="primary" icon={<PlusOutlined />}>
              Add New Product
            </Button>
          </Link>
        </Space>
      </div>

      {/* Content */}
      {isLoading || isCategoriesLoading || isMetaLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error?.data?.error || "Failed to fetch products"}</div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {finalProducts?.map((product) => (
                <Card
                  key={product.id}
                  style={{ width: 300 }}
                  cover={
                    <Image
                      src={product.images?.[0] || "/assets/img/placeholder.jpg"}
                      alt={product.name}
                      style={{ height: 150, objectFit: "cover" }}
                      preview={false}
                    />
                  }
                  actions={[
                    <Dropdown
                      key="actions"
                      overlay={getActionMenu(product)}
                      trigger={["click"]}
                    >
                      <Button icon={<EllipsisOutlined />} />
                    </Dropdown>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <Space>
                        <Badge
                          count={`#${product.sku}`}
                          style={{ backgroundColor: "#e6f7ff" }}
                        />
                        <Link to={`/products/${product.id}`}>
                          {product.name}
                        </Link>
                      </Space>
                    }
                    description={
                      <>
                        <p>
                          <strong>Parent Category ID:</strong>{" "}
                          {product.parent_category_id}
                        </p>
                        <p>
                          <strong>Category ID:</strong> {product.category_id}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {product.description || "No description"}
                        </p>
                        {product.meta?.design_code && (
                          <p>
                            <strong>Design Code:</strong>{" "}
                            {product.meta.design_code}
                          </p>
                        )}
                        {product.meta?.thickness && (
                          <p>
                            <strong>Thickness:</strong> {product.meta.thickness}
                          </p>
                        )}
                      </>
                    }
                  />
                </Card>
              ))}
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={finalProducts}
              rowKey="id"
              pagination={false}
            />
          )}
        </>
      )}

      {/* Load More */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button icon={<PlusOutlined />}>Load More</Button>
      </div>
    </div>
  );
};

export default ProductsWrapper;
