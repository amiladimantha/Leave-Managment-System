import "./sidebar.css";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  FileAddOutlined,
  FileMarkdownOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function ManagerSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
          <Link to="/users/manager" className="link">
            <li className="sidebarListItem">
              <HomeOutlined className="iconStyle"/>
              Home
            </li>
            </Link>
            <Link to="/users/manager/users" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <UserOutlined className="iconStyle"/>
              Users
            </li>
            </Link>
            <Link to="/users/manager/leaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <ProfileOutlined className="iconStyle"/>
              Leaves
            </li>
            </Link>
            <Link to="/users/manager/extraleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <ProfileOutlined className="iconStyle"/>
              Extra Leaves
            </li>
            </Link>
            <Link to="/users/manager/applyleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <FileAddOutlined className="iconStyle"/>
              Apply Leave
            </li>
            </Link>
            <Link to="/users/manager/applyextraleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <AppstoreAddOutlined className="iconStyle"/>
              Apply Extra Leave
            </li>
            </Link>
            <Link to="/users/manager/myleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <FileMarkdownOutlined className="iconStyle"/>
              My Leaves
            </li>
            </Link>
            <Link to="/users/manager/edituser" className="link" activeClassName="active">
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
