import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQqzYe1lunO1hJBP1TOBWem6DZHtJpe_0",
  authDomain: "edia-app-f4c76.firebaseapp.com",
  projectId: "edia-app-f4c76",
  storageBucket: "edia-app-f4c76.appspot.com",
  messagingSenderId: "491479474330",
  appId: "1:491479474330:web:323e3379b091250127bf23",
  measurementId: "G-MXV83NW0JW",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
