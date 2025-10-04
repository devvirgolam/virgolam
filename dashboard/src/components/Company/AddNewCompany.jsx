import React from "react";

const AddNewCompany = () => {
  return (
    <div
      class="offcanvas offcanvas-end offcanvas-large"
      tabindex="-1"
      id="offcanvas_add_2"
    >
      <div class="offcanvas-header border-bottom">
        <h5 class="mb-0">Add New Company</h5>
        <button
          type="button"
          class="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <form action="https://crms.dreamstechnologies.com/html/template/leads-list.html">
          <div class="accordion accordion-bordered" id="main_accordion">
            <div class="accordion-item rounded mb-3">
              <div class="accordion-header">
                <a
                  href="#"
                  class="accordion-button accordion-custom-button rounded"
                  data-bs-toggle="collapse"
                  data-bs-target="#basic"
                >
                  <span class="avatar avatar-md rounded me-1">
                    <i class="ti ti-user-plus"></i>
                  </span>
                  Basic Info
                </a>
              </div>
              <div
                class="accordion-collapse collapse show"
                id="basic"
                data-bs-parent="#main_accordion"
              >
                <div class="accordion-body border-top">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="d-flex align-items-center mb-3">
                        <div class="avatar avatar-xxl border border-dashed me-3 flex-shrink-0">
                          <div class="position-relative d-flex align-items-center">
                            <i class="ti ti-photo text-dark fs-16"></i>
                          </div>
                        </div>
                        <div class="d-inline-flex flex-column align-items-start">
                          <div class="drag-upload-btn btn btn-sm btn-primary position-relative mb-2">
                            <i class="ti ti-file-broken me-1"></i>Upload file
                            <input
                              type="file"
                              class="form-control image-sign"
                              multiple=""
                            />
                          </div>
                          <span>JPG, GIF or PNG. Max size of 800K</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="mb-3">
                        <label class="form-label">
                          Company Name<span class="text-danger">*</span>
                        </label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                          <label class="form-label">
                            Email <span class="text-danger ms-1">*</span>
                          </label>
                          <div class="form-check form-switch mb-1">
                            <label class="form-check-label d-flex align-items-center gap-2">
                              <span>Email Opt Out</span>
                              <input
                                class="form-check-input form-check-input-sm switchCheckDefault ms-auto"
                                type="checkbox"
                                role="switch"
                                checked
                              />
                            </label>
                          </div>
                        </div>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Phone 1</label>
                        <input
                          type="text"
                          class="form-control phone"
                          name="phone"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Phone 2</label>
                        <input
                          type="text"
                          class="form-control phone"
                          name="phone"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Fax</label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Website</label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3 position-relative">
                        <label class="form-label">Reviews </label>
                        <div class="input-group w-auto input-group-flat">
                          <input type="text" class="form-control" />
                          <span class="input-group-text">
                            <i class="ti ti-star"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Owner</label>
                        <select class="select2" data-toggle="select2">
                          <option>Select</option>
                          <option>Hendry Milner</option>
                          <option>Guilory Berggren</option>
                          <option>Jami Carlile</option>
                          <option>Theresa Nelson</option>
                          <option>Smith Cooper</option>
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
                          value="Collab, VIP"
                        />
                        <span class="fs-13">
                          Enter value separated by comma
                        </span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Deals</label>
                        <select class="select2" data-toggle="select2">
                          <option>Select</option>
                          <option>Collins</option>
                          <option>Konopelski</option>
                          <option>Adams</option>
                          <option>Schumm</option>
                          <option>Wisozk</option>
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
                    <div class="col-md-12">
                      <div class="mb-3">
                        <label class="form-label">
                          Contacts <span class="text-danger">*</span>
                        </label>
                        <select
                          class="multiple-img"
                          multiple="multiple"
                          data-toggle=" multiple"
                        >
                          <option
                            data-image="assets/img/profiles/avatar-19.jpg"
                            selected
                          >
                            Darlee Robertson
                          </option>
                          <option data-image="assets/img/users/user-01.jpg">
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
                          Language <span class="text-danger">*</span>
                        </label>
                        <select class="select">
                          <option>Select</option>
                          <option>English</option>
                          <option>Arabic</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="mb-0">
                        <label class="form-label">
                          Description <span class="text-danger">*</span>
                        </label>
                        <textarea class="form-control" rows="3"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-item border-top rounded mb-3">
              <div class="accordion-header">
                <a
                  href="#"
                  class="accordion-button accordion-custom-button rounded"
                  data-bs-toggle="collapse"
                  data-bs-target="#address"
                >
                  <span class="avatar avatar-md rounded me-1">
                    <i class="ti ti-map-pin-cog"></i>
                  </span>
                  Address Info
                </a>
              </div>
              <div
                class="accordion-collapse collapse"
                id="address"
                data-bs-parent="#main_accordion"
              >
                <div class="accordion-body border-top">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="mb-3">
                        <label class="form-label">Street Address </label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Country</label>
                        <select class="select">
                          <option>Select</option>
                          <option>USA</option>
                          <option>Canada</option>
                          <option>Germany</option>
                          <option>France</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">State / Province </label>
                        <select class="select">
                          <option>Select</option>
                          <option>California</option>
                          <option>New York</option>
                          <option>Texas</option>
                          <option>Florida</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3 mb-md-0">
                        <label class="form-label">City </label>
                        <select class="select">
                          <option>Select</option>
                          <option>Los Angeles</option>
                          <option>San Diego</option>
                          <option>Fresno</option>
                          <option>San Francisco</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-0">
                        <label class="form-label">Zipcode </label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-item border-top rounded mb-3">
              <div class="accordion-header">
                <a
                  href="#"
                  class="accordion-button accordion-custom-button rounded"
                  data-bs-toggle="collapse"
                  data-bs-target="#social"
                >
                  <span class="avatar avatar-md rounded me-1">
                    <i class="ti ti-social"></i>
                  </span>
                  Social Profile
                </a>
              </div>
              <div
                class="accordion-collapse collapse"
                id="social"
                data-bs-parent="#main_accordion"
              >
                <div class="accordion-body border-top">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Facebook</label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Skype </label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Linkedin </label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Twitter</label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3 mb-md-0">
                        <label class="form-label">Whatsapp</label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-0">
                        <label class="form-label">Instagram</label>
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-item border-top rounded mb-3">
              <div class="accordion-header">
                <a
                  href="#"
                  class="accordion-button accordion-custom-button rounded"
                  data-bs-toggle="collapse"
                  data-bs-target="#access-info"
                >
                  <span class="avatar avatar-md rounded me-1">
                    <i class="ti ti-accessible"></i>
                  </span>
                  Access
                </a>
              </div>
              <div
                class="accordion-collapse collapse"
                id="access-info"
                data-bs-parent="#main_accordion"
              >
                <div class="accordion-body border-top">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="mb-0">
                        <label class="form-label">Visibility</label>
                        <div class="d-flex flex-wrap gap-2">
                          <div class="form-check">
                            <input
                              type="radio"
                              id="customRadio6"
                              name="customRadio"
                              class="form-check-input"
                            />
                            <label class="form-check-label" for="customRadio6">
                              Public
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              type="radio"
                              id="customRadio7"
                              name="customRadio"
                              class="form-check-input"
                            />
                            <label class="form-check-label" for="customRadio7">
                              Private
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              type="radio"
                              id="customRadio8"
                              name="customRadio"
                              class="form-check-input"
                              checked
                            />
                            <label class="form-check-label" for="customRadio8">
                              Select Pepole
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AddNewCompany;
