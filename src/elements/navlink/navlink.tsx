import { NavLink } from "react-router-dom";

const Link: React.FC<{ linkText: string; linkPath: string; isLogged?: boolean; cb?: () => void }> = ({
  linkText,
  linkPath,
  isLogged,
  cb,
}) => (
  <li>
    <NavLink
      onClick={() => {
        if (cb) {
          !isLogged && cb();
        }
      }}
      rel="noreferrer"
      className="header__nav__link"
      to={linkPath}
      exact
    >
      {linkText}
    </NavLink>
  </li>
);

export default Link;
