// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "/firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-73df0.firebaseapp.com",
  projectId: "ai-course-generator-73df0",
  storageBucket: "ai-course-generator-73df0.firebasestorage.app",
  messagingSenderId: "766316368060",
  appId: "1:766316368060:web:03d278c9ab49684cc500b9",
  measurementId: "G-VS4LJZQM6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
