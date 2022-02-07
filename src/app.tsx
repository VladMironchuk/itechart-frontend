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

function mapStateToProps(state: { user: AppProps }) {
  const { isLogged, login } = state.user;

  return {
    isLogged,
    login,
  };
}

class App extends Component<AppProps> {
  componentDidCatch() {
    console.error("error");
  }

  render() {
    return (
      <Layout>
        <Switch>
          <PrivateRoute path="/about" isLogged={this.props.isLogged}>
            <AboutPage />
          </PrivateRoute>
          <PrivateRoute path="/products/:category" isLogged={this.props.isLogged}>
            <ProductsPage />
          </PrivateRoute>
          <PrivateRoute path="/profile" isLogged={this.props.isLogged}>
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

export default connect(mapStateToProps)(App);
