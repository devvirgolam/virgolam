import React, { useState } from "react";
import {
  useListCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "../api/categoryApi";
import { useGetParentCategoriesQuery } from "../api/parentCategoryApi";

const Categories = () => {
  // State for modal, form, and selected parent category
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    parent_id: "",
  });
  const [error, setError] = useState(null);
  const [selectedParentId, setSelectedParentId] = useState(null);

  // Fetch categories and parent categories
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useListCategoriesQuery();
  const { data: parentCategories = [], isLoading: isParentCategoriesLoading } =
    useGetParentCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({
        name: newCategory.name,
        slug: newCategory.slug,
        parent_id: newCategory.parent_id || null,
      }).unwrap();
      setNewCategory({ name: "", slug: "", parent_id: "" });
      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      setError(err.data?.error || "Failed to create category");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
      } catch (err) {
        alert(
          "Failed to delete category: " + (err.data?.error || "Unknown error")
        );
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get categories for a specific parent
  const getChildCategories = (parentId) => {
    return categories.filter(
      (category) => (category.parent_id || null) === parentId
    );
  };

  // Handle parent category click
  const handleParentClick = (parentId) => {
    setSelectedParentId(selectedParentId === parentId ? null : parentId);
  };

  return (
    <div className="content pb-0">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
        <div>
          <h4 className="mb-1">
            Sources
            <span className="badge badge-soft-primary ms-2">
              {parentCategories.length} Parent Categories
            </span>
          </h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Sources
              </li>
            </ol>
          </nav>
        </div>
        <div className="gap-2 d-flex align-items-center flex-wrap">
          <a
            href="javascript:void(0);"
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="ti ti-square-rounded-plus-filled me-1"></i>Add New
            Category
          </a>
        </div>
      </div>
      {/* End Page Header */}

      {/* Parent Categories as Cards */}
      {isParentCategoriesLoading ? (
        <p>Loading parent categories...</p>
      ) : (
        <div className="row g-3 mb-4">
          {parentCategories.map((parent) => {
            const childCount = getChildCategories(parent.id).length;
            return (
              <div className="col-md-4 col-lg-3" key={parent.id}>
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleParentClick(parent.id)}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{parent.name}</h5>
                      <p className="card-text text-muted">
                        {childCount}{" "}
                        {childCount === 1 ? "Category" : "Categories"}
                      </p>
                    </div>
                    <div className="mt-2">
                      <span className="badge badge-soft-primary">
                        <i className="ti ti-timer me-1"></i>
                        {childCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Card for categories without parent */}
          <div className="col-md-4 col-lg-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{ cursor: "pointer" }}
              onClick={() => handleParentClick(null)}
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">No Parent</h5>
                  <p className="card-text text-muted">
                    {getChildCategories(null).length}{" "}
                    {getChildCategories(null).length === 1
                      ? "Category"
                      : "Categories"}
                  </p>
                </div>
                <div className="mt-2">
                  <span className="badge badge-soft-primary">
                    <i className="ti ti-timer me-1"></i>
                    {getChildCategories(null).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Child Categories Table */}
      {selectedParentId !== null && (
        <div className="card border-0 rounded-0 mt-4">
          <div className="card-header">
            <h5>
              Categories under{" "}
              {parentCategories.find((p) => p.id === selectedParentId)?.name ||
                "No Parent"}
            </h5>
          </div>
          <div className="card-body">
            {isCategoriesLoading ? (
              <p>Loading categories...</p>
            ) : categoriesError ? (
              <p>
                Error:{" "}
                {categoriesError.data?.error || "Failed to load categories"}
              </p>
            ) : getChildCategories(selectedParentId).length === 0 ? (
              <p>No categories found for this parent.</p>
            ) : (
              <div className="table-responsive custom-table">
                <table className="table table-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th className="no-sort">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getChildCategories(selectedParentId).map((category) => (
                      <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>{formatDate(category.created_at)}</td>
                        <td>
                          <span className="badge badge-soft-success">
                            Active
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() =>
                              alert("Edit functionality not implemented")
                            }
                          >
                            <i className="ti ti-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(category.id)}
                          >
                            <i className="ti ti-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Adding New Category */}
      <div
        className={`modal fade ${isModalOpen ? "show d-block" : ""}`}
        id="add_category"
        tabIndex="-1"
        aria-labelledby="addCategoryLabel"
        aria-hidden={!isModalOpen}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCategoryLabel">
                Add New Category
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">
                    Slug
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="slug"
                    name="slug"
                    value={newCategory.slug}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="parent_id" className="form-label">
                    Parent Category
                  </label>
                  <select
                    className="form-select"
                    id="parent_id"
                    name="parent_id"
                    value={newCategory.parent_id}
                    onChange={handleInputChange}
                  >
                    <option value="">None</option>
                    {parentCategories.map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Category"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
