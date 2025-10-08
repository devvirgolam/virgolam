import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useGetBlogByIdQuery,
  useFetchAllBlogCategoriesQuery,
} from "../../api/blogApi"; // Adjust path to your blogApi
import slugify from "slugify"; // For generating slugs from titles
import { toast } from "react-toastify"; // For notifications
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Radio,
  Card,
  Spin,
  Typography,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AddBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // API Hooks
  const { data: categories, isLoading: categoriesLoading } =
    useFetchAllBlogCategoriesQuery();
  const { data: blog, isLoading: blogLoading } = useGetBlogByIdQuery(id, {
    skip: !isEditMode,
  });
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  // Form state managed by AntD Form
  const [form] = Form.useForm();
  const [bannerImage, setBannerImage] = useState(null);

  // Initialize form for editing
  useEffect(() => {
    if (isEditMode && blog) {
      form.setFieldsValue({
        title: blog.title || "",
        slug: blog.slug || "",
        category: blog.category?._id || "",
        tags: blog.seo?.keywords?.join(", ") || "",
        content: blog.content || "",
        bannerImage: blog.bannerImage
          ? [{ url: blog.bannerImage, status: "done" }]
          : [],
        status: blog.status || "draft",
        seo: {
          title: blog.seo?.title || "",
          description: blog.seo?.description || "",
          keywords: blog.seo?.keywords?.join(", ") || "",
        },
      });
      if (blog.bannerImage) {
        setBannerImage({ url: blog.bannerImage });
      }
    }
  }, [isEditMode, blog, form]);

  // Handle title change to auto-generate slug and SEO title
  const handleTitleChange = (e) => {
    if (!isEditMode) {
      const title = e.target.value;
      const slug = slugify(title, { lower: true, strict: true });
      form.setFieldsValue({
        slug,
        seo: { ...form.getFieldValue("seo"), title },
      });
    }
  };

  // Handle file upload
  const handleFileChange = ({ file }) => {
    if (file && file.size <= 50 * 1024 * 1024) {
      // 50MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage({ url: reader.result });
        form.setFieldsValue({
          bannerImage: [{ url: reader.result, status: "done" }],
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("File size exceeds 50MB limit");
    }
    return false; // Prevent default upload behavior
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const payload = {
      title: values.title,
      slug: values.slug,
      category: values.category,
      content: values.content,
      excerpt: values.content.slice(0, 160), // Auto-generate excerpt
      bannerImage: bannerImage?.url || "",
      seo: {
        title: values.seo.title,
        description: values.seo.description,
        keywords: values.tags.split(",").map((tag) => tag.trim()),
      },
      status: values.status,
    };

    try {
      if (isEditMode) {
        await updateBlog({ id, ...payload }).unwrap();
        toast.success("Blog updated successfully");
      } else {
        await createBlog(payload).unwrap();
        toast.success("Blog created successfully");
      }
      navigate("/blogs");
    } catch (error) {
      toast.error(error?.data?.error || "Failed to save blog");
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate("/blogs");
  };

  // Rich text editor (assuming a library like Quill or TinyMCE is used)
  useEffect(() => {
    // Initialize your rich text editor here (e.g., Quill, TinyMCE)
    // Example with Quill (commented out as you may use a different editor):
    /*
    const quill = new Quill(".editor.pages-editor", {
      theme: "snow",
      modules: { toolbar: true },
    });
    quill.on("text-change", () => {
      form.setFieldsValue({ content: quill.root.innerHTML });
    });
    if (isEditMode && blog) {
      quill.root.innerHTML = blog.content;
    }
    */
  }, [isEditMode, blog, form]);

  if (categoriesLoading || (isEditMode && blogLoading)) {
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={4} style={{ marginBottom: "24px" }}>
        {isEditMode ? "Edit Blog" : "Add Blog"}
      </Title>

      <Space style={{ marginBottom: "16px" }}>
        <Button
          type="link"
          onClick={() => navigate("/blogs")}
          icon={<UploadOutlined />}
        >
          All Blogs
        </Button>
      </Space>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: "draft",
            seo: { title: "", description: "", keywords: "" },
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input onChange={handleTitleChange} />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Please enter the slug" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              {categories?.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tags"
            rules={[{ required: true, message: "Please enter tags" }]}
            help="Enter tags separated by commas"
          >
            <Input placeholder="Enter tags separated by commas" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            {/* Replace with your rich text editor component */}
            <div
              className="editor pages-editor"
              style={{ minHeight: "200px", border: "1px solid #d9d9d9" }}
            />
          </Form.Item>

          <Form.Item label="Featured Image" name="bannerImage">
            <Upload
              accept="image/*"
              beforeUpload={() => false} // Prevent auto-upload
              onChange={handleFileChange}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>
                Upload Image (Max: 50MB)
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="SEO Title" name={["seo", "title"]}>
            <Input />
          </Form.Item>

          <Form.Item label="SEO Description" name={["seo", "description"]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="SEO Keywords" name={["seo", "keywords"]}>
            <Input placeholder="Enter keywords separated by commas" />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value="published">Active</Radio>
              <Radio value="draft">Inactive</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreating || isUpdating}
              >
                {isEditMode ? "Update Blog" : "Create New"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddBlog;
