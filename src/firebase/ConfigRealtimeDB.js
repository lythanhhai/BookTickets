// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithPhoneNumber,
// } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDQM31u0DEV9K1ihsBkyd6lcc_lc8Ou0Wg",
  authDomain: "testotp123-8c200.firebaseapp.com",
  projectId: "testotp123-8c200",
  databaseURL: "https://testotp123-8c200-default-rtdb.firebaseio.com/",
  storageBucket: "testotp123-8c200.appspot.com",
  messagingSenderId: "945689161740",
  appId: "1:945689161740:web:6fb81f15e2511c85a3fe29",
  measurementId: "G-9TQPDR6JB3",
};

let app;
let db;
if (!firebase.apps.length) {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
} else {
  db = getDatabase(firebase.app());
}

export { firebaseConfig, db };
// initializeApp(firebaseConfig)
// const auth = getAuth()

// export {
//     auth,
//     signInWithPhoneNumber
// }
