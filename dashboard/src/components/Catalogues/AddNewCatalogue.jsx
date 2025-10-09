// src/components/Catalogues/AddNewCatalogue.jsx
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
    const formData = new FormData();
    formData.append("file", file);
    try {
      // Replace with actual API call
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

  useEffect(() => {
    if (catalogue) {
      form.setFieldsValue({
        name: catalogue.name || "",
        pdf_url: catalogue.pdf_url || "",
        banner_image_url: catalogue.banner_image_url || "",
      });
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

  const handlePdfUpload = async ({ file, onSuccess, onError }) => {
    try {
      const url = await uploadFile(file);
      setPdfFileList([{ uid: file.uid, name: file.name, status: "done", url }]);
      form.setFieldsValue({ pdf_url: url });
      onSuccess();
      message.success("PDF uploaded successfully");
    } catch (error) {
      setPdfFileList([{ uid: file.uid, name: file.name, status: "error" }]);
      onError(error);
      message.error("Failed to upload PDF");
    }
  };

  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    try {
      const url = await uploadFile(file);
      setImageFileList([
        { uid: file.uid, name: file.name, status: "done", url },
      ]);
      form.setFieldsValue({ banner_image_url: url });
      onSuccess();
      message.success("Banner image uploaded successfully");
    } catch (error) {
      setImageFileList([{ uid: file.uid, name: file.name, status: "error" }]);
      onError(error);
      message.error("Failed to upload banner image");
    }
  };

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
      className="wp-modal"
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
        className="wp-form"
      >
        <Form.Item
          label="Catalogue Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter catalogue name" className="wp-input" />
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
            className="wp-upload"
          >
            <Button icon={<UploadOutlined />} className="wp-upload-button">
              Upload PDF
            </Button>
          </Upload>
        </Form.Item>
        {pdfFileList.length > 0 && pdfFileList[0].status === "done" && (
          <Form.Item label="PDF Preview" className="wp-pdf-preview">
            <a
              href={pdfFileList[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="wp-action-link"
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
            className="wp-upload"
          >
            <Button icon={<UploadOutlined />} className="wp-upload-button">
              Upload Image
            </Button>
          </Upload>
        </Form.Item>
        {imageFileList.length > 0 && imageFileList[0].status === "done" && (
          <Form.Item label="Image Preview" className="wp-image-preview">
            <Image
              src={imageFileList[0].url}
              alt="Banner Image Preview"
              className="wp-image-preview"
              fallback="https://via.placeholder.com/200x100"
            />
          </Form.Item>
        )}
        <Form.Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <Button
              onClick={onClose}
              disabled={isCreating || isUpdating}
              className="wp-button"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating || isUpdating}
              className="wp-button-primary"
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
