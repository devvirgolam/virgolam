import React from "react";
import PageHeader from "../components/Common/PageHeader";

const Leads = () => {
  return (
    <div class="content">
      <PageHeader />

      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <div class="dropdown">
            <a
              href="javascript:void(0);"
              class="btn btn-outline-light shadow px-2"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
            >
              <i class="ti ti-filter me-2"></i>Filter
              <i class="ti ti-chevron-down ms-2"></i>
            </a>
            <div class="filter-dropdown-menu dropdown-menu dropdown-menu-lg p-0">
              <div class="filter-header d-flex align-items-center justify-content-between border-bottom">
                <h6 class="mb-0">
                  <i class="ti ti-filter me-1"></i>Filter
                </h6>
                <button
                  type="button"
                  class="btn-close close-filter-btn"
                  data-bs-dismiss="dropdown-menu"
                  aria-label="Close"
                ></button>
              </div>
              <div class="filter-set-view p-3">
                <div class="accordion" id="accordionExample">
                  <div class="filter-set-content">
                    <div class="filter-set-content-head">
                      <a
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        Lead Name
                      </a>
                    </div>
                    <div
                      class="filter-set-contents accordion-collapse collapse show"
                      id="collapseTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="filter-content-list bg-light rounded border p-2 shadow mt-2">
                        <div class="mb-2">
                          <div class="input-icon-start input-icon position-relative">
                            <span class="input-icon-addon fs-12">
                              <i class="ti ti-search"></i>
                            </span>
                            <input
                              type="text"
                              class="form-control form-control-md"
                              placeholder="Search"
                            />
                          </div>
                        </div>
                        <ul class="mb-0">
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-06.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Elizabeth Morgan
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-40.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Katherine Brooks
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-05.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Sophia Lopez
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-10.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              John Michael
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-15.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Natalie Brooks
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-01.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              William Turner
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-13.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Ava Martinez
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-12.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Nathan Reed
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-03.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Lily Anderson
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-18.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Ryan Coleman
                            </label>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              class="link-primary text-decoration-underline p-2 d-flex"
                            >
                              Load More
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="filter-set-content">
                    <div class="filter-set-content-head">
                      <a
                        href="#"
                        class="collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Company Name
                      </a>
                    </div>
                    <div
                      class="filter-set-contents accordion-collapse collapse"
                      id="collapseThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="filter-content-list bg-light rounded border p-2 shadow mt-2">
                        <div class="mb-2">
                          <div class="input-icon-start input-icon position-relative">
                            <span class="input-icon-addon fs-12">
                              <i class="ti ti-search"></i>
                            </span>
                            <input
                              type="text"
                              class="form-control form-control-md"
                              placeholder="Search"
                            />
                          </div>
                        </div>
                        <ul>
                          <li>
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              NovaWave LLC
                            </label>
                          </li>
                          <li>
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              BlueSky Industries
                            </label>
                          </li>
                          <li>
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              Silver Hawk
                            </label>
                          </li>
                          <li>
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              Summit Peak
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="filter-set-content">
                    <div class="filter-set-content-head">
                      <a
                        href="#"
                        class="collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#status"
                        aria-expanded="false"
                        aria-controls="status"
                      >
                        Lead Status
                      </a>
                    </div>
                    <div
                      class="filter-set-contents accordion-collapse collapse"
                      id="status"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="filter-content-list bg-light rounded border p-2 shadow mt-2">
                        <div class="mb-1">
                          <div class="input-icon-start input-icon position-relative">
                            <span class="input-icon-addon fs-12">
                              <i class="ti ti-search"></i>
                            </span>
                            <input
                              type="text"
                              class="form-control form-control-md"
                              placeholder="Search"
                            />
                          </div>
                        </div>
                        <ul class="mb-0">
                          <li>
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              Closed
                            </label>
                          </li>
                          <li>
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              Not Closed
                            </label>
                          </li>
                          <li>
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              Contacted
                            </label>
                          </li>
                          <li>
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              Lost
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="filter-set-content">
                    <div class="filter-set-content-head">
                      <a
                        href="#"
                        class="collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#date2"
                        aria-expanded="false"
                        aria-controls="date2"
                      >
                        Created Date
                      </a>
                    </div>
                    <div
                      class="filter-set-contents accordion-collapse collapse"
                      id="date2"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="filter-content-list bg-light rounded border p-2 shadow mt-2">
                        <div class="input-group w-auto input-group-flat">
                          <input
                            type="text"
                            class="form-control"
                            data-provider="flatpickr"
                            data-date-format="d M, Y"
                          />
                          <span class="input-group-text">
                            <i class="ti ti-calendar"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="filter-set-content">
                    <div class="filter-set-content-head">
                      <a
                        href="#"
                        class="collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#owner"
                        aria-expanded="false"
                        aria-controls="owner"
                      >
                        Lead Owner
                      </a>
                    </div>
                    <div
                      class="filter-set-contents accordion-collapse collapse"
                      id="owner"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="filter-content-list bg-light rounded border p-2 shadow mt-2">
                        <div class="mb-2">
                          <div class="input-icon-start input-icon position-relative">
                            <span class="input-icon-addon fs-12">
                              <i class="ti ti-search"></i>
                            </span>
                            <input
                              type="text"
                              class="form-control form-control-md"
                              placeholder="Search"
                            />
                          </div>
                        </div>
                        <ul class="mb-0">
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-17.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Robert Johnson
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-16.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Isabella Cooper
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-14.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              John Smith
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-22.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Sophia Parker
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-25.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Emma Reynolds
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-24.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Liam Carter
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-39.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Noah Mitchell
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-31.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Mason Hayes
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-21.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Ron Thompson
                            </label>
                          </li>
                          <li class="mb-1">
                            <label class="dropdown-item px-2 d-flex align-items-center">
                              <input
                                class="form-check-input m-0 me-1"
                                type="checkbox"
                              />
                              <span class="avatar avatar-xs rounded-circle me-2">
                                <img
                                  src="assets/img/users/user-10.jpg"
                                  class="flex-shrink-0 rounded-circle"
                                  alt="img"
                                />
                              </span>
                              Laura Bennett
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-outline-light w-100"
                  >
                    Reset
                  </a>
                  <a href="javascript:void(0);" class="btn btn-primary w-100">
                    Filter
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="input-icon input-icon-start position-relative">
            <span class="input-icon-addon text-dark">
              <i class="ti ti-search"></i>
            </span>
            <input type="text" class="form-control" placeholder="Search" />
          </div>
        </div>
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <div class="d-flex align-items-center shadow p-1 rounded border view-icons bg-white">
            <a href="leads-list.html" class="btn btn-sm p-1 border-0 fs-14">
              <i class="ti ti-list-tree"></i>
            </a>
            <a
              href="leads.html"
              class="flex-shrink-0 btn btn-sm p-1 border-0 ms-1 fs-14 active"
            >
              <i class="ti ti-grid-dots"></i>
            </a>
          </div>
          <a
            href="javascript:void(0);"
            class="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas_add"
          >
            <i class="ti ti-square-rounded-plus-filled me-1"></i>Add Lead
          </a>
        </div>
      </div>

      <div class="d-flex overflow-x-auto align-items-start gap-3">
        <div class="kanban-list-items p-2 rounded border">
          <div class="card mb-0 border-0 shadow">
            <div class="card-body p-2">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="d-flex align-items-center mb-1">
                    <i class="ti ti-circle-filled fs-10 text-warning me-1"></i>
                    Contacted
                  </h6>
                  <span class="fw-medium">45 Leads - $15,44,540</span>
                </div>
                <div class="d-flex align-items-center">
                  <a href="javascript:void(0);" class="text-info">
                    <i class="ti ti-plus"></i>
                  </a>
                  <div class="dropdown table-action ms-2">
                    <a
                      href="#"
                      class="action-icon btn btn-xs shadow btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="ti ti-dots-vertical"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a
                        class="dropdown-item"
                        href="#"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas_edit"
                      >
                        <i class="fa-solid fa-pencil text-blue"></i> Edit
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_lead"
                      >
                        <i class="fa-regular fa-trash-can text-danger"></i>
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kanban-drag-wrap">
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-secondary"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-info flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-info">SM</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Schumm</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $03,50,000
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="f39792819f96969cb3968b929e839f96dd909c9e"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 12445-47878
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Newyork, United States
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-09.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-secondary"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-danger flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-danger">CS</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Collins</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $02,10,000
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="a4d6cbc6c1d6d0d7cbcae4c1dcc5c9d4c8c18ac7cbc9"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 13987-90231
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Austin, United States
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-01.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-secondary"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-warning flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-warning">KI</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Konopelski</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $02,18,000
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="eb98838a998485ab8e938a869b878ec5888486"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 17932-04278
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Atlanta, United States
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-02.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="kanban-list-items p-2 rounded border">
          <div class="card mb-0 border-0 shadow">
            <div class="card-body p-2">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="d-flex align-items-center mb-1">
                    <i class="ti ti-circle-filled fs-10 text-info me-1"></i>Not
                    Contacted
                  </h6>
                  <span class="fw-medium">45 Leads - $15,44,540</span>
                </div>
                <div class="d-flex align-items-center">
                  <a href="javascript:void(0);" class="text-info">
                    <i class="ti ti-plus"></i>
                  </a>
                  <div class="dropdown table-action ms-2">
                    <a
                      href="#"
                      class="action-icon btn btn-xs shadow btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="ti ti-dots-vertical"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a
                        class="dropdown-item"
                        href="#"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas_edit"
                      >
                        <i class="fa-solid fa-pencil text-blue"></i> Edit
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_lead"
                      >
                        <i class="fa-regular fa-trash-can text-danger"></i>
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kanban-drag-wrap">
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-info"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-danger flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-danger">AS</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Adams</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $02,45,000
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="c8bea9bdafa0a9a6f9fa88adb0a9a5b8a4ade6aba7a5"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 17392-27846
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      London, United Kingdom
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-03.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-info"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-info flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-info">WK</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Wizosk</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $01,17,000
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="402321322f2c34282f73002538212d302c256e232f2d"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 78982-09163
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Bristol, United Kingdom
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-04.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-info"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-success flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-success">HR</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Heller</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $02,12,000
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="66020711080b0314050e0726031e070b160a034805090b"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 27691-89246
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      San Francisco, United States
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-05.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="kanban-list-items p-2 rounded border">
          <div class="card mb-0 border-0 shadow">
            <div class="card-body p-2">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="d-flex align-items-center mb-1">
                    <i class="ti ti-circle-filled fs-10 text-success me-1"></i>
                    Closed
                  </h6>
                  <span class="fw-medium">45 Leads - $15,44,540</span>
                </div>
                <div class="d-flex align-items-center">
                  <a href="javascript:void(0);" class="text-info">
                    <i class="ti ti-plus"></i>
                  </a>
                  <div class="dropdown table-action ms-2">
                    <a
                      href="#"
                      class="action-icon btn btn-xs shadow btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="ti ti-dots-vertical"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a
                        class="dropdown-item "
                        href="#"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas_edit"
                      >
                        <i class="fa-solid fa-pencil text-blue"></i> Edit
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_lead"
                      >
                        <i class="fa-regular fa-trash-can text-danger"></i>
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kanban-drag-wrap">
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-success"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-danger flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-danger">GI</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Gutkowsi</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $01,84,043
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="364457555e535a76534e575b465a531855595b"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 17839-93617
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Dallas, United States
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-06.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-success"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-warning flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-warning">WR</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Walter</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $09,35,189
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="b9d3d6d7dcd5d5dcf9dcc1d8d4c9d5dc97dad6d4"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 16739-47193
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Leicester, United Kingdom
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-07.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-success"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-success flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-success">HN</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Hansen</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $04,27,940
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="81ebeeefe0f5e9e0efc1e4f9e0ecf1ede4afe2eeec"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 18390-37153
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Norwich, United Kingdom
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-08.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="kanban-list-items p-2 rounded border">
          <div class="card mb-0 border-0 shadow">
            <div class="card-body p-2">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="d-flex align-items-center mb-1">
                    <i class="ti ti-circle-filled fs-10 text-danger me-1"></i>
                    Lost
                  </h6>
                  <span class="fw-medium">15 Leads - $14,89,543</span>
                </div>
                <div class="d-flex align-items-center">
                  <a href="javascript:void(0);" class="text-info">
                    <i class="ti ti-plus"></i>
                  </a>
                  <div class="dropdown table-action ms-2">
                    <a
                      href="#"
                      class="action-icon btn btn-xs shadow btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="ti ti-dots-vertical"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a
                        class="dropdown-item "
                        href="#"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas_edit"
                      >
                        <i class="fa-solid fa-pencil text-blue"></i> Edit
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_lead"
                      >
                        <i class="fa-regular fa-trash-can text-danger"></i>
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kanban-drag-wrap">
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-danger"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-danger flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-danger">SE</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Steve</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $04,17,593
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="82f1ebe6ece7fbc2e7fae3eff2eee7ace1edef"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 11739-38135
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Manchester, United Kingdom
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-09.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-danger"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-info flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-info">LE</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Leuschke</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $08,81,389
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="eb8999848480ab8e938a869b878ec5888486"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 19302-91043
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Chicago, United States
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-10.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card kanban-card border mb-0 mt-3 shadow ui-sortable-handle">
                <div class="card-body">
                  <div class="d-block">
                    <div class="card-topbar mb-3 pt-1 bg-danger"></div>
                    <div class="d-flex align-items-center mb-3">
                      <a
                        href="leads-details.html"
                        class="avatar rounded-circle bg-soft-danger flex-shrink-0 me-2"
                      >
                        <span class="avatar-title text-danger">AY</span>
                      </a>
                      <h6 class="fw-medium fs-14 mb-0">
                        <a href="leads-details.html">Anthony</a>
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-report-money text-dark me-1"></i>
                      $09,27,193
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-mail text-dark me-1"></i>
                      <a
                        href="https://crms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="d5b8bcb6beb0ac95b0adb4b8a5b9b0fbb6bab8"
                      >
                        [email&#160;protected]
                      </a>
                    </p>
                    <p class="text-default d-inline-flex align-items-center mb-2">
                      <i class="ti ti-phone text-dark me-1"></i>
                      +1 17280-92016
                    </p>
                    <p class="text-default d-inline-flex align-items-center">
                      <i class="ti ti-map-pin-pin text-dark me-1"></i>
                      Derby, United Kingdom
                    </p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between border-top pt-3">
                    <span class="avatar avatar-xs border rounded-circle d-flex align-items-center justify-content-center p-1">
                      <img
                        src="assets/img/icons/company-icon-01.svg"
                        alt="img"
                      />
                    </span>
                    <div class="icons-social d-flex align-items-center gap-1">
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-phone-check"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center me-1"
                      >
                        <i class="ti ti-message-circle-2"></i>
                      </a>
                      <a
                        href="#"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-color-swatch"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
