// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-WVS8-NrEjCU5iyb42UlF2wD134hnKao",
  authDomain: "bookbuddy-ecf27.firebaseapp.com",
  projectId: "bookbuddy-ecf27",
  storageBucket: "bookbuddy-ecf27.firebasestorage.app",
  messagingSenderId: "1093224205138",
  appId: "1:1093224205138:web:cbb6ba42a55e2a697b888b",
  measurementId: "G-QMNX6S03XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);