import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppProps } from "@/redux/redux";

type Props = { linkText: string; linkPath: string; modalToggler?: () => void };

const Link: React.FC<Props> = (props) => {
  const { linkText, linkPath, modalToggler } = props;

  const isLogged = useSelector((state: { user: AppProps }) => state.user.isLogged);

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
