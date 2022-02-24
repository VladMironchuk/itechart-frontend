import "./styles/main.css";
import "./styles/main.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./components/layout";
import HomePage from "./components/pages/homePage/homePage";
import AboutPage from "./components/pages/aboutPage/aboutPage";
import ProductsPage from "./components/pages/productsPage/productsPage";
import ProfilePage from "./components/pages/profilePage/profilePage";
import PrivateRoute from "./elements/privateRoute/privateRoute";
import { AppProps } from "./redux/redux";
import CartPage from "./components/pages/cartPage/cartPage";

function mapStateToProps(state: AppProps) {
  return state;
}

class App extends Component<AppProps> {
  componentDidCatch() {
    console.error("error");
  }

  render() {
    return (
      <Layout>
        <Switch>
          <PrivateRoute path="/about">
            <AboutPage />
          </PrivateRoute>
          <PrivateRoute path="/products/:category">
            <ProductsPage />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/cart">
            <CartPage />
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

export default connect(mapStateToProps)(App);
