import React from "react";
import { BiLogoPlayStore } from "react-icons/bi";
import { GrDownload } from "react-icons/gr";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

function Footer({ isSidebarActive }) {
  return (
    <div id="footer" className={isSidebarActive ? "blur" : ""}>
      <div className="left-footer">
        <h3>Download the App Now</h3>
        <div className="app-icons">
          <BiLogoPlayStore />
          <GrDownload />
        </div>
      </div>
      <div className="mid-footer">
        <h1>AZ Mart</h1>
        <p>Explore Everything, Find Anything, Only at AZ Mart!</p>
        <p> &copy; Made with ❤️ By Suyash</p>
      </div>
      <div className="right-footer">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
