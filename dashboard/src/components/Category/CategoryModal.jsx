// src/components/Category/CategoryModal.jsx
import React from "react";
import { Modal, Form, Input, Select, Button, Alert } from "antd";
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
      className="category-modal"
      aria-label={
        initialValues.id ? "Edit category modal" : "Add new category modal"
      }
    >
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          className="category-modal-error"
        />
      )}
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        initialValues={initialValues}
        className="category-modal-form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the category name" },
          ]}
        >
          <Input
            placeholder="Enter category name"
            className="category-modal-input"
          />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Please enter the slug" }]}
        >
          <Input
            placeholder="Enter category slug"
            className="category-modal-input"
          />
        </Form.Item>
        <Form.Item label="Parent Category" name="parent_id">
          <Select
            placeholder="Select parent category (optional)"
            allowClear
            className="category-modal-input"
          >
            <Select.Option value="">None</Select.Option>
            {parentCategories.map((parent) => (
              <Select.Option key={parent.id} value={parent.id}>
                {parent.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="category-modal-button category-modal-button-primary"
          >
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
