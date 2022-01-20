import { NavLink } from "react-router-dom";

export const Link: React.FC<{ linkText: string; linkPath: string }> = ({ linkText, linkPath }) => (
  <li>
    <NavLink className="header__nav__link" to={linkPath} exact>
      {linkText}
    </NavLink>
  </li>
);
