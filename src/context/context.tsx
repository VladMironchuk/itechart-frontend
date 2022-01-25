import React from "react";

export type IAppContext = {
  isSignInVisible: boolean;
  toggleSignIn: () => void;
  isSignUpVisible: boolean;
  toggleSignUp: () => void;
  isLogged: boolean;
  toggleLogging: () => void;
};

const AppContext = React.createContext<IAppContext>({
  isSignInVisible: false,
  toggleSignIn: () => {},
  isSignUpVisible: false,
  toggleSignUp: () => {},
  isLogged: false,
  toggleLogging: () => {},
});

export default AppContext;
