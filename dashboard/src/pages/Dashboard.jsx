import React from "react";
import PageHeader from "../components/Common/PageHeader";

const Dashboard = () => {
  return (
    <div class="page-wrapper">
      <div class="content pb-0">
        <PageHeader />

        <div class="row">
          <div class="col-md-6 d-flex">
            <div class="card flex-fill">
              <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <h6 class="mb-0">Recently Created Deals</h6>
                <div class="dropdown">
                  <a
                    class="dropdown-toggle btn btn-outline-light shadow"
                    data-bs-toggle="dropdown"
                    href="javascript:void(0);"
                  >
                    Last 30 days
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a href="javascript:void(0);" class="dropdown-item">
                      Last 15 days
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item">
                      Last 30 days
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive custom-table">
                  <table
                    class="table dataTable table-nowrap"
                    id="deals-project"
                  >
                    <thead class="table-light">
                      <tr>
                        <th>Deal Name</th>
                        <th>Stage</th>
                        <th>Deal Value</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 d-flex">
            <div class="card flex-fill">
              <div class="card-header">
                <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h6 class="mb-0">Deals By Stage</h6>
                  <div class="d-flex align-items-center flex-wrap row-gap-3">
                    <div class="dropdown me-2">
                      <a
                        class="dropdown-toggle btn btn-outline-light shadow"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);"
                      >
                        Sales Pipeline
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" class="dropdown-item">
                          Marketing Pipeline
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Sales Pipeline
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Email
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Chats
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Operational
                        </a>
                      </div>
                    </div>
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle btn btn-outline-light shadow"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);"
                      >
                        Last 30 Days
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" class="dropdown-item">
                          Last 30 Days
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Last 15 Days
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Last 7 Days
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body py-0">
                <div id="deals-chart"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 d-flex">
            <div class="card flex-fill">
              <div class="card-header">
                <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h6 class="mb-0">Lost Deals Stage</h6>
                  <div class="d-flex align-items-center flex-wrap row-gap-3">
                    <div class="dropdown me-2">
                      <a
                        class="dropdown-toggle btn btn-outline-light shadow"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);"
                      >
                        Marketing Pipeline
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" class="dropdown-item">
                          Marketing Pipeline
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Sales Pipeline
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Email
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Chats
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Operational
                        </a>
                      </div>
                    </div>
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle btn btn-outline-light shadow"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);"
                      >
                        Last 30 Days
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" class="dropdown-item">
                          Last 30 Days
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Last 6 months
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Last 12 months
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body py-0">
                <div id="last-chart"></div>
              </div>
            </div>
          </div>

          <div class="col-md-6 d-flex">
            <div class="card flex-fill">
              <div class="card-header">
                <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h6 class="mb-0">Won Deals Stage</h6>
                  <div class="d-flex align-items-center flex-wrap row-gap-3">
                    <div class="dropdown me-2">
                      <a
                        class="dropdown-toggle btn btn-outline-light shadow"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);"
                      >
                        Marketing Pipeline
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" class="dropdown-item">
                          Marketing Pipeline
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Sales Pipeline
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Email
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Chats
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Operational
                        </a>
                      </div>
                    </div>
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle btn btn-outline-light shadow"
                        data-bs-toggle="dropdown"
                        href="javascript:void(0);"
                      >
                        Last 30 Days
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" class="dropdown-item">
                          Last 30 Days
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Last 6 months
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item">
                          Last 12 months
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body py-0">
                <div id="won-chart"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 d-flex">
            <div class="card w-100">
              <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <h6 class="mb-0">Deals by Year</h6>
                <div class="d-flex align-items-center flex-wrap row-gap-3">
                  <div class="dropdown me-2">
                    <a
                      class="dropdown-toggle btn btn-outline-light shadow"
                      data-bs-toggle="dropdown"
                      href="javascript:void(0);"
                    >
                      Sales Pipeline
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a href="javascript:void(0);" class="dropdown-item">
                        Marketing Pipeline
                      </a>
                      <a href="javascript:void(0);" class="dropdown-item">
                        Sales Pipeline
                      </a>
                    </div>
                  </div>
                  <div class="dropdown">
                    <a
                      class="dropdown-toggle btn btn-outline-light shadow"
                      data-bs-toggle="dropdown"
                      href="javascript:void(0);"
                    >
                      Last 30 Days
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a href="javascript:void(0);" class="dropdown-item">
                        Last 3 months
                      </a>
                      <a href="javascript:void(0);" class="dropdown-item">
                        Last 6 months
                      </a>
                      <a href="javascript:void(0);" class="dropdown-item">
                        Last 12 months
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body py-0">
                <div id="deals-year"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
