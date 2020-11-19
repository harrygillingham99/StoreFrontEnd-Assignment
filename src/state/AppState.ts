import React from "react";
import firebase from "firebase/app";
import { createContainer } from "unstated-next";

/* 
This is a global state container for the app.
*/

const useAppState = () => {
  const [user, setUser] = React.useState<firebase.User | undefined>();
  const [showAccountModal, toggleAccountModal] = React.useState<boolean>(false);
  return { user, setUser, showAccountModal, toggleAccountModal };
};

export const AppContainer = createContainer(useAppState);
