import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="mobile-menu-container">
      <MenuOutlined
        className="mobile-menu-icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>sdlf</li>
            <li>sdlf</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
