import React from "react";
import error500 from "../assets/img/authentication/error-500.png";
const Error500 = () => {
  return (
    <div class="main-wrapper">
      <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
          <div class="col-md-8 d-flex align-items-center justify-content-center mx-auto">
            <div>
              <div class="error-img mb-4">
                <img src={error500} class="img-fluid" alt="Img" />
              </div>
              <div class="text-center">
                <h2 class="mb-3">Oops, something went wrong</h2>
                <p class="mb-3">
                  Error 500 Page not found. Sorry the page you looking for{" "}
                  <br /> doesn’t exist or has been moved
                </p>
                <div class="pb-4">
                  <a href="/" class="btn btn-primary">
                    <i class="ti ti-chevron-left me-1"></i>Back to Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error500;
