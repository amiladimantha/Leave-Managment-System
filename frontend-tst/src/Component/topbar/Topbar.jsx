import React, { useState, useEffect } from "react";
import "./topbar.css";
import logo from "./logo.jpeg";
import { useNavigate } from "react-router-dom";
import { BellFilled, SettingFilled } from "@ant-design/icons";

export default function Topbar() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
                    <BellFilled />
                    <span className='topIconBadge'>2</span>
                </div>
                <div className="topbarIconContainer">
                    <SettingFilled />
                </div> */}
          <div className="topbarIconContainer">
            <label>{username}</label>
          </div>

          <img
            src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F12%2Fgame-of-thrones-kit-harington-teases-jon-snow-spinoff-series-tw.jpg?w=960&cbr=1&q=90&fit=max"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
