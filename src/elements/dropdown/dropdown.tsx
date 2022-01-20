import { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./dropdown.scss";

export const Dropdown = () => {
  const listRef = useRef<HTMLDivElement>(null)!;
  const titleRef = useRef<HTMLDivElement>(null)!;

  const clickHandler = () => {
    listRef.current?.classList.toggle("hidden");
    titleRef.current?.classList.toggle("active_title");
  };

  return (
    <div className="dropdown">
      <div ref={titleRef} className="dropdown__default" onClick={clickHandler}>
        Products
      </div>
      <div ref={listRef} className="dropdown__list hidden">
        <ul>
          <li>
            <NavLink to="/products/pc" exact>
              PC
            </NavLink>
          </li>
          <li>
            <NavLink to="/products/ps" exact>
              PS
            </NavLink>
          </li>
          <li>
            <NavLink to="/products/xbox" exact>
              XBox
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
