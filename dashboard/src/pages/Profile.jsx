// src/components/Profile/Profile.jsx
import React, { useState, useEffect, useMemo } from "react";
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
  Upload,
  Modal,
} from "antd";
import {
  ReloadOutlined,
  UpOutlined,
  EditOutlined,
  UserOutlined,
  UploadOutlined,
  LockOutlined,
} from "@ant-design/icons";
import PageHeader from "../components/Common/PageHeader";
const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const { authState, logout, refreshToken } = useAuth();
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
  const [profilePic, setProfilePic] = useState(null);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();

  const userData = useMemo(
    () => user || authState.user,
    [user, authState.user]
  );

  useEffect(() => {
    if (userData) {
      const currentFormValues = form.getFieldsValue();
      const newFormValues = {
        name: userData.name || "",
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
      };
      if (
        currentFormValues.name !== newFormValues.name ||
        currentFormValues.username !== newFormValues.username ||
        currentFormValues.email !== newFormValues.email ||
        currentFormValues.phone !== newFormValues.phone
      ) {
        form.setFieldsValue(newFormValues);
      }
    }
  }, [userData, form]);

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

  const handlePasswordChange = async (values) => {
    try {
      await updateCurrentUser({
        password: values.newPassword,
      }).unwrap();
      toast.success("Password updated successfully!");
      passwordForm.resetFields();
      setPasswordModalVisible(false);
    } catch (err) {
      toast.error("Failed to update password.");
      console.error("Password update error:", err);
    }
  };

  const handleProfilePicUpload = ({ file }) => {
    setProfilePic(URL.createObjectURL(file));
    // Implement actual upload logic here if needed
    toast.success("Profile picture uploaded!");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
    return <Spin size="large" className="profile-loading" />;
  }
  if (!authState.accessToken) {
    return (
      <Text type="danger" className="profile-error">
        Please log in to view your profile.
      </Text>
    );
  }

  return (
    <div className="profile-container">
      <PageHeader />
      <Row justify="center">
        <Col xl={18} lg={24} xs={24}>
          <Card bordered={false} className="profile-card">
            {!isEditing ? (
              <div>
                <div className="profile-avatar-container">
                  <div className="profile-avatar">
                    <Avatar
                      size={120}
                      icon={<UserOutlined />}
                      src={profilePic}
                      style={{ backgroundColor: "#0055cc" }}
                      aria-label="User profile picture"
                    />
                    <Upload
                      accept="image/*"
                      showUploadList={false}
                      customRequest={handleProfilePicUpload}
                    >
                      <span
                        className="profile-avatar-upload"
                        role="button"
                        aria-label="Upload profile picture"
                      >
                        <UploadOutlined />
                      </span>
                    </Upload>
                  </div>
                </div>
                <Title level={4} className="profile-title">
                  {userData?.name || "User Name"}
                </Title>
                <Text type="secondary" className="profile-username">
                  @{userData?.username || "username"}
                </Text>
                <Divider className="profile-divider" />
                <Descriptions
                  title="User Information"
                  column={1}
                  bordered
                  className="profile-descriptions"
                >
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
                  <Space>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => setIsEditing(true)}
                      className="profile-button profile-button-primary"
                    >
                      Edit Profile
                    </Button>
                    <Button
                      icon={<LockOutlined />}
                      onClick={() => setPasswordModalVisible(true)}
                      className="profile-button profile-button-primary"
                    >
                      Change Password
                    </Button>
                    <Button
                      icon={<ReloadOutlined />}
                      onClick={refetch}
                      className="profile-button profile-button-primary"
                    >
                      Refresh
                    </Button>
                    <Button
                      danger
                      onClick={handleLogout}
                      className="profile-button profile-button-logout"
                    >
                      Logout
                    </Button>
                  </Space>
                </Row>
              </div>
            ) : (
              <div>
                <Title level={5}>Edit Profile</Title>
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
                  className="profile-form"
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
                        label="Full Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your full name!",
                          },
                        ]}
                      >
                        <Input
                          className="profile-form-input"
                          placeholder="Enter full name"
                        />
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
                        <Input
                          className="profile-form-input"
                          placeholder="Enter username"
                        />
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
                        <Input
                          className="profile-form-input"
                          placeholder="Enter phone number"
                        />
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
                        <Input
                          className="profile-form-input"
                          placeholder="Enter email"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Space
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        onClick={() => setIsEditing(false)}
                        className="profile-button"
                        disabled={isUpdating}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isUpdating}
                        className="profile-button profile-button-primary"
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

      <Modal
        title="Change Password"
        open={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={null}
        className="profile-modal"
        aria-label="Change password modal"
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
          className="profile-form"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password
              className="profile-form-input"
              placeholder="Enter current password"
            />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password
              className="profile-form-input"
              placeholder="Enter new password"
            />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              className="profile-form-input"
              placeholder="Confirm new password"
            />
          </Form.Item>
          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => setPasswordModalVisible(false)}
                className="profile-button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isUpdating}
                className="profile-button profile-button-primary"
              >
                {isUpdating ? "Saving..." : "Change Password"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
