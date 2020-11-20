import React from "react";
import { Alert } from "react-bootstrap";
import { AppAlertContainer } from "../state/AppAlertState";

export const AppAlert = () => {
  const { alert, ToggleAlert } = AppAlertContainer.useContainer();

  return (
    <Alert
      show={alert.showAlert}
      variant={alert.alertType}
      onClose={() => ToggleAlert(false)}
      dismissible
      className="text-center"
    >
      <Alert.Heading>{alert.alertText?.alertHeading}</Alert.Heading>
      <p>{alert.alertText?.alertText}</p>
    </Alert>
  );
};
