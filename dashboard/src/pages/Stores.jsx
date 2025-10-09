// src/components/Stores/Stores.jsx
import React, { useState } from "react";
import {
  Table,
  Dropdown,
  Menu,
  Input,
  Button,
  DatePicker,
  Space,
  Typography,
} from "antd";
import { DownOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import PageHeader from "../components/Common/PageHeader";
import { useListDealersQuery } from "../api/dealerApi.";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const Stores = () => {
  const { data: dealers, isLoading: isDealersLoading } = useListDealersQuery();
  const [storeDetails, setStoreDetails] = useState({});
  const [loadingStores, setLoadingStores] = useState({});

  const fetchStoreDetails = async (storeId) => {
    if (storeDetails[storeId] || loadingStores[storeId]) return;
    setLoadingStores((prev) => ({ ...prev, [storeId]: true }));
    try {
      const response = await fetch(
        `http://localhost:8000/api/stores/${storeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch store details");
      const data = await response.json();
      setStoreDetails((prev) => ({ ...prev, [storeId]: data }));
    } catch (error) {
      console.error(`Error fetching store ${storeId}:`, error);
      setStoreDetails((prev) => ({ ...prev, [storeId]: null }));
    } finally {
      setLoadingStores((prev) => ({ ...prev, [storeId]: false }));
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "select",
      render: () => <input type="checkbox" className="stores-table-checkbox" />,
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
    },
    {
      title: "Stores",
      dataIndex: "stores",
      render: (stores, record) => (
        <Space direction="vertical">
          {stores.map((store) => (
            <Dropdown
              key={store.id}
              overlay={storeDetailsMenu(store.id)}
              trigger={["click"]}
              onVisibleChange={(visible) => {
                if (visible) {
                  fetchStoreDetails(store.id);
                }
              }}
            >
              <a
                onClick={(e) => e.preventDefault()}
                className="stores-table-dropdown"
              >
                {store.name} <DownOutlined />
              </a>
            </Dropdown>
          ))}
        </Space>
      ),
    },
    {
      title: "Company",
      dataIndex: "company_name",
      sorter: (a, b) =>
        (a.company_name || "").localeCompare(b.company_name || ""),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Space>
          <Button
            type="link"
            className="stores-table-action-button stores-table-action-button-edit"
          >
            Edit
          </Button>
          <Button
            type="link"
            className="stores-table-action-button stores-table-action-button-delete"
          >
            Delete
          </Button>
        </Space>
      ),
      align: "right",
    },
  ];

  const storeDetailsMenu = (storeId) => {
    const store = storeDetails[storeId];
    const isLoading = loadingStores[storeId];

    return (
      <Menu className="stores-table-dropdown">
        {isLoading ? (
          <Text>Loading...</Text>
        ) : store ? (
          <div>
            <Text strong>Store Details</Text>
            <div style={{ marginTop: 8 }}>
              <Text>Name: {store.name || "N/A"}</Text>
              <br />
              <Text>Phone: {store.phone || "N/A"}</Text>
              <br />
              {store.address && (
                <>
                  <Text strong>Address:</Text>
                  <br />
                  <Text>Street: {store.address.street || "N/A"}</Text>
                  <br />
                  <Text>City: {store.address.city || "N/A"}</Text>
                  <br />
                  <Text>State: {store.address.state || "N/A"}</Text>
                  <br />
                  <Text>Country: {store.address.country || "N/A"}</Text>
                  <br />
                  <Text>Pincode: {store.address.pincode || "N/A"}</Text>
                  <br />
                  <Text>
                    Coordinates: {store.address.lat || "N/A"},{" "}
                    {store.address.lng || "N/A"}
                  </Text>
                </>
              )}
            </div>
          </div>
        ) : (
          <Text>No store details available</Text>
        )}
      </Menu>
    );
  };

  const dataSource =
    dealers?.map((dealer) => ({
      key: dealer.id,
      name: dealer.name,
      email: dealer.email || "N/A",
      stores: dealer.stores || [],
      company_name: dealer.company_name || "N/A",
    })) || [];

  return (
    <div className="stores-container">
      <PageHeader />

      <div className="stores-card">
        <div className="stores-card-header">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search companies"
            className="stores-search-input"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="stores-button-primary"
          >
            Add Company
          </Button>
        </div>
        <div className="stores-card-content">
          <div className="stores-filter-container">
            <Space>
              <Button className="stores-filter-button">
                Sort By <DownOutlined />
              </Button>
              <RangePicker
                defaultValue={[moment("2025-06-09"), moment("2025-06-09")]}
                format="MMM D, YYYY"
                className="stores-date-picker"
              />
            </Space>
            <Space>
              <Button className="stores-filter-button">
                Filter <DownOutlined />
              </Button>
              <Button className="stores-filter-button">Manage Columns</Button>
            </Space>
          </div>
          {isDealersLoading ? (
            <div className="stores-table-loading">Loading companies...</div>
          ) : (
            <Table
              columns={columns}
              dataSource={dataSource}
              loading={isDealersLoading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50"],
              }}
              rowSelection={{
                type: "checkbox",
              }}
              className="stores-table"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stores;
