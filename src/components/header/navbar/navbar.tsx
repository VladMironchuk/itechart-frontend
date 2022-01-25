import "./navbar.scss";
import React, { useContext } from "react";
import Link from "@/elements/navlink/navlink";
import Dropdown from "@/elements/dropdown/dropdown";
import AppContext from "@/context/context";
import profileLogo from "@/assets/images/profile.png";
import cartLogo from "@/assets/images/cart.png";
import logoutLogo from "@/assets/images/logout.png";

const NavBar: React.FC = () => {
  const { toggleSignIn, toggleSignUp, isLogged, toggleLogging } = useContext(AppContext);

  return (
    <nav className="header__nav">
      <ul className="header__nav__ul">
        <Link linkPath="/" linkText="Home" />
        <Dropdown />
        <Link linkPath="/about" linkText="About" />
        {!isLogged && (
          <>
            <li>
              <button type="button" onClick={toggleSignIn}>
                Sign In
              </button>
            </li>
            <li>
              <button type="button" onClick={toggleSignUp}>
                Sign Up
              </button>
            </li>
          </>
        )}
        {isLogged && (
          <>
            <div className="profile">
              <img className="logo" src={profileLogo} alt="profile-icon" />
              <Link linkPath="/profile" linkText="User Name" />
            </div>
            <li>
              <img className="logo" src={cartLogo} alt="cart-logo" />0
            </li>
            <li>
              <button onClick={toggleLogging}>
                <img className="logo" src={logoutLogo} alt="logout-logo" />
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
