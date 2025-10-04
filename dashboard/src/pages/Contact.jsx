import React, { useState } from "react";
import PageHeader from "../components/Common/PageHeader";
import {
  useListContactsQuery,
  useSubmitContactMutation,
} from "../api/contactApi";

const Contact = () => {
  // State for the form fields in the modal
  const [formData, setFormData] = useState({
    title: "",
    status: "active", // Default status
  });

  // State for controlling the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // RTK Query hooks
  const { data: contacts, isLoading, isError, error } = useListContactsQuery();
  const [
    submitContact,
    { isLoading: isSubmitting, isError: isSubmitError, error: submitError },
  ] = useSubmitContactMutation();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(formData).unwrap();
      setFormData({ title: "", status: "active" }); // Reset form
      setIsModalOpen(false); // Close modal
    } catch (err) {
      console.error("Failed to submit contact:", err);
    }
  };

  // Handle modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="content pb-0">
      <PageHeader />

      <div className="card border-0 rounded-0">
        <div className="card-header d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <div className="input-icon input-icon-start position-relative">
            <span className="input-icon-addon text-dark">
              <i className="ti ti-search"></i>
            </span>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add_lost_reason"
            onClick={toggleModal}
          >
            <i className="ti ti-square-rounded-plus-filled me-1"></i>Add New
            Reason
          </button>
        </div>
        <div className="card-body">
          {isLoading && <p>Loading contacts...</p>}
          {isError && (
            <p className="text-danger">
              Error: {error?.data?.message || "Failed to load contacts"}
            </p>
          )}
          {!isLoading && !isError && (
            <div className="table-responsive custom-table">
              <table className="table table-nowrap" id="reason-list">
                <thead className="table-light">
                  <tr>
                    <th className="no-sort">
                      <div className="form-check form-check-md">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="select-all"
                        />
                      </div>
                    </th>
                    <th>Title</th>
                    <th>Created at</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts?.map((contact) => (
                    <tr key={contact.id}>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>{contact.title}</td>
                      <td>{formatDate(contact.createdAt)}</td>
                      <td>{contact.status}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger ms-1">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="datatable-length"></div>
            </div>
            <div className="col-md-6">
              <div className="datatable-paginate"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
