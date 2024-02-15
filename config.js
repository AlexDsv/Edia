import firebase from "@firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7rmvYNKFim3S5FPLMi8ad0dGcBcBvvmM",
  authDomain: "edia-5d545.firebaseapp.com",
  projectId: "edia-5d545",
  storageBucket: "edia-5d545.appspot.com",
  messagingSenderId: "420688421449",
  appId: "1:420688421449:web:7a07693b840f3f7f8dd598",
  measurementId: "G-DHH8DLRKNE",
};

const app = initializeApp(firebaseConfig);
