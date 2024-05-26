import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEKEY,
  authDomain: "project-frontend-ff45b.firebaseapp.com",
  projectId: "project-frontend-ff45b",
  storageBucket: "project-frontend-ff45b.appspot.com",
  messagingSenderId: "285247248370",
  appId: "1:285247248370:web:8a672bdd2e27d72b5f3d6b",
  measurementId: "G-E3VS2PV1JX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);