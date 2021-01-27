import firebase from "firebase";

export const firebaseConfig = {
};

export const signInWithGoogle = async (
  setUser: (user: firebase.User | undefined) => void
) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((res) => setUser(res.user ?? undefined));
};
export const signInAnonymously = async (
  setUser: (user: firebase.User | undefined) => void
) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase
    .auth()
    .signInAnonymously()
    .then((res) => setUser(res.user ?? undefined));
};
export const signInWithEmailPassword = async (
  setUser: (user: firebase.User | undefined) => void, email : string, password: string
) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => setUser(res.user ?? undefined));
};
export const signOut = (setUser: (user: firebase.User | undefined) => void) => {
  firebase
    .auth()
    .signOut()
    .then(() => setUser(undefined));
};
