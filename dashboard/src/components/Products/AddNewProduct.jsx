// src/components/AddNewProduct.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useGetAllProductMetaQuery,
  useCreateProductMetaMutation,
} from "../../api/productsApi";
import { useListCategoriesQuery } from "../../api/categoryApi";
import { useGetParentCategoriesQuery } from "../../api/parentCategoryApi";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Space,
  Card,
  Image,
  Typography,
  Row,
  Col,
} from "antd";
import {
  UploadOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { API_URL } from "../../store/config";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AddNewProduct = () => {
  const [form] = Form.useForm();
  const [metaForm] = Form.useForm();
  const navigate = useNavigate();
  const [createProduct, { isLoading: isProductLoading }] =
    useCreateProductMutation();
  const [createProductMeta, { isLoading: isMetaLoading }] =
    useCreateProductMetaMutation();
  const { data: categories, isLoading: isCategoriesLoading } =
    useListCategoriesQuery();
  const { data: parentCategories, isLoading: isParentCategoriesLoading } =
    useGetParentCategoriesQuery();
  const { data: productMeta, isLoading: isProductMetaLoading } =
    useGetAllProductMetaQuery();
  const [fileList, setFileList] = useState([]);
  const [selectedMetaFields, setSelectedMetaFields] = useState([]);

  // Handle file upload
  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      onSuccess(data.url);
      setFileList((prev) => [
        ...prev,
        { uid: file.uid, name: file.name, status: "done", url: data.url },
      ]);
    } catch (error) {
      onError(error);
      message.error("File upload failed");
    }
  };

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const metaValues = {};
      selectedMetaFields.forEach((metaId) => {
        const meta = productMeta.find((m) => m.id === metaId);
        if (meta && values.meta?.[meta.title]) {
          metaValues[meta.title] = values.meta[meta.title];
        }
      });
      const productData = {
        ...values,
        images: fileList.map((file) => file.url),
        meta: metaValues,
        slug: values.name.toLowerCase().replace(/\s+/g, "-"),
      };
      await createProduct(productData).unwrap();
      message.success("Product created successfully!");
      form.resetFields();
      setFileList([]);
      setSelectedMetaFields([]);
      navigate("/products");
    } catch (error) {
      message.error(
        "Failed to create product: " + (error.data?.error || "Unknown error")
      );
    }
  };

  // Handle new meta field creation
  const onMetaFinish = async (values) => {
    try {
      await createProductMeta(values).unwrap();
      message.success("Product meta created successfully!");
      metaForm.resetFields();
    } catch (error) {
      message.error(
        "Failed to create product meta: " +
          (error.data?.error || "Unknown error")
      );
    }
  };

  // Handle meta field selection
  const handleMetaSelect = (metaId) => {
    setSelectedMetaFields((prev) =>
      prev.includes(metaId) ? prev : [...prev, metaId]
    );
  };

  // Remove selected meta field
  const removeMetaField = (metaId) => {
    setSelectedMetaFields((prev) => prev.filter((id) => id !== metaId));
    form.setFieldsValue({
      meta: {
        ...form.getFieldValue("meta"),
        [productMeta.find((m) => m.id === metaId).title]: undefined,
      },
    });
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4}>Add New Product</Title>
          </Col>
          <Col>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/products")}
            >
              Back to Products
            </Button>
          </Col>
        </Row>
      </header>
      <div className="admin-content">
        <div className="admin-main">
          <Card className="admin-card">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ meta: {} }}
            >
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  { required: true, message: "Please enter the product name" },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                name="sku"
                label="SKU"
                rules={[{ required: true, message: "Please enter the SKU" }]}
              >
                <Input placeholder="Enter SKU" />
              </Form.Item>

              <Form.Item
                name="parent_category_id"
                label="Parent Category"
                rules={[
                  {
                    required: true,
                    message: "Please select a parent category",
                  },
                ]}
              >
                <Select
                  placeholder="Select parent category"
                  loading={isParentCategoriesLoading}
                  allowClear
                >
                  {parentCategories?.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="category_id"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select
                  placeholder="Select category"
                  loading={isCategoriesLoading}
                  allowClear
                >
                  {categories?.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: false }]}
              >
                <TextArea rows={4} placeholder="Enter product description" />
              </Form.Item>

              <Form.Item
                name="seo_title"
                label="SEO Title"
                rules={[{ required: false }]}
              >
                <Input placeholder="Enter SEO title" />
              </Form.Item>

              <Form.Item
                name="seo_description"
                label="SEO Description"
                rules={[{ required: false }]}
              >
                <TextArea rows={4} placeholder="Enter SEO description" />
              </Form.Item>

              <Form.Item
                name="seo_keywords"
                label="SEO Keywords"
                rules={[{ required: false }]}
              >
                <Input placeholder="Enter SEO keywords (comma-separated)" />
              </Form.Item>

              <Form.Item
                name="images"
                label="Images (Max 50MB, Image/Video)"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Upload
                  customRequest={handleUpload}
                  listType="picture"
                  accept="image/*,video/*"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={(file) => {
                    const isLt50M = file.size / 1024 / 1024 < 50;
                    if (!isLt50M) {
                      message.error("File must be smaller than 50MB!");
                    }
                    return isLt50M;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload Images</Button>
                </Upload>
              </Form.Item>

              {fileList.length > 0 && (
                <div style={{ marginBottom: "16px" }}>
                  <h4>Uploaded Files</h4>
                  <Space wrap>
                    {fileList.map((file) => (
                      <Card
                        key={file.uid}
                        style={{ width: 200 }}
                        cover={
                          file.url && (
                            <Image
                              src={file.url}
                              alt={file.name}
                              style={{ height: 100, objectFit: "cover" }}
                              preview={false}
                            />
                          )
                        }
                      >
                        <Card.Meta
                          title={file.name}
                          description={`${(file.size / 1024).toFixed(2)} KB`}
                        />
                      </Card>
                    ))}
                  </Space>
                </div>
              )}
            </Form>
          </Card>

          <Card className="admin-card" title="Product Meta">
            <Form.Item label="Select Existing Meta Fields">
              <Select
                mode="multiple"
                placeholder="Select meta fields"
                loading={isProductMetaLoading}
                onChange={handleMetaSelect}
                value={selectedMetaFields}
                allowClear
              >
                {productMeta?.map((meta) => (
                  <Option key={meta.id} value={meta.id}>
                    {meta.title} {meta.unit ? `(${meta.unit})` : ""}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {selectedMetaFields.map((metaId) => {
              const meta = productMeta.find((m) => m.id === metaId);
              return (
                <div key={metaId} className="meta-field-row">
                  <Form.Item
                    name={["meta", meta.title]}
                    label={`${meta.title} ${meta.unit ? `(${meta.unit})` : ""}`}
                    rules={[{ required: false }]}
                  >
                    {meta.fieldType === "number" ? (
                      <Input
                        type="number"
                        placeholder={`Enter ${meta.title}`}
                      />
                    ) : (
                      <Input placeholder={`Enter ${meta.title}`} />
                    )}
                  </Form.Item>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => removeMetaField(metaId)}
                    danger
                  />
                </div>
              );
            })}

            <Card
              className="admin-card"
              title="Add New Meta Field"
              style={{ marginTop: "20px" }}
            >
              <Form form={metaForm} layout="vertical" onFinish={onMetaFinish}>
                <Form.Item
                  name="title"
                  label="Meta Title"
                  rules={[
                    { required: true, message: "Please enter the meta title" },
                  ]}
                >
                  <Input placeholder="Enter meta title (e.g., Design Code)" />
                </Form.Item>

                <Form.Item
                  name="fieldType"
                  label="Field Type"
                  rules={[
                    { required: true, message: "Please select a field type" },
                  ]}
                >
                  <Select placeholder="Select field type">
                    <Option value="string">String</Option>
                    <Option value="number">Number</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="unit"
                  label="Unit (Optional)"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Enter unit (e.g., mm, inch)" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isMetaLoading}
                  >
                    Add Meta Field
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Card>
        </div>

        <div className="admin-sidebar">
          <Card className="admin-card" title="Publish">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                type="primary"
                htmlType="submit"
                form={form}
                loading={isProductLoading}
                block
              >
                Create Product
              </Button>
              <Button onClick={() => navigate("/products")} block>
                Cancel
              </Button>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
