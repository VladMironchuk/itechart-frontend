import React from "react";

export type IAppContext = {
  isLogged: boolean;
  toggleLogging: () => void;
  login: string;
  updateLogin: (login: string) => void;
};

const AppContext = React.createContext<IAppContext>({
  isLogged: false,
  toggleLogging: () => {},
  login: "",
  updateLogin: () => {},
});

export default AppContext;
