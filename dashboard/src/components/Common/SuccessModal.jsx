import React from "react";

const SuccessModal = () => {
  return (
    <div class="modal fade" id="create_success">
      <div class="modal-dialog modal-dialog-centered modal-sm rounded-0">
        <div class="modal-content rounded-0">
          <div class="modal-body p-4 text-center position-relative">
            <div class="mb-3 position-relative z-1">
              <span class="avatar avatar-xl badge-soft-info border-0 text-info rounded-circle">
                <i class="ti ti-building-skyscraper fs-24"></i>
              </span>
            </div>
            <h5 class="mb-1">Lead Created Successfully!!!</h5>
            <p class="mb-3">View the details of lead, created</p>
            <div class="d-flex justify-content-center">
              <a
                href="#"
                class="btn btn-light position-relative z-1 me-2 w-100"
                data-bs-dismiss="modal"
              >
                Cancel
              </a>
              <a
                href="leads-details.html"
                class="btn btn-primary position-relative z-1 w-100"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
