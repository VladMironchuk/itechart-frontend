import { useRef } from "react";
import Link from "../navlink/navlink";
import "./dropdown.scss";

const Dropdown: React.FC<{ isLogged: boolean; cb: () => void }> = ({ isLogged, cb }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLButtonElement>(null);

  const clickHandler = () => {
    listRef.current?.classList.toggle("hidden");
    titleRef.current?.classList.toggle("active_title");
  };

  return (
    <div className="dropdown">
      <button ref={titleRef} type="button" className="dropdown__default" onClick={clickHandler}>
        Products
      </button>
      <div ref={listRef} className="dropdown__list hidden">
        <ul>
          <Link linkPath="/products/pc" linkText="PC" isLogged={isLogged} cb={cb} />
          <Link linkPath="/products/pc" linkText="PS" isLogged={isLogged} cb={cb} />
          <Link linkPath="/products/pc" linkText="XBox" isLogged={isLogged} cb={cb} />
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
