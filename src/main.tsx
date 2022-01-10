import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode } from "react";
import ReactDom from "react-dom";

const AppComponent = () => {
  return <h2>Staring new project...</h2>;
};

ReactDom.render(
  <StrictMode>
    <AppComponent />
  </StrictMode>,
  document.getElementById("app")
);
