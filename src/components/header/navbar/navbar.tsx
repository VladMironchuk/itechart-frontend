import "./navbar.scss";
import { Link } from "../../../elements/navlink/navlink";
import { Dropdown } from "@/elements/dropdown/dropdown";

export function NavBar() {
  return (
    <nav className="header__nav">
      <ul className="header__nav__ul">
        <Link linkPath="/" linkText="Home" />
        <Dropdown />
        <Link linkPath="/about" linkText="About" />
        <Link linkPath="/auth" linkText="Sign In" />
      </ul>
    </nav>
  );
}
