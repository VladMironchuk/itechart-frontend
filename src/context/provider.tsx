import React, { ReactNode, useMemo, useState } from "react";

import AppContext from "./context";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [login, setLogin] = useState("");

  const appContext = useMemo(
    () => ({
      isLogged,
      toggleLogging: () => {
        setIsLogged((prevState) => !prevState);
      },
      login,
      updateLogin: (str: string) => {
        setLogin(() => str);
      },
    }),
    [isLogged]
  );

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

export default AppProvider;
