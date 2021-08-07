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
          scroll < 150
            ? "opacity-zero small-logo-container"
            : "small-logo-container"
        }
      >
        <img
          src="../img/30seconds-logo.png"
          alt="30seconds logo"
          className="logo"
        />

        <h3>Buy and sale in 30 seconds!</h3>
      </div>

      <div className="top-nav-menu-container">
        <span className="menu-item" onClick={() => props.history.push("/")}>
          Home
        </span>
        <span
          className="menu-item"
          onClick={() => props.history.push("/post-video")}
        >
          Post your video
        </span>
        <span
          className="menu-item"
          onClick={() => props.history.push("/login")}
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default withRouter(TopNav);
