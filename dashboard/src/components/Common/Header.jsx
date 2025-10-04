import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext"; // adjust path
import logo from "../../assets/img/logo.jpeg";
import Avatar from "react-avatar"; // Import react-avatar
import { Dropdown, Menu } from "antd"; // Import AntD Dropdown and Menu
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons"; // AntD icons

const Header = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Define the dropdown menu using AntD's Menu component
  const menu = (
    <Menu className="p-2" style={{ minWidth: 200 }}>
      <Menu.ItemGroup
        title={
          <div className="d-flex align-items-center bg-light rounded-3 p-2 mb-2">
            <Avatar
              src={authState.user?.avatar} // Use avatar URL if available
              name={authState.user?.name || "Guest User"} // Fallback to name
              email={authState.user?.email} // Optional: use email for avatar generation
              size="42" // Match the original width/height
              round={true} // Rounded avatar to match original styling
              className="rounded-circle"
              alt="user-image"
            />
            <div className="ms-2">
              <p className="fw-medium text-dark mb-0">
                {authState.user?.name || "Guest User"}
              </p>
              <span className="d-block fs-13">
                {authState.user?.role || "Role"}
              </span>
            </div>
          </div>
        }
      />
      <Menu.Item key="profile" onClick={() => navigate("/profile-settings")}>
        <UserOutlined className="me-1" />
        Profile Settings
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => navigate("/settings")}>
        <SettingOutlined className="me-1" />
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout} danger>
        <LogoutOutlined className="me-1" />
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="navbar-header">
      <div className="page-container topbar-menu">
        <div className="d-flex align-items-center gap-2">
          <a href="/" className="logo">
            <span className="logo-light">
              <span className="logo-lg">
                <img src={logo} alt="logo" />
              </span>
              <span className="logo-sm">
                <img src={logo} alt="small logo" />
              </span>
            </span>

            <span className="logo-dark">
              <span className="logo-lg">
                <img src={logo} alt="dark logo" />
              </span>
            </span>
          </a>

          <a id="mobile_btn" className="mobile-btn" href="#sidebar">
            <i className="ti ti-menu-deep fs-24"></i>
          </a>

          <button
            className="sidenav-toggle-btn btn border-0 p-0"
            id="toggle_btn2"
          >
            <i className="ti ti-arrow-bar-to-right"></i>
          </button>
        </div>

        <div className="d-flex align-items-center">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="dropdown-menu-md"
            overlayStyle={{ paddingTop: 8 }}
          >
            <a
              href="#!"
              className="topbar-link position-relative"
              onClick={(e) => e.preventDefault()}
            >
              <Avatar
                src={authState.user?.avatar} // Use avatar URL if available
                name={authState.user?.name || "Guest User"} // Fallback to name
                email={authState.user?.email} // Optional: use email for avatar generation
                size="38" // Match the original width
                round={true} // Rounded avatar to match original styling
                className="d-flex"
                alt="user-image"
              />
              <span className="online text-success">
                <i className="ti ti-circle-filled d-flex bg-white rounded-circle border border-1 border-white"></i>
              </span>
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
