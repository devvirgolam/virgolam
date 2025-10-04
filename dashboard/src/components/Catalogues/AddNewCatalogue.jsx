import React, { useState, useEffect } from "react";
import {
  useCreateCatalogueMutation,
  useUpdateCatalogueMutation,
} from "../../api/catalogueApi"; // Adjust path to your API slice
import { Modal, Button } from "react-bootstrap"; // For success modal

const AddNewCatalogue = ({ catalogue, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    pdf_url: "",
    banner_image_url: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // RTK Query hooks
  const [createCatalogue, { isLoading: isCreating }] =
    useCreateCatalogueMutation();
  const [updateCatalogue, { isLoading: isUpdating }] =
    useUpdateCatalogueMutation();

  // Populate form with catalogue data if editing
  useEffect(() => {
    if (catalogue) {
      setFormData({
        name: catalogue.name || "",
        pdf_url: catalogue.pdf_url || "",
        banner_image_url: catalogue.banner_image_url || "",
      });
    }
  }, [catalogue]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.pdf_url.trim()) errors.pdf_url = "PDF URL is required";
    if (!formData.banner_image_url.trim())
      errors.banner_image_url = "Banner Image URL is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear error on change
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (catalogue) {
        // Update existing catalogue
        await updateCatalogue({ id: catalogue.id, ...formData }).unwrap();
      } else {
        // Create new catalogue
        await createCatalogue(formData).unwrap();
      }
      setShowSuccessModal(true); // Show success modal
      setFormData({ name: "", pdf_url: "", banner_image_url: "" }); // Reset form
    } catch (error) {
      console.error("Error saving catalogue:", error);
      alert(`Failed to ${catalogue ? "update" : "create"} catalogue`);
    }
  };

  // Handle success modal close
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose(); // Close offcanvas
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex="-1"
        id="offcanvas_add"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="mb-0">
            {catalogue ? "Edit Catalogue" : "Add New Catalogue"}
          </h5>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">
                    Catalogue Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.name ? "is-invalid" : ""
                    }`}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">
                    PDF URL<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.pdf_url ? "is-invalid" : ""
                    }`}
                    name="pdf_url"
                    value={formData.pdf_url}
                    onChange={handleInputChange}
                  />
                  {formErrors.pdf_url && (
                    <div className="invalid-feedback">{formErrors.pdf_url}</div>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">
                    Banner Image URL<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.banner_image_url ? "is-invalid" : ""
                    }`}
                    name="banner_image_url"
                    value={formData.banner_image_url}
                    onChange={handleInputChange}
                  />
                  {formErrors.banner_image_url && (
                    <div className="invalid-feedback">
                      {formErrors.banner_image_url}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-light me-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating
                  ? "Saving..."
                  : catalogue
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={handleSuccessModalClose}
        centered
        id="create_success"
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Catalogue {catalogue ? "updated" : "created"} successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewCatalogue;
