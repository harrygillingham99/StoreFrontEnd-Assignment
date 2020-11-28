import { FirebaseAuthConsumer } from "@react-firebase/auth";
import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { AccountModal } from "./components/AccountModal";
import { AppAlert } from "./components/AppAlert";
import NavigationBar from "./components/NavigationBar";
import { SearchContainer } from "./state/SearchState";
import { Routes } from "./types/Routes";
import { HomeRoute } from "./routes/HomeRoute";
import { AuthHandler } from "./components/AuthHandler";
import { AdminRoute } from "./routes/AdminRoute";
import { UnauthorisedRoute } from "./routes/UnauthorisedRoute";
import { NotFoundRoute } from "./routes/NotFoundRoute";

export const Router = () => {
  return (
      <BrowserRouter>
        <SearchContainer.Provider>
            <NavigationBar />
            <AppAlert />
          <Switch>
            <Route exact path="/">
              <Redirect to={Routes.Home} />
            </Route>
            <Route path={Routes.Home}>
              <HomeRoute/>
            </Route>
            <Route path={Routes.Admin}>
              <AdminRoute/>
            </Route>
            <Route path={Routes.FourOhOne}>
              <UnauthorisedRoute />
            </Route>
            <Route component={NotFoundRoute} />
          </Switch>
          <AccountModal />
        </SearchContainer.Provider>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user }) => {
            return (<AuthHandler isSignedIn={isSignedIn} user={user}></AuthHandler>)
          }}
        </FirebaseAuthConsumer>
      </BrowserRouter>
  );
};
