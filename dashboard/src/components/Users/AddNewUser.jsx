import React, { useState, useEffect } from "react";
import { Form, Input, Select, Upload, Button, Switch, message } from "antd";
import {
  UploadOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useCreateUserMutation } from "../../api/userApi";
import { useListRolesQuery } from "../../api/rolesApi";

const { Option } = Select;

const AddNewUser = ({ onUserCreated, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const {
    data: roles = [],
    isLoading: isRolesLoading,
    error: rolesError,
  } = useListRolesQuery();

  // Handle roles fetch error
  useEffect(() => {
    if (rolesError) {
      message.error(rolesError?.data?.error || "Failed to fetch roles");
    }
  }, [rolesError]);

  // Handle file upload
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Limit to one file
  };

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("name", values.firstName);
      formData.append("phone", values.phone1);
      if (values.phone2) formData.append("phone2", values.phone2);
      formData.append("role_id", values.role);
      if (fileList.length > 0) {
        formData.append("avatar", fileList[0].originFileObj);
      }
      formData.append("emailOptOut", values.emailOptOut ? "true" : "false");
      formData.append("location", values.location);

      await createUser(formData).unwrap();
      message.success("User created successfully");
      form.resetFields();
      setFileList([]);
      if (onUserCreated) {
        onUserCreated(); // Trigger refetch and close modal
      }
    } catch (error) {
      message.error(error?.data?.error || "Failed to create user");
    }
  };

  // Handle cancel
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    if (onCancel) {
      onCancel(); // Close the modal
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div className="row">
          <div className="col-md-6">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label={
                <div className="d-flex justify-content-between w-100">
                  <span>Email</span>
                </div>
              }
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select
                loading={isRolesLoading}
                disabled={isRolesLoading || rolesError}
              >
                <Option value="">Choose</Option>
                {roles.map((role) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Phone 1"
              name="phone1"
              rules={[
                { required: true, message: "Please enter phone number" },
                {
                  pattern: /^\+?[\d\s-]{8,15}$/,
                  message: "Invalid phone number format",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Repeat Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>
          <div className="col-md-12">
            <Form.Item name="isActive" valuePropName="checked" noStyle>
              <Switch /> Active
            </Form.Item>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isCreating}>
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNewUser;
