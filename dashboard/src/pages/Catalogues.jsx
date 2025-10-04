import React, { useState } from "react";
import {
  useListCataloguesQuery,
  useCreateCatalogueMutation,
  useUpdateCatalogueMutation,
  useDeleteCatalogueMutation,
} from "../api/catalogueApi"; // Adjust path to your API slice
import {
  Button,
  Form,
  Input,
  DatePicker,
  Dropdown,
  Menu,
  Table,
  Popconfirm,
} from "antd"; // Import Antd components
import {
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  DownOutlined,
} from "@ant-design/icons"; // Antd icons
import PageHeader from "../components/Common/PageHeader";
import AddNewCatalogue from "../components/Catalogues/AddNewCatalogue";
import moment from "moment"; // For date handling with Antd DatePicker

const { RangePicker } = DatePicker;

const Catalogues = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentCatalogue, setCurrentCatalogue] = useState(null);
  const [page, setPage] = useState(1); // State for pagination
  const [pageSize, setPageSize] = useState(10); // State for page size

  // RTK Query hooks
  const { data: catalogues = [], isLoading, error } = useListCataloguesQuery();
  const [createCatalogue] = useCreateCatalogueMutation();
  const [updateCatalogue] = useUpdateCatalogueMutation();
  const [deleteCatalogue] = useDeleteCatalogueMutation();

  // Filter and sort catalogues (client-side for now)
  const filteredCatalogues = catalogues
    .filter((catalogue) =>
      catalogue.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((catalogue) => {
      if (!dateRange.start || !dateRange.end) return true;
      const createdAt = new Date(catalogue.created_at);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return createdAt >= startDate && createdAt <= endDate;
    })
    .sort((a, b) => {
      const fieldA = a[sortBy];
      const fieldB = b[sortBy];
      if (sortBy === "created_at") {
        return sortOrder === "asc"
          ? new Date(fieldA) - new Date(fieldB)
          : new Date(fieldB) - new Date(fieldA);
      }
      return sortOrder === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    });

  // Open edit modal with catalogue data
  const openEditModal = (catalogue) => {
    setCurrentCatalogue(catalogue);
    setShowAddModal(true);
  };

  // Handle delete catalogue
  const handleDelete = async (id) => {
    try {
      await deleteCatalogue(id).unwrap();
    } catch (error) {
      console.error("Error deleting catalogue:", error);
    }
  };

  // Handle offcanvas close
  const handleClose = () => {
    setShowAddModal(false);
    setCurrentCatalogue(null);
  };

  // Sort menu for Antd Dropdown
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

  // Antd Table columns configuration
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "PDF URL",
      dataIndex: "pdf_url",
      key: "pdf_url",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          View PDF
        </a>
      ),
    },
    {
      title: "Banner Image",
      dataIndex: "banner_image_url",
      key: "banner_image_url",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          View Image
        </a>
      ),
    },
    {
      title: "Created On",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => new Date(text).toLocaleDateString(),
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
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this catalogue?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="content pb-0">
      <PageHeader title="Catalogues" subtitle="Manage your Catalogues" />

      <div className="card border-0 rounded-0">
        <div className="card-header d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            onClick={() => setShowAddModal(true)}
            icon={<i className="ti ti-square-rounded-plus-filled me-1"></i>}
          >
            Add Catalogue
          </Button>
        </div>

        <div className="card-body">
          {isLoading && <div>Loading...</div>}
          {error && (
            <div className="alert alert-danger">Error fetching catalogues</div>
          )}

          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Dropdown
                overlay={
                  <div
                    style={{ padding: 16, background: "#fff", borderRadius: 4 }}
                  >
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
                        />
                      </Form.Item>
                      <div className="d-flex gap-2">
                        <Button
                          onClick={() => setDateRange({ start: "", end: "" })}
                          style={{ width: "100%" }}
                        >
                          Reset
                        </Button>
                        <Button type="primary" style={{ width: "100%" }}>
                          Apply
                        </Button>
                      </div>
                    </Form>
                  </div>
                }
                trigger={["click"]}
              >
                <Button>
                  <FilterOutlined /> Filter <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={sortMenu} trigger={["click"]}>
                <Button>
                  <SortAscendingOutlined /> Sort By <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredCatalogues}
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
            }}
            rowKey="id"
          />
        </div>
      </div>

      {/* Add/Edit Catalogue Offcanvas */}
      <AddNewCatalogue catalogue={currentCatalogue} onClose={handleClose} />
    </div>
  );
};

export default Catalogues;
