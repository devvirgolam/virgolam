import React, { useState, useEffect } from "react";
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} from "../api/userApi";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Spin,
  Typography,
  Row,
  Col,
  Space,
  Avatar,
  Divider,
  Descriptions,
} from "antd";
import {
  ReloadOutlined,
  UpOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const { authState, logout, refreshToken } = useAuth();
  console.log("authState:", authState); // Debug: Log authState
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetCurrentUserQuery(undefined, {
    skip: !authState.accessToken,
  });
  const [updateCurrentUser, { isLoading: isUpdating }] =
    useUpdateCurrentUserMutation();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  // Fallback to authState.user if API data is not available
  const userData = user || authState.user;
  console.log("user from API:", user); // Debug: Log API user data
  console.log("userData (fallback):", userData); // Debug: Log final user data
  console.log("error:", error); // Debug: Log any API errors

  // Populate form with user data
  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData.name || "",
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    const updateData = {
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
    };

    try {
      await updateCurrentUser(updateData).unwrap();
      toast.success("Profile updated successfully!");
      refetch();
      setIsEditing(false);
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        const newToken = await refreshToken();
        if (newToken) {
          try {
            await updateCurrentUser(updateData).unwrap();
            toast.success("Profile updated successfully!");
            refetch();
            setIsEditing(false);
          } catch (retryErr) {
            toast.error("Failed to update profile after token refresh.");
            logout();
          }
        } else {
          toast.error("Session expired. Please log in again.");
          logout();
        }
      } else {
        toast.error("Failed to update profile.");
        console.error("Update error:", err);
      }
    }
  };

  // Handle errors
  useEffect(() => {
    if (error) {
      if (error.status === 401 || error.status === 403) {
        refreshToken().then((newToken) => {
          if (!newToken) {
            toast.error("Session expired. Please log in again.");
            logout();
          }
        });
      } else {
        toast.error(`Error: ${error.message || "Failed to fetch user data"}`);
      }
    }
  }, [error, refreshToken, logout]);

  if (isLoading && !userData) {
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  }
  if (!authState.accessToken) {
    return <Text type="danger">Please log in to view your profile.</Text>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <Row justify="center">
        <Col xl={18} lg={24}>
          <Card bordered={false} style={{ marginBottom: "24px" }}>
            {!isEditing ? (
              // Profile View
              <div>
                <Row justify="center" style={{ marginBottom: "24px" }}>
                  <Col>
                    <Avatar
                      size={120}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: "#1890ff" }}
                    />
                  </Col>
                </Row>
                <Row justify="center">
                  <Col>
                    <Title
                      level={4}
                      style={{ textAlign: "center", marginBottom: "8px" }}
                    >
                      {userData?.name || "User Name"}
                    </Title>
                    <Text
                      type="secondary"
                      style={{ display: "block", textAlign: "center" }}
                    >
                      @{userData?.username || "username"}
                    </Text>
                  </Col>
                </Row>
                <Divider />
                <Descriptions title="User Information" column={1} bordered>
                  <Descriptions.Item label="Full Name">
                    {userData?.name || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Username">
                    {userData?.username || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {userData?.email || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {userData?.phone || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Role">
                    {userData?.role?.name || "N/A"}
                  </Descriptions.Item>
                </Descriptions>
                <Row justify="center" style={{ marginTop: "24px" }}>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </Row>
              </div>
            ) : (
              // Edit Form
              <div>
                <Title level={5} style={{ marginBottom: "16px" }}>
                  Edit Profile
                </Title>
                <Text
                  type="secondary"
                  style={{ marginBottom: "24px", display: "block" }}
                >
                  Update your information below
                </Text>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  initialValues={{
                    name: userData?.name || "",
                    username: userData?.username || "",
                    email: userData?.email || "",
                    phone: userData?.phone || "",
                  }}
                >
                  <Row gutter={16}>
                    <Col md={12} xs={24}>
                      <Form.Item
                        label="First Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your first name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                      <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone number!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Space
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        onClick={() => setIsEditing(false)}
                        style={{ marginRight: "8px" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isUpdating}
                      >
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
