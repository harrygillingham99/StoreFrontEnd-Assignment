import React from "react";
import "./styles/App.css";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import { firebaseConfig } from "./utils/Firebase";
import { AppContainer } from "./state/AppState";
import { AppAlertContainer } from "./state/AppAlertState";
import { Router } from "./Router";



function App() {
  return (
    <AppContainer.Provider>
      <AppAlertContainer.Provider>
        <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
          <Router />
        </FirebaseAuthProvider>
      </AppAlertContainer.Provider>
    </AppContainer.Provider>
  );
}

export default App;
