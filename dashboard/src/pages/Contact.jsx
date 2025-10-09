// src/components/Contact/Contact.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useListContactsQuery,
  useSubmitContactMutation,
  useDeleteContactMutation,
} from "../api/contactApi";
import { toast } from "react-toastify";
import {
  Table,
  Form,
  Input,
  Button,
  Modal,
  Spin,
  Space,
  Typography,
  Popconfirm,
  Card,
  Row,
  Col,
  Select,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PageHeader from "../components/Common/PageHeader";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Contact = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const {
    data: contacts,
    isLoading,
    isError,
    error,
    refetch,
  } = useListContactsQuery();
  const [submitContact, { isLoading: isSubmitting }] =
    useSubmitContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const toggleModal = (contact = null) => {
    if (contact) {
      setEditContactId(contact._id);
      form.setFieldsValue({
        name: contact.name,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        message: contact.message,
        city: contact.city,
        state: contact.state,
        country: contact.country,
        pincode: contact.pincode,
        notified: contact.notified ? "true" : "false",
      });
    } else {
      setEditContactId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id).unwrap();
      toast.success("Contact deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.error || "Failed to delete contact");
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredContacts = contacts?.filter(
    (contact) =>
      contact.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: <input type="checkbox" className="contact-table-checkbox" />,
      dataIndex: "_id",
      width: 50,
      render: () => (
        <input type="checkbox" className="contact-table-checkbox" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (phoneNumber) => phoneNumber || "N/A",
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (text) => <span>{text?.slice(0, 50) || "N/A"}...</span>,
    },
    {
      title: "City",
      dataIndex: "city",
      render: (city) => city || "N/A",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) =>
        new Date(date).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Notified",
      dataIndex: "notified",
      render: (notified) => (notified ? "Yes" : "No"),
      sorter: (a, b) => Number(a.notified) - Number(b.notified),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => toggleModal(record)}
            className="contact-table-action-button contact-table-action-button-edit"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              className="contact-table-action-button contact-table-action-button-delete"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="contact-container">
      <PageHeader />
      <Card className="contact-card">
        <div className="contact-card-header">
          <Input
            placeholder="Search by name or email"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            className="contact-search-input"
          />
        </div>
        <div className="contact-card-content">
          {isLoading && <Spin size="large" className="contact-table-loading" />}
          {isError && (
            <Typography.Text type="danger" className="contact-table-error">
              Error: {error?.data?.message || "Failed to load contacts"}
            </Typography.Text>
          )}
          {!isLoading && !isError && (
            <Table
              columns={columns}
              dataSource={filteredContacts}
              rowKey="_id"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: filteredContacts?.length,
                onChange: (page, pageSize) =>
                  setPagination({ current: page, pageSize }),
              }}
              className="contact-table"
              aria-label="Contacts table"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Contact;
