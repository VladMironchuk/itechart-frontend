import { ReactNode } from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute: React.FC<{ path: string; isLogged: boolean; children: ReactNode }> = ({
  path,
  children,
  isLogged,
}) => (
  <Route
    path={path}
    render={({ location }) =>
      isLogged ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
