// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Note: `apiKey` does not grant access to Firebase services, it's a public app identifier:
  // https://firebase.google.com/docs/projects/api-keys#api-keys-for-firebase-are-different
  apiKey: "AIzaSyCJrCkNuTumjOHhr5QU0RMPbdhNcf0QJ2s",
  authDomain: "beat-sequence.firebaseapp.com",
  projectId: "beat-sequence",
  storageBucket: "beat-sequence.appspot.com",
  messagingSenderId: "159976998115",
  appId: "1:159976998115:web:68e22e6db842809633b1d6",
  measurementId: "G-GTFRFW8HLL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// connectAuthEmulator(auth, "http://127.0.0.1:9099");
const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8080);

export { app, auth, db };
