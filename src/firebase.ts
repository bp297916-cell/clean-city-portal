import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiX0_jgQYt0ud52NJQYNCf1Xz7oLZ-9F4",
  authDomain: "clean-city-complaint-portal.firebaseapp.com",
  projectId: "clean-city-complaint-portal",
  storageBucket: "clean-city-complaint-portal.firebasestorage.app",
  messagingSenderId: "1045483574944",
  appId: "1:1045483574944:web:823bd5bc0aaf32e76ddbc5",
  measurementId: "G-9FDF4LG23K"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export { app };