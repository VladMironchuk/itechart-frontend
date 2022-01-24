import React from "react";

const AppContext = React.createContext<{
  isSignInVisible: boolean;
  toggleSignIn: () => void;
  isSignUpVisible: boolean;
  toggleSignUp: () => void;
  isLogged: boolean;
  toggleLogging: () => void;
}>({
  isSignInVisible: false,
  toggleSignIn: () => {},
  isSignUpVisible: false,
  toggleSignUp: () => {},
  isLogged: false,
  toggleLogging: () => {},
});

export default AppContext;
