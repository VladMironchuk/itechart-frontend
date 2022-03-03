import "./styles/main.css";
import "./styles/main.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Component, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./components/layout";
import HomePage from "./components/pages/homePage/homePage";
import PrivateRoute from "./elements/privateRoute/privateRoute";
import { AppDispatch, AppProps } from "./redux/redux";
import { gamesActions, GamesState } from "./redux/slices/games";

const ProductsPage = lazy(() => import("./components/pages/productsPage/productsPage"));
const ProfilePage = lazy(() => import("./components/pages/profilePage/profilePage"));
const CartPage = lazy(() => import("./components/pages/cartPage/cartPage"));
const AboutPage = lazy(() => import("./components/pages/aboutPage/aboutPage"));

function mapStateToProps(state: AppProps) {
  return state;
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    updateGames: (games: GamesState["games"]) => {
      dispatch(gamesActions.updateGames(games));
    },
  };
}

class App extends Component<AppProps> {
  componentDidMount() {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        this.props.updateGames({ games: data });
      });
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
