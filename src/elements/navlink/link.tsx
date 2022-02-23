import { NavLink } from "react-router-dom";

type Props = { linkText: string; linkPath: string; modalToggler?: () => void };

const Link: React.FC<Props> = (props) => {
  const { linkText, linkPath } = props;

  return (
    <li>
      <NavLink rel="noreferrer" className="header__nav__link" to={linkPath} exact>
        {linkText}
      </NavLink>
    </li>
  );
};

export default Link;
