import React from "react";

const AddLead = () => {
  return (
    <div
      class="offcanvas offcanvas-end offcanvas-large"
      tabindex="-1"
      id="offcanvas_add"
    >
      <div class="offcanvas-header border-bottom">
        <h5 class="mb-0">Add New Lead</h5>
        <button
          type="button"
          class="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <form action="https://crms.dreamstechnologies.com/html/template/leads-list.html">
          <div class="row">
            <div class="col-md-12">
              <div class="mb-3">
                <label class="form-label">
                  Lead Name<span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-3">
                <label class="form-label">Lead Type</label>
                <div class="d-flex flex-wrap gap-2">
                  <div class="form-check">
                    <input
                      type="radio"
                      id="customRadio1"
                      name="customRadio"
                      class="form-check-input"
                    />
                    <label class="form-check-label" for="customRadio1">
                      Person
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      type="radio"
                      id="customRadio2"
                      name="customRadio"
                      class="form-check-input"
                    />
                    <label class="form-check-label" for="customRadio2">
                      Organization
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-3">
                <div class="d-flex align-items-center justify-content-between">
                  <label class="form-label">Company Name</label>
                  <a
                    href="#"
                    class="label-add link-primary mb-1"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvas_add_2"
                  >
                    <i class="ti ti-plus me-1"></i>Add New
                  </a>
                </div>
                <select class="select2" data-toggle="select2">
                  <option>Select</option>
                  <option>NovaWave LLC</option>
                  <option>BlueSky Industries</option>
                  <option>Silver Hawk</option>
                  <option>Summit Peak</option>
                  <option>RiverStone Ventur</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">
                  Value <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">
                  Currency <span class="text-danger">*</span>
                </label>
                <select class="select">
                  <option>Select</option>
                  <option>Dollar</option>
                  <option>Euro</option>
                  <option>Pound</option>
                  <option>Rupee</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">
                  Phone <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label mb-3"></label>
                <select class="select">
                  <option>Select</option>
                  <option>Work</option>
                  <option>Home</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">
                  Source <span class="text-danger">*</span>
                </label>
                <select class="select2" data-toggle="select2">
                  <option>Select</option>
                  <option>Phone Calls</option>
                  <option>Social Media</option>
                  <option>Referral Sites</option>
                  <option>Web Analytics</option>
                  <option>Previous Purchases</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">
                  Industry <span class="text-danger">*</span>
                </label>
                <select class="select">
                  <option>Select</option>
                  <option>Retail Industry</option>
                  <option>Banking</option>
                  <option>Hotels</option>
                  <option>Financial Services</option>
                  <option>Insurance</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Owner</label>
                <select
                  class="multiple-img"
                  multiple="multiple"
                  data-toggle=" multiple"
                >
                  <option data-image="assets/img/profiles/avatar-19.jpg">
                    Darlee Robertson
                  </option>
                  <option data-image="assets/img/users/user-01.jpg" selected>
                    Sharon Roy
                  </option>
                  <option data-image="assets/img/profiles/avatar-21.jpg">
                    Vaughan Lewis
                  </option>
                  <option data-image="assets/img/profiles/avatar-23.jpg">
                    Jessica Louise
                  </option>
                  <option data-image="assets/img/profiles/avatar-16.jpg">
                    Carol Thomas
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Tags </label>
                <input
                  class="input-tags form-control border-0 h-100"
                  data-choices
                  data-choices-limit="infinite"
                  data-choices-removeItem
                  type="text"
                  value="Collab"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-3">
                <label class="form-label">
                  Description <span class="text-danger">*</span>
                </label>
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-3">
                <label class="form-label">Visibility</label>
                <div class="d-flex flex-wrap gap-2">
                  <div class="form-check">
                    <input
                      type="radio"
                      id="customRadio3"
                      name="customRadio"
                      class="form-check-input"
                    />
                    <label class="form-check-label" for="customRadio3">
                      Public
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      type="radio"
                      id="customRadio4"
                      name="customRadio"
                      class="form-check-input"
                    />
                    <label class="form-check-label" for="customRadio4">
                      Private
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      type="radio"
                      id="customRadio5"
                      name="customRadio"
                      class="form-check-input"
                      checked
                    />
                    <label class="form-check-label" for="customRadio5">
                      Select Pepole
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-end">
            <button
              type="button"
              data-bs-dismiss="offcanvas"
              class="btn btn-light me-2"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#create_success"
            >
              Create New
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLead;
