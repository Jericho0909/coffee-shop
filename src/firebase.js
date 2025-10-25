// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // ✅ import database

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9slfzo-PlDHgGnYKcQjSMPRcaDpiCBEw",
  authDomain: "coffee-shop-26642.firebaseapp.com",
  databaseURL: "https://coffee-shop-26642-default-rtdb.firebaseio.com",
  projectId: "coffee-shop-26642",
  storageBucket: "coffee-shop-26642.firebasestorage.app",
  messagingSenderId: "467203485881",
  appId: "1:467203485881:web:949193e719dbf81718eb68",
  measurementId: "G-S53FX01M5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// ✅ Initialize and export the database
export const database = getDatabase(app);
