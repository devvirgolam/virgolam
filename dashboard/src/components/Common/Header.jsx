import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import logo from "../../assets/img/logo.jpeg";
import Avatar from "react-avatar";
import { Dropdown, Menu, Spin } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Header = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menu = (
    <Menu className="p-2" style={{ minWidth: 200 }}>
      <Menu.ItemGroup
        title={
          <div className="d-flex align-items-center bg-light rounded-3 p-2 mb-2">
            <Avatar
              src={authState.user?.avatar}
              name={authState.user?.name || "Guest User"}
              email={authState.user?.email}
              size="42"
              round={true}
              className="rounded-circle"
              alt="user-image"
            />
            <div className="ms-2">
              <p className="fw-medium text-dark mb-0">
                {authState.user?.name || "Guest User"}
              </p>
              <span className="d-block fs-13">
                {authState.user?.role?.name || "Role"}
              </span>
            </div>
          </div>
        }
      />
      <Menu.Item
        key="profile"
        onClick={() => navigate(`/u/${authState.user?.id}`)}
      >
        <UserOutlined className="me-1" />
        Profile
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout} danger>
        <LogoutOutlined className="me-1" />
        Sign Out
      </Menu.Item>
    </Menu>
  );

  if (!authState.user && authState.accessToken) {
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
            <Spin size="small" />
          </div>
        </div>
      </header>
    );
  }

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
                src={authState.user?.avatar}
                name={authState.user?.name || "Guest User"}
                email={authState.user?.email}
                size="38"
                round={true}
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
