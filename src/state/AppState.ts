import React from "react";
import firebase from "firebase/app";
import { createContainer } from "unstated-next";

/* 
This is a global state container for the app.
*/

const useAppState = () => {
  const [user, setUser] = React.useState<firebase.User | undefined>();
  const [showAccountModal, toggleAccountModal] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<
    "success" | "danger" | "primary"
  >();
  const ToggleAlert = (
    show: boolean,
    type?: "success" | "danger" | "primary"
  ) => {
    if (type !== undefined) {
      setAlertType(type);
    }
    setAlert(show);
  };

  return {
    user,
    setUser,
    showAccountModal,
    toggleAccountModal,
    alert,
    alertType,
    ToggleAlert,
  };
};

export const AppContainer = createContainer(useAppState);
