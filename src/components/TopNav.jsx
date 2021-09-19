import { useState } from "react";
import { withRouter } from "react-router-dom";

const TopNav = (props) => {
  const [scroll, setScroll] = useState(0);

  window.onscroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <div className="top-nav">
      <div
        className={
          scroll < 130
            ? "opacity-zero small-logo-container"
            : "small-logo-container"
        }
      >
        <img
          src="../img/30seconds-logo.png"
          alt="30seconds logo"
          className="logo"
        />

        <h3>Buy and sell in 30 seconds!</h3>
      </div>

      <div className="top-nav-menu-container">
        <a href="/">
          <span className="menu-item">Home</span>
        </a>
        <a href="/post-video">
          <span className="menu-item">Post your video</span>
        </a>

        {props.isLoggedin ? (
          <span
            className="menu-item"
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.reload(false);
            }}
          >
            Logout
          </span>
        ) : (
          <span
            className="menu-item"
            onClick={() => props.history.push("/login")}
          >
            Login
          </span>
        )}
      </div>
    </div>
  );
};

export default withRouter(TopNav);
