import "./navbar.scss";
import React, { useContext } from "react";
import Link from "@/elements/navlink/navlink";
import Dropdown from "@/elements/dropdown/dropdown";
import AppContext from "@/context/context";
import profileLogo from "@/assets/images/profile.png";
import cartLogo from "@/assets/images/cart.png";
import logoutLogo from "@/assets/images/logout.png";

type NavbarProps = { signInHandler: () => void; signUpHandler: () => void };

const NavBar: React.FC<NavbarProps> = (props) => {
  const { signInHandler, signUpHandler } = props;

  const { isLogged, toggleLogging, login } = useContext(AppContext);

  const navbarContent = isLogged ? (
    <>
      <div className="profile">
        <img className="logo" src={profileLogo} alt="profile-icon" />
        <Link linkPath="/profile" linkText={login} />
      </div>
      <li>
        <img className="logo" src={cartLogo} alt="cart-logo" />0
      </li>
      <li>
        <button type="button" onClick={toggleLogging}>
          <img className="logo" src={logoutLogo} alt="logout-logo" />
        </button>
      </li>
    </>
  ) : (
    <>
      <li>
        <button type="button" onClick={signInHandler}>
          Sign In
        </button>
      </li>
      <li>
        <button type="button" onClick={signUpHandler}>
          Sign Up
        </button>
      </li>
    </>
  );

  return (
    <nav className="header__nav">
      <ul className="header__nav__ul">
        <Link linkPath="/" linkText="Home" />
        <Dropdown modalToggler={signInHandler} />
        <Link linkPath="/about" linkText="About" modalToggler={signInHandler} />
        {navbarContent}
      </ul>
    </nav>
  );
};

export default NavBar;
