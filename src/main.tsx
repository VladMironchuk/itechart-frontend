import "./styles/main.css";
import "./styles/main.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { StrictMode, Component } from "react";
import ReactDom from "react-dom";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./components/pages/homePage/homePage";
import AboutPage from "./components/pages/aboutPage/aboutPage";
import ProductsPage from "./components/pages/productsPage/productsPage";
import AppProvider from "./context/provider";

class AppComponent extends Component {
  componentDidCatch() {
    console.error("error");
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/products/:category">
            <ProductsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    );
  }
}

ReactDom.render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AppComponent />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("app")
);
