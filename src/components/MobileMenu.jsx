import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <MenuOutlined
        className="mobile-menu-icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && <div className="mobile-menu"></div>}
    </div>
  );
}

export default MobileMenu;
