import { MouseEventHandler, useRef, useState } from "react";
import Link from "../navlink/navlink";
import "./dropdown.scss";

type DropdownProps = { modalToggler: () => void };

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { modalToggler } = props;

  const [isDropdownVibisble, toggleDropdownVisibility] = useState(false);

  const productsNavLinkRef = useRef<HTMLButtonElement>(null);

  const clickHandler: MouseEventHandler = () => {
    productsNavLinkRef.current?.classList.toggle("active_title");
    toggleDropdownVisibility((prevState) => !prevState);
  };

  return (
    <div className="dropdown">
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
