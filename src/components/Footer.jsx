import React from "react";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-white"></div>
      <div className="footer-nav">
        <a href="/">
          <span className="menu-item">Home</span>
        </a>
        <a href="/post-video">
          <span className="menu-item">Post Video</span>
        </a>
        <a href="https://no.linkedin.com/in/arvand-molla-a4a088213">
          <span className="menu-item">About Us</span>
        </a>
        <a href="https://no.linkedin.com/in/arvand-molla-a4a088213">
          <span className="menu-item">Contact Us</span>
        </a>
      </div>
      <div className="footer-green"></div>
    </div>
  );
}

export default Footer;
