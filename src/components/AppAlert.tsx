import React from "react";
import { Alert } from "react-bootstrap";
import { AppAlertContainer } from "../state/AppAlertState";

export const AppAlert = () => {
  const {alert, ToggleAlert} = AppAlertContainer.useContainer()
  const { alertType, alertText } = alert
  return (
    <Alert
      show={alert.showAlert}
      variant={alertType}
      onClose={() => ToggleAlert(false)}
      dismissible
      className="text-center"
    >
      <Alert.Heading>{alertText?.alertHeading}</Alert.Heading>
      <p>{alertText?.alertText}</p>
    </Alert>
  );
};
