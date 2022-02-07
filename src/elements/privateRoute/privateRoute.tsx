import { ReactNode } from "react";
import { Redirect, Route } from "react-router";

type Props = { path: string; isLogged: boolean; children: ReactNode };

const PrivateRoute: React.FC<Props> = (props) => {
  const { path, children, isLogged } = props;

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
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
