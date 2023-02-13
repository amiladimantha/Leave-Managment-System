import "./sidebar.css";
import {
  HomeOutlined,
  FileAddOutlined,
  FileMarkdownOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
// import Pages from "../../pages/index"
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">

            <NavLink to="/users/staff" className="link">
            <li className="sidebarListItem">
              <HomeOutlined className="iconStyle"/>
              Home
            </li>
            </NavLink>
          
            <NavLink to="/users/staff/applyleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <FileAddOutlined className="iconStyle"/>
              Apply Leave
            </li>
            </NavLink>

            <NavLink to="/users/staff/extraleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <AppstoreAddOutlined className="iconStyle"/>
              Apply Extra Leave
            </li>
            </NavLink>

            <NavLink to="/users/staff/myleaves" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <FileMarkdownOutlined className="iconStyle"/>
              My Leaves
            </li>
            </NavLink>

            <NavLink to="/users/staff/edituser" className="link" activeClassName="active">
            <li className="sidebarListItem">
              <SettingOutlined className="iconStyle"/>
              Profile Settings
            </li>
            </NavLink> 

            <NavLink to="/" className="link" >
            <li className="sidebarListItem" >
            <LogoutOutlined className="iconStyle"/>
              Logout
            </li>
            </NavLink>       
          </ul>
        </div>
      </div>
    </div>
  );
}
