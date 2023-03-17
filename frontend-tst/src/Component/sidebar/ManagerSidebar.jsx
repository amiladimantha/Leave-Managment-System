import "./sidebar.css";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  FileAddOutlined,
  FileMarkdownOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function ManagerSidebar() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  function toggle() {
    setSidebarVisible(!sidebarVisible);
    const sidebar = document.querySelector('.sidebar');
  sidebar.style.width = !sidebarVisible ? '80px' : '250px';
  }

  return (
    <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
      <div className="sidebarWrapper">
        {!sidebarVisible && (
          <button onClick={toggle} style={{ border: "none", background: "none", paddingLeft: 20 }}>
          <CloseOutlined style={{ fontSize: 24, color: "#414141" }} />
        </button>
        )}

        <div className="sidebarwrappersecondary">
          {sidebarVisible && (
            <button onClick={toggle} className="sidebarSecondaryButton">
              {
                <MenuFoldOutlined
                  style={{
                    fontSize: 24,
                    color: "#0097E6",
                    transform: "rotate(180deg)",
                    padding: 5,
                  }}
                />
              }
            </button>
          )}
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <NavLink to="/users/manager" className="link">
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <HomeOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Home</span>}
                </div>
                {sidebarVisible && <HomeOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/manager/users"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <UserOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Users</span>}
                </div>
                {sidebarVisible && <UserOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/manager/leaves"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <ProfileOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Leave</span>}
                </div>
                {sidebarVisible && <ProfileOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/manager/extraleaves"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <ProfileOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Extra Leave</span>}
                </div>
                {sidebarVisible && <ProfileOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/manager/applyleaves"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <FileAddOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Apply Leave</span>}
                </div>
                {sidebarVisible && <FileAddOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink
              to="/users/manager/applyextraleaves"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && (
                    <AppstoreAddOutlined className="iconStyle" />
                  )}
                  {!sidebarVisible && (
                    <span className="text">Apply Extra Leave</span>
                  )}
                </div>
                {sidebarVisible && (
                  <AppstoreAddOutlined className="iconStyle" />
                )}
              </li>
            </NavLink>
            <NavLink
              to="/users/manager/myleaves"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && (
                    <FileMarkdownOutlined className="iconStyle" />
                  )}
                  {!sidebarVisible && <span className="text">My Leaves</span>}
                </div>
                {sidebarVisible && (
                  <FileMarkdownOutlined className="iconStyle" />
                )}
              </li>
            </NavLink>
            <NavLink
              to="/users/manager/edituser"
              className="link"
              activeClassName="active"
            >
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <SettingOutlined className="iconStyle" />}
                  {!sidebarVisible && (
                    <span className="text">Profile Settings</span>
                  )}
                </div>
                {sidebarVisible && <SettingOutlined className="iconStyle" />}
              </li>
            </NavLink>
            <NavLink to="/" className="link">
              <li
                className={`sidebarListItem ${
                  !sidebarVisible ? "" : "iconOnly"
                }`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  {!sidebarVisible && <LogoutOutlined className="iconStyle" />}
                  {!sidebarVisible && <span className="text">Logout</span>}
                </div>
                {sidebarVisible && <LogoutOutlined className="iconStyle" />}
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
