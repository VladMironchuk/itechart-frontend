import { useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Link from "../navlink/link";
import "./dropdown.scss";

type Props = { modalToggler: () => void };

const Dropdown: React.FC<Props> = (props) => {
  const { modalToggler } = props;

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
            <Link linkPath="/products/pc" linkText="PC" modalToggler={modalToggler} />
            <Link linkPath="/products/ps" linkText="PS" modalToggler={modalToggler} />
            <Link linkPath="/products/xbox" linkText="XBox" modalToggler={modalToggler} />
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
