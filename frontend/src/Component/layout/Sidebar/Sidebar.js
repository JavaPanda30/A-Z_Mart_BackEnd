import React, { useEffect, useState, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import * as CiIcons from 'react-icons/ci';
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [blur, setBlur] = useState(false);
  const ref = useRef();

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    setBlur(sidebar);
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSidebar(false);
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebar]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={blur ? "menu-bars-rem container" : "container"}>
          <div className="navbar">
            <div>
              {!sidebar && (
                <Link to="#" className="menu-bars">
                  <FaIcons.FaBars onClick={showSidebar} />
                </Link>
              )}
            </div>
            <div className="logo">
              <button className="login-btn">
                <AiIcons.AiOutlineShoppingCart />
              </button>
              <button className="login-btn">Login</button>
              <img src="assets/logo.png" alt="logo" />
            </div>
          </div>
        </div>
        <nav ref={ref} className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
