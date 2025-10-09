// src/components/ManageUsers/ManageUsers.jsx
import React, { useState, useMemo } from "react";
import { parse, format } from "date-fns";
import {
  Table,
  Input,
  Button,
  Space,
  Badge,
  Checkbox,
  Popconfirm,
  Modal,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PageHeader from "../components/Common/PageHeader";
import { useListUsersQuery, useDeleteUserMutation } from "../api/userApi";
import { useAuth } from "../store/AuthContext";
import AddNewUser from "../components/Users/AddNewUser";

const ManageUsers = () => {
  const { authState } = useAuth();
  const currentUser = authState.user;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    names: [],
    phones: [],
    emails: [],
    statuses: [],
  });
  const [sortBy, setSortBy] = useState("newest");
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    phone: true,
    email: true,
    status: true,
    action: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: usersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useListUsersQuery();
  const users = usersData ?? [];
  const [deleteUser] = useDeleteUserMutation();

  const isValidDate = (date) => date && !isNaN(new Date(date).getTime());
  const formatDate = (dateString) => {
    if (!dateString || !isValidDate(dateString)) return "Invalid Date";
    try {
      const parsedDate = parse(dateString, "yyyy-MM-dd HH:mm:ss", new Date());
      if (isNaN(parsedDate.getTime())) return "Invalid Date";
      return format(parsedDate, "dd MMM yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (category, value) =>
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  const handleSortChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      setSortBy(sorter.order === "descend" ? "newest" : "oldest");
    }
  };
  const handleColumnToggle = (column) =>
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete user:", err);
      Modal.error({
        title: "Error",
        content: "Failed to delete user",
      });
    }
  };

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm);
      const matchesFilters =
        (selectedFilters.names.length === 0 ||
          selectedFilters.names.includes(user.name)) &&
        (selectedFilters.phones.length === 0 ||
          selectedFilters.phones.includes(user.phone)) &&
        (selectedFilters.emails.length === 0 ||
          selectedFilters.emails.includes(user.email)) &&
        (selectedFilters.statuses.length === 0 ||
          selectedFilters.statuses.includes(
            user.is_active ? "Active" : "Inactive"
          ));
      return matchesSearch && matchesFilters;
    });
  }, [users, searchTerm, selectedFilters]);

  const sortedUsers = useMemo(() => {
    return filteredUsers.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    );
  }, [filteredUsers, sortBy]);

  const columns = [
    {
      title: <Checkbox onChange={() => {}} />,
      dataIndex: "checkbox",
      key: "checkbox",
      render: () => <Checkbox className="manage-users-table-checkbox" />,
      width: 50,
    },
    visibleColumns.name && {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    visibleColumns.phone && {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "-",
    },
    visibleColumns.email && {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    visibleColumns.status && {
      title: "Status",
      dataIndex: "is_active",
      key: "status",
      render: (is_active) => (
        <Badge
          status={is_active ? "success" : "error"}
          text={is_active ? "Active" : "Inactive"}
          className="manage-users-table-status"
        />
      ),
    },
    visibleColumns.action &&
      currentUser?.role === "Admin" && {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space>
            <Button
              type="link"
              icon={<i className="ti ti-pencil" />}
              onClick={() => {
                console.log("Edit user:", record.id);
              }}
              className="manage-users-table-action-button manage-users-table-action-button-edit"
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDeleteUser(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="link"
                danger
                icon={<i className="ti ti-trash" />}
                className="manage-users-table-action-button manage-users-table-action-button-delete"
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
        align: "right",
      },
  ].filter(Boolean);

  return (
    <div className="manage-users-container">
      <PageHeader />
      <div className="manage-users-card">
        <div className="manage-users-card-header">
          <Input
            placeholder="Search users"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={handleSearch}
            className="manage-users-search-input"
          />
          <Button
            type="primary"
            icon={<i className="ti ti-square-rounded-plus-filled" />}
            onClick={() => setModalVisible(true)}
            className="manage-users-button-primary"
          >
            Add User
          </Button>
        </div>
        <div className="manage-users-card-content">
          {isError ? (
            <div className="manage-users-table-error">
              Error: {error?.data?.message || "Failed to load users"}
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={sortedUsers.map((user) => ({
                ...user,
                key: user.id,
              }))}
              loading={isLoading}
              pagination={{
                current: currentPage,
                pageSize: 10,
                total: sortedUsers.length,
                onChange: (page) => setCurrentPage(page),
                showSizeChanger: false,
              }}
              onChange={handleSortChange}
              className="manage-users-table"
              aria-label="Users table"
            />
          )}
        </div>
      </div>

      <Modal
        title="Add New User"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={720}
        className="manage-users-modal"
        aria-label="Add new user modal"
      >
        <AddNewUser
          onUserCreated={() => {
            refetch();
            setModalVisible(false);
          }}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default ManageUsers;
