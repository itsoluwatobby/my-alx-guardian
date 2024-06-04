import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEKEY,
  authDomain: "my-alx-guardian.firebaseapp.com",
  projectId: "my-alx-guardian",
  storageBucket: "my-alx-guardian.appspot.com",
  messagingSenderId: "956056428633",
  appId: "1:956056428633:web:3c00bfd6515a2009609148",
  measurementId: "G-TX705ZLL6S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage();
