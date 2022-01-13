// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyC5szTWm50lp42YyfjiMhw6k_WfPoom9rs",
  authDomain: "newstore-8898a.firebaseapp.com",
  projectId: "newstore-8898a",
  storageBucket: "newstore-8898a.appspot.com",
  messagingSenderId: "376833853407",
  appId: "1:376833853407:web:583afe4056ea98f5f5666a",
};
// Initialize Firebase app
//const app = initializeApp(config);

//export
//export default firebase

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
