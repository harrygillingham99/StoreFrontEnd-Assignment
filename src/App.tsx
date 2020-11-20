import React from "react";
import "./styles/App.css";
import NavigationBar from "./components/NavigationBar";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { Routes } from "./types/Routes";
import { SearchContainer } from "./state/SearchState";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import { firebaseConfig } from "./utils/Firebase";
import { AppContainer } from "./state/AppState";
import { CardDeck, Card } from "react-bootstrap";
import { data } from "./utils/fakeData";
import { AccountModal } from "./components/AccountModal";
import { AppAlert } from "./components/AppAlert";
import { AppAlertContainer } from "./state/AppAlertState";

function App() {
  return (
    <AppContainer.Provider>
      <AppAlertContainer.Provider>
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <BrowserRouter>
          <SearchContainer.Provider>
            <NavigationBar />
            <AppAlert />
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path={Routes.Home}>
                <CardDeck className="m-2">
                  {data.map(({ name, price }) => (
                    <Card>
                      <Card.Img variant="top" src="holder.js/100px160" />
                      <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Added:</small>
                      </Card.Footer>
                    </Card>
                  ))}
                </CardDeck>
              </Route>
              <Route path={Routes.Account}>
                <div className="App">
                  <header className="App-header">
                    <p>We be routing</p>
                  </header>
                </div>
              </Route>
            </Switch>
            <AccountModal />
          </SearchContainer.Provider>
        </BrowserRouter>
      </FirebaseAuthProvider>
      </AppAlertContainer.Provider>
    </AppContainer.Provider>
  );
}

export default App;
