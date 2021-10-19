import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

function MobileMenu({ isLoggedin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="mobile-menu-container">
      {isMenuOpen ? (
        <CloseOutlined
          className="mobile-menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      ) : (
        <MenuOutlined
          className="mobile-menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      )}
      {isMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/post-video">Post Your Video</a>
            </li>

            {isLoggedin ? (
              <li
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  window.location.reload(false);
                }}
              >
                <a>Logout</a>
              </li>
            ) : (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
