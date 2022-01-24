import React, { ReactNode, useMemo, useState } from "react";

import AppContext from "./context";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignInVisible, setSignInIsVisible] = useState(false);
  const [isSignUpVisible, setSignUpIsVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const toggleModal = (param: "in" | "up") => {
    switch (param) {
      case "in":
        return () => {
          setSignInIsVisible((prevState) => !prevState);
        };
      case "up":
        return () => {
          setSignUpIsVisible((prevState) => !prevState);
        };
    }
  };

  const appContext = useMemo(
    () => ({
      isSignInVisible,
      isSignUpVisible,
      toggleSignIn: toggleModal("in"),
      toggleSignUp: toggleModal("up"),
      isLogged,
      toggleLogging: () => {
        setIsLogged((prevState) => !prevState);
      },
    }),
    [isSignInVisible, isSignUpVisible, isLogged]
  );

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

export default AppProvider;
