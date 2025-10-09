// src/components/Roles/Roles.jsx
import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Space, Popconfirm } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PageHeader from "../components/Common/PageHeader";
import {
  useListRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
} from "../api/rolesApi";

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data: roles, isLoading, error, refetch } = useListRolesQuery();
  const [createRole] = useCreateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoles = roles?.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRole = async (values) => {
    try {
      await createRole({ name: values.roleName }).unwrap();
      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create role:", err);
      Modal.error({
        title: "Error",
        content: "Failed to create role",
      });
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete role:", err);
      Modal.error({
        title: "Error",
        content: "Failed to delete role",
      });
    }
  };

  const columns = [
    {
      title: <input type="checkbox" className="roles-table-checkbox" />,
      dataIndex: "checkbox",
      render: () => <input type="checkbox" className="roles-table-checkbox" />,
      width: 50,
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        new Date(createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            className="roles-table-action-button roles-table-action-button-edit"
            icon={<EditOutlined />}
            onClick={() => {
              console.log("Edit role:", record.id);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this role?"
            onConfirm={() => handleDeleteRole(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              size="small"
              className="roles-table-action-button roles-table-action-button-delete"
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="roles-container">
      <PageHeader />
      <div className="roles-card">
        <div className="roles-card-header">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search roles"
            value={searchTerm}
            onChange={handleSearch}
            className="roles-search-input"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="roles-button-primary"
          >
            Add New Role
          </Button>
        </div>
        <div className="roles-card-content">
          {error ? (
            <div className="roles-table-error">
              Error: {error?.data?.message || "Failed to load roles"}
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredRoles}
              loading={isLoading}
              rowKey="id"
              pagination={false}
              className="roles-table"
              aria-label="Roles table"
            />
          )}
        </div>
      </div>

      <Modal
        title="Add New Role"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="roles-modal"
        aria-label="Add new role modal"
      >
        <Form
          form={form}
          onFinish={handleCreateRole}
          layout="vertical"
          className="roles-modal-form"
        >
          <Form.Item
            name="roleName"
            label="Role Name"
            rules={[{ required: true, message: "Please enter role name" }]}
          >
            <Input
              placeholder="Enter role name"
              className="roles-modal-input"
            />
          </Form.Item>
          <div className="d-flex justify-content-end gap-2">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="roles-modal-button roles-modal-button-cancel"
            >
              Close
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="roles-modal-button roles-modal-button-primary"
            >
              Save Role
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Roles;
