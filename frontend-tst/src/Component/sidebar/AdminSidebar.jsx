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
  UserAddOutlined
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AdminSidebar() {

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
          <Link to="/users/admin" className="link" activeClassName="active">
  <li className="sidebarListItem">
    <HomeOutlined className="iconStyle" />
    Home
  </li>
</Link>

            <Link to="/users/admin/users" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <UserOutlined className="iconStyle"/>
              Users
            </li>
            </Link>
            <Link to="/users/admin/adduser" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <UserAddOutlined className="iconStyle"/>
              Add User
            </li>
            </Link>
            <Link to="/users/admin/leaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <ProfileOutlined className="iconStyle"/>
              Leaves
            </li>
            </Link>
            <Link to="/users/admin/extraleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <ProfileOutlined className="iconStyle"/>
              Extra Leaves
            </li>
            </Link>
            <Link to="/users/admin/applyleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <FileAddOutlined className="iconStyle"/>
              Apply Leave
            </li>
            </Link>
            <Link to="/users/admin/applyextraleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <AppstoreAddOutlined className="iconStyle"/>
              Apply Extra Leave
            </li>
            </Link>
            <Link to="/users/admin/myleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <FileMarkdownOutlined className="iconStyle"/>
              My Leaves
            </li>
            </Link>
            <Link to="/users/admin/edituser" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <SettingOutlined className="iconStyle"/>
              Profile Settings
            </li>
            </Link> 
            <Link to="/" className="link" >
            <li className="sidebarListItem" >
            <LogoutOutlined className="iconStyle"/>
              Logout
            </li>
            </Link>       
          </ul>
        </div>
      </div>
    </div>
  );
}
