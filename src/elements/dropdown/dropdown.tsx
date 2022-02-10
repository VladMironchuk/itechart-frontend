import { useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Link from "../navlink/navlink";
import "./dropdown.scss";

type Props = { modalToggler: () => void };

const Dropdown: React.FC<Props> = (props) => {
  const { modalToggler } = props;

  const [isDropdownVibisble, toggleDropdownVisibility] = useState(false);

  const productsNavLinkRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    productsNavLinkRef.current?.classList.toggle("active_title");
    toggleDropdownVisibility((prevState) => !prevState);
  };

  useOnClickOutside(dropdownRef, () => {
    toggleDropdownVisibility(() => false);
    productsNavLinkRef.current?.classList.remove("active_title");
  });

  return (
    <div ref={dropdownRef} className="dropdown">
      <button ref={productsNavLinkRef} type="button" className="dropdown__default" onClick={clickHandler}>
        Products
      </button>
      {isDropdownVibisble && (
        <div className="dropdown__list">
          <ul>
            <Link linkPath="/products/pc" linkText="PC" modalToggler={modalToggler} />
            <Link linkPath="/products/pc" linkText="PS" modalToggler={modalToggler} />
            <Link linkPath="/products/pc" linkText="XBox" modalToggler={modalToggler} />
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
