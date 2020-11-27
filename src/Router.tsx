import { FirebaseAuthConsumer } from "@react-firebase/auth";
import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { AccountModal } from "./components/AccountModal";
import { AppAlert } from "./components/AppAlert";
import NavigationBar from "./components/NavigationBar";
import { ProductContainer } from "./components/ProductContainer";
import { AppContainer } from "./state/AppState";
import { SearchContainer } from "./state/SearchState";
import { Routes } from "./types/Routes";
import firebase from "firebase";
import { Container, Jumbotron } from "react-bootstrap";

export const Router = () => {
  const { setUser } = AppContainer.useContainer();

  const setLoggedInUser = (user: firebase.User | undefined) => setUser(user);

  return (
    <>
      <BrowserRouter>
        <SearchContainer.Provider>
          <>
            <NavigationBar />
            <AppAlert />
          </>
          <Switch>
            <Route exact path="/">
              <Redirect to={Routes.Home} />
            </Route>
            <Route path={Routes.Home}>
              <Jumbotron fluid>
                <Container>
                  <h1>Ninebarrow Pet Supplies</h1>
                  <p>
                    Welcome to our new website. We hope you enjoy your stay.
                  </p>
                </Container>
              </Jumbotron>
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
        <FirebaseAuthConsumer>
          {({ isSignedIn, user }) => {
            if (isSignedIn === true) {
              setLoggedInUser(user);
            } else {
              setLoggedInUser(undefined);
            }
          }}
        </FirebaseAuthConsumer>
      </BrowserRouter>
    </>
  );
};
