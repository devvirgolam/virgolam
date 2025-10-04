import React from "react";
import PageHeader from "../Common/PageHeader";

const BlogCategories = () => {
  return (
    <div class="content pb-0">
      <PageHeader />

      <div class="card border-0 rounded-0">
        <div class="card-header d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <div class="input-icon input-icon-start position-relative">
            <span class="input-icon-addon text-dark">
              <i class="ti ti-search"></i>
            </span>
            <input type="text" class="form-control" placeholder="Search" />
          </div>
          <a
            href="javascript:void(0);"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add_categories"
          >
            <i class="ti ti-square-rounded-plus-filled me-1"></i>Add Blog
            Category
          </a>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <div class="reportrange-picker reportrange d-flex align-items-center shadow">
                <i class="ti ti-calendar-due text-dark fs-14 me-1"></i>
                <span class="reportrange-picker-field">
                  9 Jun 25 - 9 Jun 25
                </span>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <div class="dropdown">
                <a
                  href="javascript:void(0);"
                  class="dropdown-toggle btn btn-outline-light px-2 shadow"
                  data-bs-toggle="dropdown"
                >
                  <i class="ti ti-sort-ascending-2 me-2"></i>Sort By
                </a>
                <div class="dropdown-menu">
                  <ul>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item">
                        Newest
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="dropdown-item">
                        Oldest
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="table-responsive custom-table">
            <table class="table table-nowrap" id="categories_list">
              <thead class="table-light">
                <tr>
                  <th class="no-sort">
                    <div class="form-check form-check-md">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="select-all"
                      />
                    </div>
                  </th>
                  <th>Category Name</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th class="no-sort">Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="datatable-length"></div>
            </div>
            <div class="col-md-6">
              <div class="datatable-paginate"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCategories;
