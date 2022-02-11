import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { userState } from "@/redux/slices/user";

type Props = { path: string; children: ReactNode };

const PrivateRoute: React.FC<Props> = (props) => {
  const { path, children } = props;

  const isLogged = useSelector((state: { user: userState }) => state.user.isLogged);

  return (
    <Route
      path={path}
      render={({ location }) => {
        console.log(location);
        return isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "#login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
