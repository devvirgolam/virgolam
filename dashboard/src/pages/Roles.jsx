import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Space } from "antd";
import PageHeader from "../components/Common/PageHeader";
import { useListRolesQuery, useCreateRoleMutation } from "../api/rolesApi"; // Adjust path as needed
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Import AntD styles

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // AntD Form instance

  // Fetch roles using the useListRolesQuery hook
  const { data: roles, isLoading, error } = useListRolesQuery();
  const [createRole] = useCreateRoleMutation();

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter roles based on search term
  const filteredRoles = roles?.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission for creating a new role
  const handleCreateRole = async (values) => {
    try {
      await createRole({ name: values.roleName }).unwrap();
      form.resetFields(); // Reset form
      setIsModalOpen(false); // Close modal
    } catch (err) {
      console.error("Failed to create role:", err);
    }
  };

  // Table columns configuration for AntD Table
  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      render: () => <input type="checkbox" className="custom-checkbox" />,
      width: 50,
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space>
          <Button type="primary" size="small">
            Edit
          </Button>
          <Button type="primary" danger size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="content pb-0">
      <PageHeader />

      <div className="card border-0 rounded-0">
        <div className="card-header d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            icon={<i className="ti ti-square-rounded-plus-filled me-1"></i>}
            onClick={() => setIsModalOpen(true)}
          >
            Add New Role
          </Button>
        </div>
        <div className="card-body">
          <div className="table-responsive custom-table">
            <Table
              columns={columns}
              dataSource={filteredRoles}
              loading={isLoading}
              rowKey="id"
              locale={{
                emptyText: error ? "Error loading roles" : "No roles found",
              }}
              pagination={false}
              className="roles-table"
            />
          </div>
        </div>
      </div>

      {/* Modal for Adding a New Role */}
      <Modal
        title="Add New Role"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateRole} layout="vertical">
          <Form.Item
            name="roleName"
            label="Role Name"
            rules={[{ required: true, message: "Please enter role name" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>
          <div className="d-flex justify-content-end gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            <Button type="primary" htmlType="submit">
              Save Role
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Roles;
