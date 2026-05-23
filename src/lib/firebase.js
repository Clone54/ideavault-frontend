import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD3NFjonVfIPeLkKl-d9sqO8kRvtr7B2RE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ideavault-93bdf.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ideavault-93bdf",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ideavault-93bdf.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "530329554526",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:530329554526:web:66bea4e559867964de6ecf",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-2Q2CNL6Z3T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut };
