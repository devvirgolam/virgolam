import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useListContactsQuery,
  useSubmitContactMutation,
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
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PageHeader from "../components/Common/PageHeader";

const { Title } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // RTK Query hooks
  const { data: contacts, isLoading, isError, error } = useListContactsQuery();
  const [submitContact, { isLoading: isSubmitting }] =
    useSubmitContactMutation();

  // Handle modal open/close
  const toggleModal = (contact = null) => {
    if (contact) {
      // Edit mode
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
      // Add mode
      setEditContactId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        notified: values.notified === "true",
      };

      await submitContact(payload).unwrap();
      toast.success("Contact submitted successfully");

      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      toast.error(err?.data?.error || "Failed to submit contact");
    }
  };

  // Handle delete

  // Handle search
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Filter contacts based on search
  const filteredContacts = contacts?.filter(
    (contact) =>
      contact.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Table columns
  const columns = [
    {
      title: "",
      dataIndex: "_id",
      width: 50,
      render: () => <input type="checkbox" className="form-check-input" />,
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
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (text) => <span>{text.slice(0, 50)}...</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Notified",
      dataIndex: "notified",
      render: (notified) => (notified ? "Yes" : "No"),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <PageHeader />

      <Card>
        <Space
          style={{
            marginBottom: 16,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Input
            placeholder="Search by name or email"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            style={{ width: 200 }}
          />
        </Space>

        {isLoading && (
          <Spin
            size="large"
            style={{ display: "block", margin: "50px auto" }}
          />
        )}
        {isError && (
          <Typography.Text type="danger">
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
          />
        )}
      </Card>
    </div>
  );
};

export default Contact;
