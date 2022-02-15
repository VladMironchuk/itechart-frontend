import "./navbar.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "@/elements/navlink/link";
import Dropdown from "@/elements/dropdown/dropdown";
import profileLogo from "@/assets/images/profile.png";
import cartLogo from "@/assets/images/cart.png";
import logoutLogo from "@/assets/images/logout.png";
import { userState, userActions } from "@/redux/slices/user";
import { modalActions } from "@/redux/slices/modal";
import { NavLink } from "react-router-dom";
import { CartState } from "@/redux/slices/cart";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector((state: { user: userState }) => state.user.isLogged);
  const username = useSelector((state: { user: userState }) => state.user.username);
  const cartTotalAmount = useSelector((state: { cart: CartState }) => state.cart.totalAmount);

  const onSignIn = () => {
    console.log("clicked");
    dispatch(modalActions.toggleSignIn());
  };

  const onSignUp = () => {
    dispatch(modalActions.toggleSignUp());
  };

  const toggleLogging = () => {
    dispatch(userActions.toggleLogging());
  };

  const navbarContent = isLogged ? (
    <>
      <div className="profile">
        <img className="logo" src={profileLogo} alt="profile-icon" />
        <Link linkPath="/profile" linkText={username} />
      </div>
      <li>
        <NavLink to="/cart">
          <img className="logo" src={cartLogo} alt="cart-logo" />
          {`${cartTotalAmount}$`}
        </NavLink>
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
        <button type="button" onClick={onSignIn}>
          Sign In
        </button>
      </li>
      <li>
        <button type="button" onClick={onSignUp}>
          Sign Up
        </button>
      </li>
    </>
  );

  return (
    <nav className="header__nav">
      <ul className="header__nav__ul">
        <Link linkPath="/" linkText="Home" />
        <Dropdown modalToggler={onSignIn} />
        <Link linkPath="/about" linkText="About" modalToggler={onSignIn} />
        {navbarContent}
      </ul>
    </nav>
  );
};

export default NavBar;
