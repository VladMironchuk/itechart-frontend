import "./styles/main.css";
import "./styles/main.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "@/app";
import store from "@/redux/redux";

ReactDom.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("app")
);
