import "./header.scss";
import { NavBar } from "./navbar/navbar";

export function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Game Store</h1>
      <NavBar />
    </header>
  );
}
