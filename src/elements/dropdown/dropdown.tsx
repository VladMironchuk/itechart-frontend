import { useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Link from "../navlink/link";
import "./dropdown.scss";

const Dropdown: React.FC = () => {
  const [isDropdownVibisble, setIsDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  useOnClickOutside(dropdownRef, () => {
    setIsDropdownVisible(() => false);
  });

  return (
    <div ref={dropdownRef} className="dropdown">
      <button type="button" className={`dropdown__default ${isDropdownVibisble && "active_title"}`} onClick={onClick}>
        Products
      </button>
      {isDropdownVibisble && (
        <div className="dropdown__list">
          <ul>
            <Link linkPath="/products/pc" linkText="PC" />
            <Link linkPath="/products/ps" linkText="PS" />
            <Link linkPath="/products/xbox" linkText="XBox" />
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
