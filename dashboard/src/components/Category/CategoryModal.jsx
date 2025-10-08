import React from "react";
import { Modal, Form, Input, Select, Button, Alert } from "antd";
import { Option } from "antd/es/mentions";

const CategoryModal = ({
  open,
  onCancel,
  onSubmit,
  initialValues = { name: "", slug: "", parent_id: "" },
  parentCategories = [],
  isSubmitting,
  error,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={initialValues.id ? "Edit Category" : "Add New Category"}
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={null}
    >
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the category name" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Please enter the slug" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Parent Category" name="parent_id">
          <Select allowClear>
            <Option value="">None</Option>
            {parentCategories.map((parent) => (
              <Option key={parent.id} value={parent.id}>
                {parent.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {isSubmitting
              ? initialValues.id
                ? "Updating..."
                : "Creating..."
              : initialValues.id
              ? "Update Category"
              : "Create Category"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
