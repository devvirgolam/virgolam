// src/components/Content.jsx
import React, { useState } from "react";
import {
  useListContentQuery,
  useCreateContentMutation,
  useUploadFileMutation,
  useDeleteContentMutation,
  useUpdateContentMutation,
} from "../api/contentApi";
import {
  Dropdown,
  Menu,
  Button,
  Modal,
  Form,
  Input,
  Table,
  Upload,
  Avatar,
  Switch,
  Row,
  Col,
  Card,
  Spin,
  message,
  Select,
} from "antd";
import {
  DownOutlined,
  PlusCircleOutlined,
  MoreOutlined,
  UploadOutlined,
  FileTextOutlined,
  PictureOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const Content = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [search, setSearch] = useState("");
  const [contentType, setContentType] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [formData, setFormData] = useState({
    type: "certification",
    title: "",
    description: "",
    image_url: "",
    date: "",
    location: "",
  });

  const { data, isLoading, isError, error } = useListContentQuery({
    type: contentType,
    search,
  });
  const [createContent, { isLoading: isCreating }] = useCreateContentMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [deleteContent] = useDeleteContentMutation();
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentMutation();

  const contents = data || [];

  const handleCreateContent = async () => {
    if (!formData.title || !formData.description || !formData.image_url) {
      message.error("Title, description, and image URL are required");
      return;
    }
    if (formData.type === "event" && (!formData.date || !formData.location)) {
      message.error("Date and location are required for events");
      return;
    }
    try {
      await createContent({
        type: formData.type,
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        date: formData.type === "event" ? formData.date : null,
        location: formData.type === "event" ? formData.location : null,
      }).unwrap();
      setFormData({
        type: "certification",
        title: "",
        description: "",
        image_url: "",
        date: "",
        location: "",
      });
      setIsCreateModalVisible(false);
      message.success("Content created successfully");
    } catch (err) {
      message.error(
        `Failed to create content: ${err.data?.error || "Something went wrong"}`
      );
    }
  };

  const handleUpdateContent = async () => {
    if (
      !selectedContent.title ||
      !selectedContent.description ||
      !selectedContent.featured_image
    ) {
      message.error("Title, description, and image URL are required");
      return;
    }
    if (
      selectedContent.type === "event" &&
      (!selectedContent.date || !selectedContent.location)
    ) {
      message.error("Date and location are required for events");
      return;
    }
    try {
      await updateContent({
        id: selectedContent.id,
        type: selectedContent.type,
        title: selectedContent.title,
        description: selectedContent.description,
        image_url: selectedContent.featured_image,
        date: selectedContent.type === "event" ? selectedContent.date : null,
        location:
          selectedContent.type === "event" ? selectedContent.location : null,
      }).unwrap();
      setIsDetailsModalVisible(false);
      setSelectedContent(null);
      message.success("Content updated successfully");
    } catch (err) {
      message.error(
        `Failed to update content: ${err.data?.error || "Something went wrong"}`
      );
    }
  };

  const handleUpload = async ({ file }) => {
    try {
      const response = await uploadFile({ file }).unwrap();
      if (isDetailsModalVisible && selectedContent) {
        setSelectedContent({
          ...selectedContent,
          featured_image: response.fileUrl,
        });
      } else {
        setFormData({ ...formData, image_url: response.fileUrl });
      }
      message.success("File uploaded successfully");
    } catch (err) {
      message.error(
        `Failed to upload file: ${err.data?.error || "Something went wrong"}`
      );
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this content?",
      onOk: async () => {
        try {
          await deleteContent(id).unwrap();
          message.success("Content deleted successfully");
        } catch (err) {
          message.error(
            `Failed to delete content: ${
              err.data?.error || "Something went wrong"
            }`
          );
        }
      },
    });
  };

  const handleBulkDelete = () => {
    Modal.confirm({
      title: `Are you sure you want to delete ${selectedRowKeys.length} items?`,
      onOk: async () => {
        try {
          await Promise.all(
            selectedRowKeys.map((id) => deleteContent(id).unwrap())
          );
          setSelectedRowKeys([]);
          message.success("Selected items deleted successfully");
        } catch (err) {
          message.error(
            `Failed to delete items: ${
              err.data?.error || "Something went wrong"
            }`
          );
        }
      },
    });
  };

  const handleContentClick = (record) => {
    setSelectedContent(record);
    setIsDetailsModalVisible(true);
  };

  const typeFilterMenu = (
    <Menu onClick={({ key }) => setContentType(key === "all" ? "" : key)}>
      <Menu.Item key="all">All Types</Menu.Item>
      <Menu.Item key="csr">CSR</Menu.Item>
      <Menu.Item key="event">Events</Menu.Item>
      <Menu.Item key="certification">Certifications</Menu.Item>
      <Menu.Item key="coverage">Coverage</Menu.Item>
    </Menu>
  );

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item
        key="preview"
        onClick={() => window.open(record.featured_image, "_blank")}
      >
        <FileTextOutlined className="me-2" />
        Preview
      </Menu.Item>
      <Menu.Item key="details" onClick={() => handleContentClick(record)}>
        <FileTextOutlined className="me-2" />
        View Details
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(record.id)}>
        <DeleteOutlined className="me-2" />
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <Avatar
            src={record.featured_image}
            shape="square"
            size={40}
            icon={<PictureOutlined />}
            className="me-2 wp-media-avatar"
            onError={() => true}
          />
          <a href="#" onClick={() => handleContentClick(record)}>
            {text}
          </a>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => type.charAt(0).toUpperCase() + type.slice(1),
    },
    {
      title: "Modified",
      dataIndex: "updated_at",
      render: (date) => (date ? new Date(date).toLocaleString() : "-"),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Dropdown overlay={actionMenu(record)}>
          <a
            href="#"
            className="d-flex align-items-center justify-content-center wp-action-link"
          >
            <MoreOutlined className="fs-14" />
          </a>
        </Dropdown>
      ),
    },
  ];

  const renderGridItem = (record) => (
    <Col key={record.id} xs={12} sm={6} md={4} lg={3}>
      <Card
        hoverable
        className="wp-media-card"
        cover={
          <Avatar
            src={record.featured_image}
            shape="square"
            size={100}
            icon={<PictureOutlined />}
            style={{ objectFit: "cover" }}
            className="wp-media-avatar"
            onError={() => true}
          />
        }
        onClick={() => handleContentClick(record)}
      >
        <Card.Meta
          title={record.title}
          description={
            <div>
              <p>
                {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
              </p>
              <p>
                {record.updated_at
                  ? new Date(record.updated_at).toLocaleString()
                  : "-"}
              </p>
              <Dropdown overlay={actionMenu(record)}>
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-center wp-action-link"
                >
                  <MoreOutlined className="fs-14" />
                </a>
              </Dropdown>
            </div>
          }
        />
      </Card>
    </Col>
  );

  if (isLoading) {
    return (
      <div className="wp-content">
        <h1 className="wp-page-title">Media Library</h1>
        <Spin tip="Loading content..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wp-content">
        <h1 className="wp-page-title">Media Library</h1>
        <div className="wp-card">
          <div className="wp-card-body">
            Error fetching content:{" "}
            {error?.data?.error || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wp-content">
      <h1 className="wp-page-title">Media Library</h1>

      <div className="wp-toolbar">
        <div className="wp-toolbar-left">
          <Input
            placeholder="Search media items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="wp-search-input"
          />
          <Dropdown overlay={typeFilterMenu}>
            <Button className="wp-filter-button">
              {contentType || "All Types"} <DownOutlined />
            </Button>
          </Dropdown>
          <Switch
            checkedChildren="Grid"
            unCheckedChildren="List"
            checked={viewMode === "grid"}
            onChange={(checked) => setViewMode(checked ? "grid" : "list")}
            className="wp-switch"
          />
        </div>
        <div className="wp-toolbar-right">
          {selectedRowKeys.length > 0 && (
            <Button
              danger
              onClick={handleBulkDelete}
              className="wp-button-danger"
            >
              Delete Selected ({selectedRowKeys.length})
            </Button>
          )}
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
            className="wp-button-primary"
          >
            Add New
          </Button>
          <Upload
            customRequest={handleUpload}
            showUploadList={false}
            accept="image/*,video/*,audio/*,application/pdf"
          >
            <Button
              type="primary"
              icon={<UploadOutlined />}
              className="wp-button-primary"
            >
              Upload
            </Button>
          </Upload>
        </div>
      </div>

      {viewMode === "grid" ? (
        <Row gutter={[16, 16]} className="wp-grid">
          {contents.map(renderGridItem)}
        </Row>
      ) : (
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          columns={columns}
          dataSource={contents.map((item) => ({ ...item, key: item.id }))}
          pagination={{ pageSize: 10 }}
          className="wp-table"
        />
      )}

      {/* Create Content Modal */}
      <Modal
        title="Add New Media Item"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        width={600}
        className="wp-modal"
      >
        <Form
          onFinish={handleCreateContent}
          layout="vertical"
          className="wp-form"
        >
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Content type is required" }]}
          >
            <Select
              value={formData.type}
              onChange={(value) => setFormData({ ...formData, type: value })}
              className="wp-select"
            >
              <Select.Option value="csr">CSR</Select.Option>
              <Select.Option value="event">Event</Select.Option>
              <Select.Option value="certification">Certification</Select.Option>
              <Select.Option value="coverage">Coverage</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter title"
              className="wp-input"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter description"
              rows={4}
              className="wp-textarea"
            />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="image_url"
            rules={[{ required: true, message: "Image URL is required" }]}
          >
            <Input
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              placeholder="Enter or upload image URL"
              className="wp-input"
            />
          </Form.Item>
          {formData.type === "event" && (
            <>
              <Form.Item
                label="Date"
                name="date"
                rules={[
                  { required: true, message: "Date is required for events" },
                ]}
              >
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="wp-input"
                />
              </Form.Item>
              <Form.Item
                label="Location"
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Location is required for events",
                  },
                ]}
              >
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter location"
                  className="wp-input"
                />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating}
              className="wp-button-primary"
            >
              {isCreating ? "Creating..." : "Add Media Item"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Details/Edit Modal */}
      {selectedContent && (
        <Modal
          title="Media Item Details"
          open={isDetailsModalVisible}
          onCancel={() => {
            setIsDetailsModalVisible(false);
            setSelectedContent(null);
          }}
          footer={null}
          width={800}
          className="wp-modal"
        >
          <Row gutter={16}>
            <Col span={12}>
              <img
                src={selectedContent.featured_image}
                alt={selectedContent.title}
                className="wp-media-image"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300")
                }
              />
            </Col>
            <Col span={12}>
              <Form
                layout="vertical"
                onFinish={handleUpdateContent}
                className="wp-form"
              >
                <Form.Item label="Type" name="type">
                  <Select
                    value={selectedContent.type}
                    onChange={(value) =>
                      setSelectedContent({ ...selectedContent, type: value })
                    }
                    className="wp-select"
                  >
                    <Select.Option value="csr">CSR</Select.Option>
                    <Select.Option value="event">Event</Select.Option>
                    <Select.Option value="certification">
                      Certification
                    </Select.Option>
                    <Select.Option value="coverage">Coverage</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Title" name="title">
                  <Input
                    value={selectedContent.title}
                    onChange={(e) =>
                      setSelectedContent({
                        ...selectedContent,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter title"
                    className="wp-input"
                  />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <Input.TextArea
                    value={selectedContent.description}
                    onChange={(e) =>
                      setSelectedContent({
                        ...selectedContent,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter description"
                    rows={4}
                    className="wp-textarea"
                  />
                </Form.Item>
                <Form.Item label="Image URL" name="image_url">
                  <Input
                    value={selectedContent.featured_image}
                    onChange={(e) =>
                      setSelectedContent({
                        ...selectedContent,
                        featured_image: e.target.value,
                      })
                    }
                    placeholder="Enter or upload image URL"
                    className="wp-input"
                  />
                </Form.Item>
                {selectedContent.type === "event" && (
                  <>
                    <Form.Item label="Date" name="date">
                      <Input
                        type="date"
                        value={
                          selectedContent.date
                            ? selectedContent.date.split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setSelectedContent({
                            ...selectedContent,
                            date: e.target.value,
                          })
                        }
                        className="wp-input"
                      />
                    </Form.Item>
                    <Form.Item label="Location" name="location">
                      <Input
                        value={selectedContent.location}
                        onChange={(e) =>
                          setSelectedContent({
                            ...selectedContent,
                            location: e.target.value,
                          })
                        }
                        placeholder="Enter location"
                        className="wp-input"
                      />
                    </Form.Item>
                  </>
                )}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isUpdating}
                    className="wp-button-primary"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    danger
                    style={{ marginLeft: 8 }}
                    onClick={() => handleDelete(selectedContent.id)}
                    className="wp-button-danger"
                  >
                    Delete
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default Content;
