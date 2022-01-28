import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "@/context/context";

type LinkProps = { linkText: string; linkPath: string; modalToggler?: () => void };

const Link: React.FC<LinkProps> = (props) => {
  const { linkText, linkPath, modalToggler } = props;

  const { isLogged } = useContext(AppContext);

  return (
    <li>
      <NavLink
        onClick={() => {
          if (modalToggler) {
            !isLogged && modalToggler();
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
};

export default Link;
