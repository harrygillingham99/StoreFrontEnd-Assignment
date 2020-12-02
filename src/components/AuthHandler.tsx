import firebase from "firebase";
import React from "react";
import { AppContainer } from "../state/AppState";

interface IAuthHandlerProps {
  isSignedIn: boolean;
  user: firebase.User | undefined;
}
export const AuthHandler = (props: IAuthHandlerProps) => {
  const { isSignedIn, user } = props;
  const { SetUser, setAdmin } = AppContainer.useContainer();
  if (isSignedIn === true) {
    SetUser(user);
  } else {
    setAdmin(false);
    SetUser(undefined);
  }

  return <></>;
};
