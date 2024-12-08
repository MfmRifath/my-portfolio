import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAy5fk7wRHZRUh5qGa65LStY3Y6HatZzEY",
  authDomain: "myportfolio-186ae.firebaseapp.com",
  projectId: "myportfolio-186ae",
  storageBucket: "myportfolio-186ae.firebasestorage.app",
  messagingSenderId: "781639783428",
  appId: "1:781639783428:web:8e57a3a92655a9d7659151",
  measurementId: "G-14VS8FTKG1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);