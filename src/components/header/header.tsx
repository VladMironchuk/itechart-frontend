import React from "react";
import "./header.scss";
import NavBar from "./navbar/navbar";

type Props = { signInHandler: () => void; signUpHandler: () => void };

const Header: React.FC<Props> = (props) => {
  const { signInHandler, signUpHandler } = props;

  return (
    <header className="header">
      <h1 className="header__title">Game Store</h1>
      <NavBar signInHandler={signInHandler} signUpHandler={signUpHandler} />
    </header>
  );
};

export default Header;
