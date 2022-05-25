import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBv6aTQpYwmEbedJvQYBSOlzCsPJqmiZ-g",
  authDomain: "assignment-350718.firebaseapp.com",
  projectId: "assignment-350718",
  storageBucket: "assignment-350718.appspot.com",
  messagingSenderId: "207811513448",
  appId: "1:207811513448:web:1510c6718e0a1d91f47fdd",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
