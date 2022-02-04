import { ReactNode } from "react";
import { Redirect, Route } from "react-router";

type PrivateRouteProps = { path: string; isLogged: boolean; children: ReactNode };

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { path, children, isLogged } = props;

  return (
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
};

export default PrivateRoute;
