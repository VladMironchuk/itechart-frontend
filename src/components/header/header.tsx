import React from "react";
import "./header.scss";
import NavBar from "./navbar/navbar";

const Header: React.FC<{ signInHandler: () => void; signUpHandler: () => void }> = ({
  signInHandler,
  signUpHandler,
}) => (
  <header className="header">
    <h1 className="header__title">Game Store</h1>
    <NavBar signInHandler={signInHandler} signUpHandler={signUpHandler} />
  </header>
);

export default Header;
