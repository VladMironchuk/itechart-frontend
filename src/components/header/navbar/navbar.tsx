import "./navbar.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "@/elements/navlink/link";
import Dropdown from "@/elements/dropdown/dropdown";
import profileLogo from "@/assets/images/profile.png";
import cartLogo from "@/assets/images/cart.png";
import logoutLogo from "@/assets/images/logout.png";
import { userState, userActions } from "@/redux/slices/user";
import SignInModal from "@/elements/modal/signInModal";
import SignUpModal from "@/elements/modal/signUpModal";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector((state: { user: userState }) => state.user.isLogged);
  const username = useSelector((state: { user: userState }) => state.user.username);

  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

  const toggleLogging = () => {
    dispatch(userActions.toggleLogging());
  };

  const onToggleSignInModal = () => {
    setIsSignInModalVisible((prevState) => !prevState);
  };

  const onToggleSignUpModal = () => {
    setIsSignUpModalVisible((prevState) => !prevState);
  };

  const navbarContent = isLogged ? (
    <>
      <div className="profile">
        <img className="logo" src={profileLogo} alt="profile-icon" />
        <Link linkPath="/profile" linkText={username} />
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
        <button onClick={onToggleSignInModal} type="button">
          Sign In
        </button>
      </li>
      <li>
        <button onClick={onToggleSignUpModal} type="button">
          Sign Up
        </button>
      </li>
    </>
  );

  useEffect(() => {
    if (document.location.hash === "#login") {
      onToggleSignInModal();
    }
  }, [document.location.hash]);

  return (
    <>
      {isSignInModalVisible && <SignInModal onClose={onToggleSignInModal} />}
      {isSignUpModalVisible && <SignUpModal onClose={onToggleSignUpModal} />}
      <nav className="header__nav">
        <ul className="header__nav__ul">
          <Link linkPath="/" linkText="Home" />
          <Dropdown />
          <Link linkPath="/about" linkText="About" />
          {navbarContent}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
