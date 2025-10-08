import React, { useEffect, useState } from "react";
import {
  useCreateCatalogueMutation,
  useUpdateCatalogueMutation,
} from "../../api/catalogueApi";
import { Modal, Form, Input, Button, Upload, message, Image } from "antd";
import { UploadOutlined, FilePdfOutlined } from "@ant-design/icons";

const AddNewCatalogue = ({ visible, catalogue, onClose }) => {
  const [form] = Form.useForm();
  const [createCatalogue, { isLoading: isCreating }] =
    useCreateCatalogueMutation();
  const [updateCatalogue, { isLoading: isUpdating }] =
    useUpdateCatalogueMutation();
  const [pdfFileList, setPdfFileList] = useState([]);
  const [imageFileList, setImageFileList] = useState([]);

  // Mock upload function (replace with actual RTK Query mutation)
  const uploadFile = async (file) => {
    // Simulate API call to upload file and return URL
    // Replace with actual API call, e.g., using RTK Query mutation
    const formData = new FormData();
    formData.append("file", file);
    try {
      // Example: const response = await fetch("/api/upload", { method: "POST", body: formData });
      // return response.json().url;
      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(`https://media.virgolam.com/assets/uploaded/${file.name}`),
          1000
        );
      });
    } catch (error) {
      throw new Error("File upload failed");
    }
  };

  // Populate form with catalogue data if editing
  useEffect(() => {
    if (catalogue) {
      form.setFieldsValue({
        name: catalogue.name || "",
        pdf_url: catalogue.pdf_url || "",
        banner_image_url: catalogue.banner_image_url || "",
      });
      // Set file lists for edit mode
      setPdfFileList(
        catalogue.pdf_url
          ? [
              {
                uid: "-1",
                name: "PDF File",
                status: "done",
                url: catalogue.pdf_url,
              },
            ]
          : []
      );
      setImageFileList(
        catalogue.banner_image_url
          ? [
              {
                uid: "-2",
                name: "Banner Image",
                status: "done",
                url: catalogue.banner_image_url,
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setPdfFileList([]);
      setImageFileList([]);
    }
  }, [catalogue, form]);

  // Handle file upload for PDF
  const handlePdfUpload = async ({ file, onSuccess, onError }) => {
    try {
      const url = await uploadFile(file);
      setPdfFileList([{ uid: file.uid, name: file.name, status: "done", url }]);
      form.setFieldsValue({ pdf_url: url });
      onSuccess();
    } catch (error) {
      setPdfFileList([{ uid: file.uid, name: file.name, status: "error" }]);
      onError(error);
      message.error("Failed to upload PDF");
    }
  };

  // Handle file upload for banner image
  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    try {
      const url = await uploadFile(file);
      setImageFileList([
        { uid: file.uid, name: file.name, status: "done", url },
      ]);
      form.setFieldsValue({ banner_image_url: url });
      onSuccess();
    } catch (error) {
      setImageFileList([{ uid: file.uid, name: file.name, status: "error" }]);
      onError(error);
      message.error("Failed to upload banner image");
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      if (catalogue) {
        await updateCatalogue({ id: catalogue.id, ...values }).unwrap();
        message.success("Catalogue updated successfully!");
      } else {
        await createCatalogue(values).unwrap();
        message.success("Catalogue created successfully!");
      }
      form.resetFields();
      setPdfFileList([]);
      setImageFileList([]);
      onClose();
    } catch (error) {
      console.error("Error saving catalogue:", error);
      message.error(`Failed to ${catalogue ? "update" : "create"} catalogue`);
    }
  };

  return (
    <Modal
      title={catalogue ? "Edit Catalogue" : "Add New Catalogue"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      aria-label={
        catalogue ? "Edit catalogue modal" : "Add new catalogue modal"
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: "",
          pdf_url: "",
          banner_image_url: "",
        }}
      >
        <Form.Item
          label="Catalogue Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter catalogue name" />
        </Form.Item>
        <Form.Item
          label="PDF File"
          name="pdf_url"
          rules={[{ required: true, message: "PDF file is required" }]}
        >
          <Upload
            fileList={pdfFileList}
            customRequest={handlePdfUpload}
            accept=".pdf"
            onChange={({ fileList }) => setPdfFileList(fileList)}
            showUploadList={{
              showPreviewIcon: true,
              previewIcon: <FilePdfOutlined style={{ color: "#ff4d4f" }} />,
            }}
          >
            <Button icon={<UploadOutlined />}>Upload PDF</Button>
          </Upload>
        </Form.Item>
        {pdfFileList.length > 0 && pdfFileList[0].status === "done" && (
          <Form.Item label="PDF Preview">
            <a
              href={pdfFileList[0].url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <FilePdfOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
              <span>{pdfFileList[0].name}</span>
            </a>
          </Form.Item>
        )}
        <Form.Item
          label="Banner Image"
          name="banner_image_url"
          rules={[{ required: true, message: "Banner image is required" }]}
        >
          <Upload
            fileList={imageFileList}
            customRequest={handleImageUpload}
            accept="image/*"
            onChange={({ fileList }) => setImageFileList(fileList)}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
        {imageFileList.length > 0 && imageFileList[0].status === "done" && (
          <Form.Item label="Image Preview">
            <Image
              src={imageFileList[0].url}
              alt="Banner Image Preview"
              style={{ maxWidth: 200, maxHeight: 100, objectFit: "contain" }}
              fallback="https://via.placeholder.com/200x100"
            />
          </Form.Item>
        )}
        <Form.Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <Button onClick={onClose} disabled={isCreating || isUpdating}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating || isUpdating}
            >
              {catalogue ? "Update" : "Create"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewCatalogue;
