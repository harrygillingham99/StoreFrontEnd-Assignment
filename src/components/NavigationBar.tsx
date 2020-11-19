import React from "react";
import { Navbar, Nav, DropdownButton, Dropdown } from "react-bootstrap";
import { AppContainer } from "../state/AppState";
import { Routes } from "../types/Routes";
import loggedIn from "../assets/user.svg";
import loggedOut from "../assets/user-x.svg";
import firebase from "firebase";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

const NavigationBar = () => {
  const { setUser, user, toggleAccountModal } = AppContainer.useContainer();
  const signInWithGoogle = async () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    var result = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    setUser(result.user ?? undefined);
  };
  const signInAnonymously = async () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    var result = await firebase.auth().signInAnonymously();
    setUser(result.user ?? undefined);
  };
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setUser(undefined));
  };

  const setLoggedInUser = (user: firebase.User | undefined) => {
    setUser(user)
  }
 
  const isLoggedIn = user !== undefined && firebase.auth().currentUser !== null;

  console.log(isLoggedIn)
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Store Front End</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto justify-content-end">
          <Nav.Link href={Routes.Home}>Home</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <DropdownButton
            id="basic-nav-dropdown"
            variant="outline-dark"
            menuAlign="right"
            className="list-unstyled"
            title={
              <img alt="account icon" src={isLoggedIn ? loggedIn : loggedOut} />
            }
          >
            <>
              {!isLoggedIn && (
                <>
                  <Dropdown.Item onClick={signInWithGoogle}>
                    Login with Google
                  </Dropdown.Item>
                  <Dropdown.Item onClick={signInAnonymously}>
                    Login as Guest
                  </Dropdown.Item>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Dropdown.Item onClick={() => toggleAccountModal(true)}>
                    Account
                  </Dropdown.Item>
                  <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                </>
              )}
            </>
            
          </DropdownButton>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <FirebaseAuthConsumer>
    {({ isSignedIn, user }) => {
      if (isSignedIn === true) {
        setLoggedInUser(user)
      } else {
        setLoggedInUser(undefined)
      }
    }}
    </FirebaseAuthConsumer>
    </>
  );
};

export default NavigationBar;
