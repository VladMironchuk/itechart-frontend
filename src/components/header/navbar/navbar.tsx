import "./navbar.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "use-http";
import Link from "@/elements/navlink/link";
import Dropdown from "@/elements/dropdown/dropdown";
import profileLogo from "@/assets/images/profile.png";
import cartLogo from "@/assets/images/cart.png";
import logoutLogo from "@/assets/images/logout.png";
import { userState, userActions } from "@/redux/slices/user";
import { modalActions } from "@/redux/slices/modal";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { get } = useFetch();

  const isLogged = useSelector((state: { user: userState }) => state.user.isLogged);
  const login = useSelector((state: { user: userState }) => state.user.login);
  const username = useSelector((state: { user: userState }) => state.user.username);

  const onSignIn = () => {
    dispatch(modalActions.toggleSignIn());
  };

  const onSignUp = () => {
    dispatch(modalActions.toggleSignUp());
  };

  const toggleLogging = () => {
    dispatch(userActions.toggleLogging());
  };

  useEffect(() => {
    (async () => {
      const initUser = await get(`/api/getProfile/${login}`);
      dispatch(userActions.updateUsername({ username: initUser.username }));
    })();
  }, []);

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
