import React, { useState } from "react";
import PageHeader from "../components/Common/PageHeader";
import { useListRolesQuery, useCreateRoleMutation } from "../api/rolesApi"; // Adjust the import path based on your project structure

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Fetch roles using the useListRolesQuery hook
  const { data: roles, isLoading, error } = useListRolesQuery();
  console.log(roles);
  const [createRole] = useCreateRoleMutation();

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter roles based on search term
  const filteredRoles = roles?.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission for creating a new role
  const handleCreateRole = async (e) => {
    e.preventDefault();
    const roleName = e.target.elements.roleName.value;
    if (roleName) {
      try {
        await createRole({ name: roleName }).unwrap();
        e.target.reset(); // Reset form
        document.getElementById("add_role").classList.remove("show"); // Close modal
      } catch (err) {
        console.error("Failed to create role:", err);
      }
    }
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
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <a
            href="#"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add_role"
          >
            <i className="ti ti-square-rounded-plus-filled me-1"></i>Add New
            Role
          </a>
        </div>
        <div className="card-body">
          <div className="table-responsive custom-table">
            <table className="table table-nowrap" id="roles_list">
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
                  <th>Role Name</th>
                  <th>Created</th>
                  <th className="no-sort">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4">Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4">Error loading roles</td>
                  </tr>
                ) : filteredRoles?.length > 0 ? (
                  filteredRoles.map((role) => (
                    <tr key={role.id}>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>{role.name}</td>
                      <td>{new Date(role.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-1">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No roles found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Adding a New Role */}
      <div
        className="modal fade"
        id="add_role"
        tabIndex="-1"
        aria-labelledby="addRoleLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRoleLabel">
                Add New Role
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleCreateRole}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="roleName" className="form-label">
                    Role Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roleName"
                    name="roleName"
                    placeholder="Enter role name"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
