// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FB_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FB_AUTH_DOMAIN_API_KEY}`,
  projectId: `${process.env.REACT_APP_FB_PROJECT_ID_API_KEY}`,
  storageBucket: `${process.env.REACT_APP_FB_STORAGE_BUCKET_API_KEY}`,
  messagingSenderId: `${process.env.REACT_APP_FB_MESSAGING_SENDER_ID_API_KEY}`,
  appId: `${process.env.REACT_APP_FB_APP_ID_API_KEY}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
