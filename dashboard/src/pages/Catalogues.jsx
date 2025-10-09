// src/components/Catalogues.jsx
import React, { useState } from "react";
import {
  useListCataloguesQuery,
  useCreateCatalogueMutation,
  useUpdateCatalogueMutation,
  useDeleteCatalogueMutation,
} from "../api/catalogueApi";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Dropdown,
  Menu,
  Table,
  Popconfirm,
  Card,
  Row,
  Col,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  DownOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import AddNewCatalogue from "../components/Catalogues/AddNewCatalogue";
import moment from "moment";

const { RangePicker } = DatePicker;

const Catalogues = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentCatalogue, setCurrentCatalogue] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewMode, setViewMode] = useState("list");

  const { data: catalogues = [], isLoading, error } = useListCataloguesQuery();
  const [createCatalogue] = useCreateCatalogueMutation();
  const [updateCatalogue] = useUpdateCatalogueMutation();
  const [deleteCatalogue] = useDeleteCatalogueMutation();

  const filteredCatalogues = catalogues
    .filter((catalogue) =>
      catalogue.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((catalogue) => {
      if (!dateRange.start || !dateRange.end) return true;
      const createdAt = new Date(catalogue.created_at);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return (
        createdAt >= startDate && createdAt <= endDate && !isNaN(createdAt)
      );
    })
    .sort((a, b) => {
      const fieldA = a[sortBy];
      const fieldB = b[sortBy];
      if (sortBy === "created_at") {
        const dateA = new Date(fieldA);
        const dateB = new Date(fieldB);
        return sortOrder === "asc"
          ? (isNaN(dateA) ? 1 : dateA) - (isNaN(dateB) ? 1 : dateB)
          : (isNaN(dateB) ? 1 : dateB) - (isNaN(dateA) ? 1 : dateA);
      }
      return sortOrder === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA); // Fixed typo in original code
    });

  const paginatedCatalogues = filteredCatalogues.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const openEditModal = (catalogue) => {
    setCurrentCatalogue(catalogue);
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCatalogue(id).unwrap();
    } catch (error) {
      console.error("Error deleting catalogue:", error);
    }
  };

  const handleClose = () => {
    setShowAddModal(false);
    setCurrentCatalogue(null);
  };

  const sortMenu = (
    <Menu>
      <Menu.Item
        key="name-asc"
        onClick={() => {
          setSortBy("name");
          setSortOrder("asc");
        }}
      >
        Name (A-Z)
      </Menu.Item>
      <Menu.Item
        key="name-desc"
        onClick={() => {
          setSortBy("name");
          setSortOrder("desc");
        }}
      >
        Name (Z-A)
      </Menu.Item>
      <Menu.Item
        key="created_at-asc"
        onClick={() => {
          setSortBy("created_at");
          setSortOrder("asc");
        }}
      >
        Created Date (Oldest)
      </Menu.Item>
      <Menu.Item
        key="created_at-desc"
        onClick={() => {
          setSortBy("created_at");
          setSortOrder("desc");
        }}
      >
        Created Date (Newest)
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tooltip title={text}>
          <span
            style={{
              display: "inline-block",
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "PDF URL",
      dataIndex: "pdf_url",
      key: "pdf_url",
      render: (text) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="wp-action-link"
        >
          View PDF
        </a>
      ),
    },
    {
      title: "Banner Image",
      dataIndex: "banner_image_url",
      key: "banner_image_url",
      render: (text) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="wp-action-link"
        >
          View Image
        </a>
      ),
    },
    {
      title: "Created On",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        const date = new Date(text);
        return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            size="small"
            onClick={() => openEditModal(record)}
            aria-label={`Edit ${record.name}`}
            className="wp-button-primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this catalogue?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              size="small"
              aria-label={`Delete ${record.name}`}
              className="wp-button-danger"
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const renderCardView = () => (
    <Row gutter={[16, 16]} className="wp-grid">
      {paginatedCatalogues.map((catalogue) => (
        <Col xs={24} sm={12} md={8} lg={6} key={catalogue.id}>
          <Card
            hoverable
            className="wp-catalogue-card"
            cover={
              <img
                alt={catalogue.name}
                src={catalogue.banner_image_url}
                className="wp-catalogue-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            }
            actions={[
              <Button
                type="link"
                onClick={() => openEditModal(catalogue)}
                key="edit"
                aria-label={`Edit ${catalogue.name}`}
                className="wp-action-link"
              >
                Edit
              </Button>,
              <Popconfirm
                title="Are you sure you want to delete this catalogue?"
                onConfirm={() => handleDelete(catalogue.id)}
                okText="Yes"
                cancelText="No"
                key="delete"
              >
                <Button
                  type="link"
                  danger
                  aria-label={`Delete ${catalogue.name}`}
                  className="wp-action-link"
                >
                  Delete
                </Button>
              </Popconfirm>,
            ]}
          >
            <Card.Meta
              title={
                <Tooltip title={catalogue.name}>
                  <span
                    style={{
                      display: "inline-block",
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {catalogue.name}
                  </span>
                </Tooltip>
              }
              description={
                <>
                  <p>
                    <a
                      href={catalogue.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wp-action-link"
                      aria-label={`View PDF for ${catalogue.name}`}
                    >
                      View PDF
                    </a>
                  </p>
                  <p>
                    Created:{" "}
                    {isNaN(new Date(catalogue.created_at))
                      ? "Invalid Date"
                      : new Date(catalogue.created_at).toLocaleDateString()}
                  </p>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="wp-catalogues">
      <h1 className="wp-page-title">Catalogues</h1>

      <div className="wp-card">
        <div className="wp-card-header">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search catalogues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="wp-search-input"
            aria-label="Search catalogues by name"
          />
          <div className="d-flex gap-2">
            <Button
              icon={
                viewMode === "list" ? (
                  <AppstoreOutlined />
                ) : (
                  <UnorderedListOutlined />
                )
              }
              onClick={() => setViewMode(viewMode === "list" ? "card" : "list")}
              className="wp-view-toggle-button"
              aria-label={
                viewMode === "list"
                  ? "Switch to card view"
                  : "Switch to list view"
              }
            >
              {viewMode === "list" ? "Card View" : "List View"}
            </Button>
            <Button
              type="primary"
              onClick={() => setShowAddModal(true)}
              icon={<i className="ti ti-square-rounded-plus-filled me-1"></i>}
              className="wp-button-primary"
              aria-label="Add new catalogue"
            >
              Add Catalogue
            </Button>
          </div>
        </div>

        <div className="wp-card-body">
          {isLoading && <div>Loading...</div>}
          {error && (
            <div className="wp-error-alert" role="alert">
              Error fetching catalogues
            </div>
          )}

          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Dropdown
                overlay={
                  <div className="wp-filter-dropdown">
                    <Form layout="vertical">
                      <Form.Item label="Date Range">
                        <RangePicker
                          value={
                            dateRange.start && dateRange.end
                              ? [moment(dateRange.start), moment(dateRange.end)]
                              : []
                          }
                          onChange={(dates, dateStrings) =>
                            setDateRange({
                              start: dateStrings[0],
                              end: dateStrings[1],
                            })
                          }
                          aria-label="Select date range for filtering"
                          className="wp-input"
                        />
                      </Form.Item>
                      <div className="d-flex gap-2">
                        <Button
                          onClick={() => setDateRange({ start: "", end: "" })}
                          style={{ width: "100%" }}
                          className="wp-button"
                          aria-label="Reset date range filter"
                        >
                          Reset
                        </Button>
                        <Button
                          type="primary"
                          style={{ width: "100%" }}
                          className="wp-button-primary"
                          aria-label="Apply date range filter"
                        >
                          Apply
                        </Button>
                      </div>
                    </Form>
                  </div>
                }
                trigger={["click"]}
              >
                <Button
                  className="wp-filter-button"
                  aria-label="Open filter options"
                >
                  <FilterOutlined /> Filter <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={sortMenu} trigger={["click"]}>
                <Button
                  className="wp-sort-button"
                  aria-label="Open sort options"
                >
                  <SortAscendingOutlined /> Sort By <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>

          {viewMode === "list" ? (
            <Table
              columns={columns}
              dataSource={paginatedCatalogues}
              loading={isLoading}
              pagination={{
                current: page,
                pageSize: pageSize,
                total: filteredCatalogues.length,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                },
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50"],
                className: "wp-pagination",
                "aria-label": "Pagination for catalogue table",
              }}
              rowKey="id"
              className="wp-table"
            />
          ) : (
            <>
              {renderCardView()}
              <div className="d-flex justify-content-center mt-3">
                <Table
                  pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: filteredCatalogues.length,
                    onChange: (page, pageSize) => {
                      setPage(page);
                      setPageSize(pageSize);
                    },
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50"],
                    className: "wp-pagination",
                    "aria-label": "Pagination for catalogue card view",
                  }}
                  style={{ width: "auto" }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <AddNewCatalogue
        visible={showAddModal}
        catalogue={currentCatalogue}
        onClose={handleClose}
      />
    </div>
  );
};

export default Catalogues;
