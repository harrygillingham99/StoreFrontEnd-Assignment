import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyB_SOBfp4UoQMwEdJd_EvRMB68tt1jrK08",
  authDomain: "e-commerce-assignment-295115.firebaseapp.com",
  databaseURL: "https://e-commerce-assignment-295115.firebaseio.com",
  projectId: "e-commerce-assignment-295115",
  storageBucket: "e-commerce-assignment-295115.appspot.com",
  messagingSenderId: "231402939879",
  appId: "1:231402939879:web:dc92f1307204ac98028942",
};

export const signInWithGoogle = async (
  setUser: (value: React.SetStateAction<firebase.User | undefined>) => void
) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  var result = await firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  setUser(result.user ?? undefined);
};
export const signInAnonymously = async (
  setUser: (value: React.SetStateAction<firebase.User | undefined>) => void
) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  var result = await firebase.auth().signInAnonymously();
  setUser(result.user ?? undefined);
};
export const signOut = (
  setUser: (value: React.SetStateAction<firebase.User | undefined>) => void
) => {
  firebase
    .auth()
    .signOut()
    .then(() => setUser(undefined));
};
