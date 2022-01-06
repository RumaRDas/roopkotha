// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyDiRYGW8C2W3-slj4ENX-hYXmlLkfu9ZrA",
  authDomain: "roopkotha-a8650.firebaseapp.com",
  projectId: "roopkotha-a8650",
  storageBucket: "roopkotha-a8650.appspot.com",
  messagingSenderId: "962725074306",
  appId: "1:962725074306:web:b02dcd4ddf3c9ee40fab9b",
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
