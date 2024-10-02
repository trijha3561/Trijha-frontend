// src/app/config/firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // Firebase core
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "@firebase/firestore"; // Import Firebase Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXtytx7T9a2GeY_5D-tuqzGR7UQJusj0w",
  authDomain: "trijha-new.firebaseapp.com",
  projectId: "trijha-new",
  storageBucket: "trijha-new.appspot.com",
  messagingSenderId: "854907459114",
  appId: "1:854907459114:web:1f138a040978b069fc9553",
  measurementId: "G-ES55BT5BKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initializes the Firebase app
const auth = getAuth(app);  // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firebase Firestore

export { app, auth, db }; // Export the Firebase app, auth, and Firestore instances
