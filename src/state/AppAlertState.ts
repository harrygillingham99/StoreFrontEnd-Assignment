import React from "react";
import firebase from "firebase/app";
import { createContainer } from "unstated-next";

/* 
This is a global state container for the apps alert.
*/

const useAppAlertState = () => {
  interface AlertBodyProps {
    alertText: string;
    alertHeading: string;
  }
  const [showAlert, setAlert] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<
    "success" | "danger" | "primary"
  >();
  const [alertText, setAlertText] = React.useState<AlertBodyProps>();
  const alert = { showAlert, alertType, alertText };
  const ToggleAlert = (
    show: boolean,
    type?: "success" | "danger" | "primary",
    alertHeading?: string,
    alertText?: string
  ) => {
    if (type !== undefined) {
      setAlertType(type);
    }
    if (alertHeading && alertText !== undefined) {
      setAlertText({ alertHeading: alertHeading, alertText: alertText });
    }
    setAlert(show);
  };

  return {
    ToggleAlert,
    alert,
  };
};

export const AppAlertContainer = createContainer(useAppAlertState);
