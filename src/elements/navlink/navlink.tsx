import { NavLink } from "react-router-dom";

const Link: React.FC<{ linkText: string; linkPath: string }> = ({ linkText, linkPath }) => (
  <li>
    <NavLink rel="noreferrer" className="header__nav__link" to={linkPath} exact>
      {linkText}
    </NavLink>
  </li>
);

export default Link;
