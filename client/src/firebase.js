import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <--- 1. NEW: Import Auth SDK

const firebaseConfig = {
  apiKey: "AIzaSyD7bsRLEe1NnDT2qPRHFHzO5D6hswzLG8A",
  authDomain: "canopypuffs-5966d.firebaseapp.com",
  projectId: "canopypuffs-5966d",
  storageBucket: "canopypuffs-5966d.firebasestorage.app",
  messagingSenderId: "332013858476",
  appId: "1:332013858476:web:80a411343e39fe8a7c3909"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize & Export Database
export const db = getFirestore(app);

// Initialize & Export Authentication
export const auth = getAuth(app); // <--- 2. NEW: Export Auth for Dashboard