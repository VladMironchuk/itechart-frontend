import React from "react";
import "./header.scss";
import NavBar from "./navbar/navbar";

const Header: React.FC = () => (
  <header className="header">
    <h1 className="header__title">Game Store</h1>
    <NavBar />
  </header>
);

export default Header;
