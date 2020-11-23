import { FirebaseAuthConsumer } from "@react-firebase/auth";
import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { AccountModal } from "./components/AccountModal";
import { AppAlert } from "./components/AppAlert";
import NavigationBar from "./components/NavigationBar";
import { ProductContainer } from "./components/ProductContainer";
import { AppAlertContainer } from "./state/AppAlertState";
import { AppContainer } from "./state/AppState";
import { SearchContainer } from "./state/SearchState";
import { Routes } from "./types/Routes";
import { GetProducts } from "./utils/Products";
import firebase from "firebase";

export const Router = () => {
  const { ToggleAlert } = AppAlertContainer.useContainer();
  const { setUser, setProducts } = AppContainer.useContainer();

  const setLoggedInUser = (user: firebase.User | undefined) => setUser(user);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await GetProducts();
        if (result) {
          setProducts(result);
        } else throw new Error("Failed to get products");
      } catch (ex) {
        ToggleAlert(
          true,
          "danger",
          "Error!",
          "Failed to fetch the latest products"
        );
      }
    };
    fetchProducts();
  }, [setProducts, ToggleAlert]);

  return (
    <>
      <BrowserRouter>
        <SearchContainer.Provider>
          <NavigationBar />
          <AppAlert />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path={Routes.Home}>
              <ProductContainer />
            </Route>
            <Route path={Routes.Account}>
              <div className="">
                <header className="">
                  <p>We be routing</p>
                </header>
              </div>
            </Route>
          </Switch>
          <AccountModal />
        </SearchContainer.Provider>
      </BrowserRouter>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user }) => {
          if (isSignedIn === true) {
            setLoggedInUser(user);
          } else {
            setLoggedInUser(undefined);
          }
        }}
      </FirebaseAuthConsumer>
    </>
  );
};
