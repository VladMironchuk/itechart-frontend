import "./styles/main.css";
import "./styles/main.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { StrictMode, Component } from "react";
import ReactDom from "react-dom";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import AppContext from "./context/context";
import Layout from "./components/layout";
import HomePage from "./components/pages/homePage/homePage";
import AboutPage from "./components/pages/aboutPage/aboutPage";
import ProductsPage from "./components/pages/productsPage/productsPage";
import ProfilePage from "./components/pages/profilePage/profilePage";
import AppProvider from "./context/provider";
import PrivateRoute from "./elements/privateRoute/privateRoute";

class AppComponent extends Component {
  componentDidCatch() {
    console.error("error");
  }

  render() {
    return (
      <Layout>
        <Switch>
          <PrivateRoute path="/about" isLogged={this.context.isLogged}>
            <AboutPage />
          </PrivateRoute>
          <PrivateRoute path="products/:category" isLogged={this.context.isLogged}>
            <ProductsPage />
          </PrivateRoute>
          <PrivateRoute path="/profile" isLogged={this.context.isLogged}>
            <ProfilePage />
          </PrivateRoute>
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

AppComponent.contextType = AppContext;

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
