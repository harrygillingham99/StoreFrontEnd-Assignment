import firebase from "firebase";
import React from "react";
import { AppContainer } from "../state/AppState";

interface IAuthHandlerProps{
    isSignedIn: boolean
    user: firebase.User | undefined

}
export const AuthHandler = (props: IAuthHandlerProps) => {
    const {isSignedIn, user} = props
    const { setUser, setAdmin } = AppContainer.useContainer();
    if (isSignedIn === true) {
        setUser(user);
      } else {
        setAdmin(false);
        setUser(undefined);
      }
      
    return <></>
}