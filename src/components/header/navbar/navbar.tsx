import "./navbar.scss";
import React, { useContext } from "react";
import Link from "@/elements/navlink/navlink";
import Dropdown from "@/elements/dropdown/dropdown";
import AppContext from "@/context/context";

const NavBar: React.FC = () => {
  const { setIsVisible } = useContext(AppContext);

  return (
    <nav className="header__nav">
      <ul className="header__nav__ul">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link linkPath="/" linkText="Home" />
        <Dropdown />
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link linkPath="/about" linkText="About" />
        <li>
          <button type="button" onClick={setIsVisible}>
            Sign In
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
