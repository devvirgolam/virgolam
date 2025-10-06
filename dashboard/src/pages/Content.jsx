import React, { useState } from "react";
import {
  useListContentQuery,
  useCreateContentMutation,
} from "../api/contentApi"; // Adjust path as needed
import {
  Dropdown,
  Menu,
  Button,
  Modal,
  Form,
  Input,
  Progress,
  Table,
  Upload,
  Avatar,
} from "antd";
import {
  DownOutlined,
  PlusCircleOutlined,
  MoreOutlined,
  UploadOutlined,
  FolderFilled,
  StarOutlined,
  StarFilled,
  FileTextOutlined,
  FilePdfOutlined,
  AudioOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import PageHeader from "../components/Common/PageHeader";

const Content = () => {
  const {
    data: contentData,
    isLoading,
    isError,
    error,
  } = useListContentQuery(); // Fetch content
  const [createContent, { isLoading: isCreating }] = useCreateContentMutation(); // Create content mutation
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [folderName, setFolderName] = useState(""); // State for new folder name

  // Sample data structure based on API response (adjust as per your API)
  const storageData = contentData?.storages || [
    {
      name: "Dropbox",
      files: 200,
      size: "28GB",
      progress: 20,
      icon: "dropbox.svg",
    },
    {
      name: "Google Drive",
      files: 144,
      size: "54GB",
      progress: 80,
      icon: "drive.svg",
    },
    {
      name: "Cloud Storage",
      files: 144,
      size: "54GB",
      progress: 50,
      icon: "cloud.svg",
    },
    {
      name: "Internal Storage",
      files: 144,
      size: "54GB",
      progress: 20,
      icon: "storage.svg",
    },
  ];

  const quickAccessData = contentData?.quickAccess || [
    { name: "Final.doc", size: "2.4 GB", icon: "file.svg", starred: true },
    {
      name: "Marklist.pdf",
      size: "2.4 GB",
      icon: "pdf-icon.svg",
      starred: false,
    },
    { name: "Nature.png", size: "2.4 GB", icon: "image.svg", starred: true },
    { name: "List.xlsx", size: "2.4 GB", icon: "xls-icon.svg", starred: false },
    {
      name: "Group Photos",
      size: "2.4 GB",
      icon: "folder-icon.svg",
      starred: false,
    },
    { name: "Final.doc", size: "2.4 GB", icon: "file.svg", starred: true },
  ];

  const recentFoldersData = contentData?.recentFolders || [
    {
      name: "Assets",
      size: "2.4 GB",
      files: 35,
      avatars: ["avatar-07.jpg", "avatar-02.jpg"],
    },
    {
      name: "Document",
      size: "4 GB",
      files: 15,
      avatars: ["avatar-05.jpg", "avatar-02.jpg"],
    },
    {
      name: "Handyimages",
      size: "1.4 GB",
      files: 115,
      avatars: ["avatar-05.jpg", "avatar-02.jpg"],
    },
  ];

  const filesData = contentData?.files || [
    {
      key: 1,
      name: "Secret",
      size: "7.6 MB",
      type: "Doc",
      modified: "Mar 15, 2025 05:00:14 PM",
      shared: ["avatar-03.jpg", "avatar-04.jpg", "avatar-12.jpg"],
      starred: false,
    },
    {
      key: 2,
      name: "Sophie Headrick",
      size: "7.4 MB",
      type: "PDF",
      modified: "Jan 8, 2025 08:20:13 PM",
      shared: ["avatar-15.jpg", "avatar-16.jpg"],
      starred: false,
    },
    {
      key: 3,
      name: "Gallery",
      size: "6.1 MB",
      type: "Image",
      modified: "Aug 6, 2025 04:10:12 PM",
      shared: [
        "avatar-02.jpg",
        "avatar-03.jpg",
        "avatar-05.jpg",
        "avatar-06.jpg",
      ],
      starred: false,
    },
    {
      key: 4,
      name: "Doris Crowley",
      size: "5.2 MB",
      type: "Folder",
      modified: "Jan 6, 2025 03:40:14 PM",
      shared: ["avatar-06.jpg", "avatar-10.jpg", "avatar-15.jpg"],
      starred: false,
    },
    {
      key: 5,
      name: "Cheat_codez",
      size: "8 MB",
      type: "Xml",
      modified: "Oct 12, 2025 05:00:14 PM",
      shared: [
        "avatar-04.jpg",
        "avatar-05.jpg",
        "avatar-12.jpg",
        "avatar-11.jpg",
      ],
      starred: false,
    },
  ];

  // Handle folder creation
  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      alert("Folder name is required");
      return;
    }
    try {
      await createContent({ name: folderName, type: "folder" }).unwrap();
      setFolderName("");
      setIsModalVisible(false);
    } catch (err) {
      alert(
        `Failed to create folder: ${err.data?.error || "Something went wrong"}`
      );
    }
  };

  // Dropdown menus
  const fileFilterMenu = (
    <Menu>
      <Menu.Item key="all">All Files</Menu.Item>
      <Menu.Item key="music">Music</Menu.Item>
      <Menu.Item key="video">Video</Menu.Item>
      <Menu.Item key="documents">Documents</Menu.Item>
      <Menu.Item key="photos">Photos</Menu.Item>
    </Menu>
  );

  const storageActionMenu = (
    <Menu>
      <Menu.Item key="open">
        <FolderFilled className="ti ti-folder-open me-2" />
        Open
      </Menu.Item>
      <Menu.Item key="delete">
        <DeleteOutlined className="ti ti-trash me-1" />
        Delete All
      </Menu.Item>
      <Menu.Item key="reset">
        <i className="ti ti-status-change me-1" />
        Reset
      </Menu.Item>
    </Menu>
  );

  const recentFilterMenu = (
    <Menu>
      <Menu.Item key="last7">Last 7 Days</Menu.Item>
      <Menu.Item key="lastMonth">Last Month</Menu.Item>
      <Menu.Item key="lastYear">Last Year</Menu.Item>
    </Menu>
  );

  const filesSortMenu = (
    <Menu>
      <Menu.Item key="docs">Docs</Menu.Item>
      <Menu.Item key="pdf">Pdf</Menu.Item>
      <Menu.Item key="image">Image</Menu.Item>
      <Menu.Item key="folder">Folder</Menu.Item>
      <Menu.Item key="xml">Xml</Menu.Item>
    </Menu>
  );

  const folderActionMenu = (
    <Menu>
      <Menu.Item
        key="preview"
        data-bs-toggle="offcanvas"
        data-bs-target="#preview"
      >
        <FolderFilled className="ti ti-folder-open me-2" />
        Preview
      </Menu.Item>
      <Menu.Item key="duplicate">
        <i className="ti ti-copy me-2" />
        Duplicate
      </Menu.Item>
      <Menu.Item key="move">
        <i className="ti ti-arrow-left-right me-2" />
        Move
      </Menu.Item>
      <Menu.Item key="invite">
        <i className="ti ti-user-plus me-2" />
        Invite
      </Menu.Item>
      <Menu.Item key="share">
        <i className="ti ti-share-3 me-2" />
        Share Link
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="view">
        <i className="ti ti-eye me-2" />
        View Details
      </Menu.Item>
      <Menu.Item key="download">
        <i className="ti ti-download me-2" />
        Download
      </Menu.Item>
      <Menu.Item
        key="delete"
        data-bs-toggle="modal"
        data-bs-target="#delete-modal"
      >
        <DeleteOutlined className="ti ti-trash-x me-2" />
        Delete
      </Menu.Item>
    </Menu>
  );

  const fileActionMenu = (
    <Menu>
      <Menu.Item
        key="delete"
        data-bs-toggle="modal"
        data-bs-target="#delete-modal"
      >
        <DeleteOutlined className="ti ti-trash me-2" />
        Permanent Delete
      </Menu.Item>
      <Menu.Item key="restore">
        <EditOutlined className="ti ti-edit-circle me-2" />
        Restore File
      </Menu.Item>
    </Menu>
  );

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <a
            href="#"
            className="avatar avatar-md bg-light"
            data-bs-toggle="offcanvas"
            data-bs-target="#preview"
          >
            <img
              src={`assets/img/icons/file-0${record.key}.svg`}
              className="img-fluid w-auto h-auto"
              alt="img"
            />
          </a>
          <div className="ms-2">
            <p className="text-dark fw-medium mb-0">
              <a href="#" data-bs-toggle="offcanvas" data-bs-target="#preview">
                {text}
              </a>
            </p>
          </div>
        </div>
      ),
    },
    { title: "Size", dataIndex: "size" },
    { title: "Type", dataIndex: "type" },
    {
      title: "Modified",
      dataIndex: "modified",
      render: (text) => {
        const [date, time] = text.split(" ");
        return (
          <>
            <p className="text-dark mb-0">{date}</p>
            <span>{time}</span>
          </>
        );
      },
    },
    {
      title: "Share",
      dataIndex: "shared",
      render: (shared) => (
        <div className="avatar-list-stacked avatar-group-sm">
          {shared.map((avatar, index) => (
            <Avatar
              key={index}
              src={`assets/img/profiles/${avatar}`}
              className="avatar avatar-rounded"
            />
          ))}
          {shared.length > 3 && (
            <Avatar className="avatar bg-primary avatar-rounded text-fixed-white">
              +1
            </Avatar>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "starred",
      render: (starred, record) => (
        <div className="d-flex align-items-center">
          <div className="rating-select me-2">
            <a href="javascript:void(0);">
              {starred ? (
                <StarFilled className="ti ti-star-filled filled text-warning" />
              ) : (
                <StarOutlined className="ti ti-star" />
              )}
            </a>
          </div>
          <Dropdown overlay={fileActionMenu}>
            <a
              href="#"
              className="d-flex align-items-center justify-content-center"
            >
              <MoreOutlined className="ti ti-dots fs-14" />
            </a>
          </Dropdown>
        </div>
      ),
    },
  ];

  // Render loading state
  if (isLoading) {
    return (
      <div className="content">
        <PageHeader />
        <div className="card">
          <div className="card-body">Loading content...</div>
        </div>
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className="content">
        <PageHeader />
        <div className="card">
          <div className="card-body">
            Error fetching content:{" "}
            {error?.data?.error || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <PageHeader />

      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
        <div className="mb-2">
          <Dropdown overlay={fileFilterMenu}>
            <Button className="dropdown-toggle btn btn-sm btn-outline-white bg-white text-dark d-inline-flex align-items-center drop-arrow-none">
              All Files{" "}
              <DownOutlined className="ti ti-chevron-down align-middle ms-1" />
            </Button>
          </Dropdown>
        </div>
        <div className="mb-2">
          <Button
            type="primary"
            className="btn btn-sm btn-primary d-flex align-items-center"
            onClick={() => setIsModalVisible(true)}
            icon={<PlusCircleOutlined className="ti ti-circle-plus me-1" />}
          >
            Create Folder
          </Button>
        </div>
      </div>

      <div className="row">
        {storageData.map((storage, index) => (
          <div key={index} className="col-lg-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center">
                    <img src={`assets/img/icons/${storage.icon}`} alt="img" />
                    <h5 className="fs-16 ms-2 mb-0">{storage.name}</h5>
                  </div>
                  <Dropdown overlay={storageActionMenu}>
                    <a
                      href="javascript:void(0);"
                      className="d-inline-flex align-items-center"
                    >
                      <MoreOutlined className="ti ti-dots" />
                    </a>
                  </Dropdown>
                </div>
                <Progress
                  percent={storage.progress}
                  showInfo={false}
                  className="progress progress-xs flex-grow-1 mb-2"
                  strokeColor={index % 2 === 0 ? "#ff69b4" : "#800080"}
                />
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">{storage.files} Files</p>
                  <p className="text-dark mb-0">{storage.size}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-xl-3 theiaStickySidebar">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <span className="avatar flex-shrink-0">
                      <img
                        src="assets/img/profiles/avatar-01.jpg"
                        alt="img"
                        className="rounded-circle"
                      />
                    </span>
                    <div className="overflow-hidden ms-2">
                      <h5 className="fs-16 text-truncate mb-1">James Hong</h5>
                      <p className="fs-13 text-truncate mb-0">
                        <a href="mailto:james.hong@example.com">
                          james.hong@example.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Upload
                action="/upload" // Replace with actual upload endpoint
                showUploadList={false}
                className="border rounded position-relative p-3 mb-3 text-center"
              >
                <span className="avatar avatar-sm bg-primary text-white mb-2">
                  <UploadOutlined className="ti ti-upload fs-16" />
                </span>
                <h6 className="mb-2">Drop files here</h6>
                <p className="fs-13 mb-0">Select files to upload</p>
              </Upload>
              <div className="files-list nav d-block">
                {[
                  {
                    name: "All Folder / Files",
                    icon: "ti ti-folder-up",
                    active: true,
                  },
                  { name: "Drive", icon: "ti ti-star" },
                  { name: "Dropbox", icon: "ti ti-octahedron" },
                  { name: "Shared with Me", icon: "ti ti-share-2" },
                  { name: "Document", icon: "ti ti-file" },
                  { name: "Recent File", icon: "ti ti-clock-hour-11" },
                  { name: "Important", icon: "ti ti-star" },
                  { name: "Media", icon: "ti ti-music" },
                ].map((item, index) => (
                  <a
                    key={index}
                    href="javascript:void(0);"
                    className={`d-flex align-items-center fw-medium p-2 ${
                      item.active ? "active" : ""
                    }`}
                  >
                    <i className={`${item.icon} me-2`} />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="card mb-3 mb-xl-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mb-2">
                <h6 className="mb-2">Storage Details</h6>
                <span className="badge bg-success mb-2">Used 77%</span>
              </div>
              {[
                {
                  type: "Music",
                  files: 35,
                  size: "8.5 GB",
                  icon: "ti ti-music",
                  color: "info",
                },
                {
                  type: "Video",
                  files: 145,
                  size: "2 GB",
                  icon: "ti ti-video",
                  color: "warning",
                },
                {
                  type: "Documents",
                  files: 487,
                  size: "24.5 GB",
                  icon: "ti ti-file-description",
                  color: "secondary",
                },
                {
                  type: "Photos",
                  files: 35,
                  size: "8.5 GB",
                  icon: "ti ti-photo",
                  color: "primary",
                },
                {
                  type: "Other",
                  files: 487,
                  size: "16.2 GB",
                  icon: "ti ti-file-type-doc",
                  color: "danger",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between mb-3"
                >
                  <div className="d-flex align-items-center overflow-hidden">
                    <span
                      className={`avatar avatar-md bg-${item.color}-subtle`}
                    >
                      <i className={`${item.icon} fs-20 text-${item.color}`} />
                    </span>
                    <div className="overflow-hidden ms-2">
                      <h6 className="text-truncate fs-14">{item.type}</h6>
                      <p className="fs-13 text-truncate mb-0">
                        {item.files} Files
                      </p>
                    </div>
                  </div>
                  <p className="text-dark mb-0">{item.size}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-xl-9">
          <div className="border-bottom mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-2">
                <a
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#preview"
                >
                  Quick Access
                </a>
              </h6>
              <div>
                <a
                  href="javascript:void(0);"
                  className="mb-2 fw-medium link-default"
                >
                  View All
                </a>
              </div>
            </div>
            <div className="row row-cols-xxl-5 row-cols-xl-3 row-cols-sm-3 row-cols-1 justify-content-center">
              {quickAccessData.map((item, index) => (
                <div key={index} className="col d-flex">
                  <div className="card position-relative flex-fill">
                    <div className="card-body text-center">
                      <img
                        src={`assets/img/icons/${item.icon}`}
                        alt="img"
                        className="mb-3"
                      />
                      <h6 className="mb-2 fw-medium">
                        <a
                          href="#"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#preview"
                        >
                          {item.name}
                        </a>
                      </h6>
                      <span className="badge badge-soft-primary">
                        {item.size}
                      </span>
                    </div>
                    <span className="position-absolute end-0 top-0 p-2">
                      {item.starred ? (
                        <StarFilled className="ti ti-star-filled filled text-warning" />
                      ) : (
                        <StarOutlined className="ti ti-star" />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-bottom mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-2">
                <a
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#preview"
                >
                  Recent Folders
                </a>
              </h6>
              <Dropdown overlay={recentFilterMenu}>
                <Button className="dropdown-toggle btn btn-sm btn-outline-white bg-white text-dark d-inline-flex align-items-center drop-arrow-none">
                  Last 7 Days{" "}
                  <DownOutlined className="ti ti-chevron-down align-middle ms-1" />
                </Button>
              </Dropdown>
            </div>
            <div className="row">
              {recentFoldersData.map((folder, index) => (
                <div key={index} className="col-lg-4 col-md-6 d-flex">
                  <div className="bg-white d-flex align-items-center justify-content-between border p-2 rounded mb-3 flex-fill">
                    <div className="d-flex align-items-center">
                      <FolderFilled className="text-warning fs-24 ti ti-folder-filled" />
                      <div className="ms-2">
                        <h6 className="mb-1">
                          <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            {folder.name}
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <p className="fs-12 mb-0 me-1">{folder.size}</p>
                          <p className="fs-12 mb-0 d-flex align-items-center">
                            <i className="ti ti-circle-filled fs-7 me-1 text-dark" />
                            {folder.files} files
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="avatar-list-stacked avatar-group-sm">
                        {folder.avatars.map((avatar, i) => (
                          <Avatar
                            key={i}
                            src={`assets/img/profiles/${avatar}`}
                            className="avatar avatar-rounded"
                          />
                        ))}
                      </div>
                      <Dropdown overlay={folderActionMenu}>
                        <a
                          href="javascript:void(0);"
                          className="d-inline-flex align-items-center ms-2"
                        >
                          <MoreOutlined className="ti ti-dots" />
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-bottom mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2 table-header">
              <h6 className="mb-2">
                <a
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#preview"
                >
                  Recent Files
                </a>
              </h6>
              <Dropdown overlay={recentFilterMenu}>
                <Button className="dropdown-toggle btn btn-sm bg-white text-dark btn-outline-white drop-arrow-none">
                  Last Modified{" "}
                  <DownOutlined className="ti ti-chevron-down align-middle ms-1" />
                </Button>
              </Dropdown>
            </div>
            <div className="row">
              {[
                {
                  name: "customer_data.txt",
                  icon: FileTextOutlined,
                  iconClass: "ti ti-file-description",
                },
                {
                  name: "video_player_installer_setup.rar",
                  icon: FilePdfOutlined,
                  iconClass: "ti ti-file-type-pdf",
                },
                {
                  name: "recording.mp3",
                  icon: AudioOutlined,
                  iconClass: "ti ti-headphones",
                },
              ].map((file, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="rounded border mb-3">
                    <div className="bg-light p-5 d-flex align-items-center justify-content-center rounded-top">
                      <file.icon
                        className={`${file.iconClass} fs-24 text-dark`}
                      />
                    </div>
                    <div className="bg-white d-flex align-items-center justify-content-between p-3 rounded-bottom">
                      <h6 className="fw-medium text-truncate mb-0">
                        <a
                          href="#"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#preview"
                        >
                          {file.name}
                        </a>
                      </h6>
                      <Dropdown overlay={folderActionMenu}>
                        <a
                          href="javascript:void(0);"
                          className="d-inline-flex align-items-center ms-2"
                        >
                          <MoreOutlined className="ti ti-dots" />
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <h6 className="mb-0">Files</h6>
            <div className="d-flex align-items-center">
              <Dropdown overlay={filesSortMenu}>
                <Button className="dropdown-toggle btn bg-white text-dark btn-sm btn-outline-white drop-arrow-none">
                  Sort By : Docs Type{" "}
                  <DownOutlined className="ti ti-chevron-down align-middle ms-1" />
                </Button>
              </Dropdown>
              <a
                href="javascript:void(0);"
                className="link-primary fw-medium ms-2"
              >
                View All
              </a>
            </div>
          </div>

          <div className="table-responsive table-nowrap">
            <Table
              columns={columns}
              dataSource={filesData}
              pagination={false}
              className="table table-nowrap border"
            />
          </div>
        </div>
      </div>

      {/* Modal for Creating Folder */}
      <Modal
        title="Create Folder"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="modal fade"
        wrapClassName="modal-dialog"
        style={{ top: 20 }}
      >
        <div className="modal-content">
          <div className="modal-body">
            <Form onFinish={handleCreateFolder}>
              <Form.Item
                label="Folder Name"
                name="folderName"
                rules={[{ required: true, message: "Folder name is required" }]}
              >
                <Input
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  className="form-control"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="btn btn-primary"
                loading={isCreating}
              >
                {isCreating ? "Creating..." : "Create Folder"}
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Content;
