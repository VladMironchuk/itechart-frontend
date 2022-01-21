import React from "react";

const AppContext = React.createContext<{ isVisible: boolean; setIsVisible: () => void }>({
  isVisible: false,
  setIsVisible: () => {},
});

export default AppContext;
