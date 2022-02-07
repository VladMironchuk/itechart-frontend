import "./navbar.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "@/elements/navlink/link";
import Dropdown from "@/elements/dropdown/dropdown";
import profileLogo from "@/assets/images/profile.png";
import cartLogo from "@/assets/images/cart.png";
import logoutLogo from "@/assets/images/logout.png";
import { AppProps, userActions } from "@/redux/redux";

type Props = { signInHandler: () => void; signUpHandler: () => void };

const NavBar: React.FC<Props> = (props) => {
  const { signInHandler, signUpHandler } = props;

  const dispatch = useDispatch();

  const isLogged = useSelector((state: { user: AppProps }) => state.user.isLogged);

  const login = useSelector((state: { user: AppProps }) => state.user.login);

  const toggleLogging = () => {
    dispatch(userActions.toggleLogging());
  };

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
