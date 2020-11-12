import React from "react";
import logo from "./assets/logo.svg";
import "./styles/App.css";
import NavigationBar from "./components/NavigationBar";
import {Switch,
  Route
} from "react-router-dom";
import { Routes } from "./types/Routes";
function App() {
  return (
    <>
     <NavigationBar/>
     <Switch>
       <Route path={Routes.Home}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      </Route>  
      <Route path={Routes.Page1}>
      <div className="App">
        <header className="App-header">
          <p>
            We be routing
          </p>
        </header>
      </div>
      </Route>  
      </Switch>
    </>
  );
}

export default App;
