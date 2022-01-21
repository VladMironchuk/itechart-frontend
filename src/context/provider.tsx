import React, { ReactNode, useMemo, useState } from "react";

import AppContext from "./context";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const isModalVisibleHandler = () => {
    setIsVisible((prevState) => !prevState);
  };

  const appContext = useMemo(
    () => ({
      isVisible,
      setIsVisible: isModalVisibleHandler,
    }),
    [isVisible]
  );

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

export default AppProvider;
