import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDai1GcLEq1Gfe84Bz-atCmrCvKTc9pJK8",
  authDomain: "cars-3a440.firebaseapp.com",
  projectId: "cars-3a440",
  storageBucket: "cars-3a440.appspot.com",
  messagingSenderId: "785443967081",
  appId: "1:785443967081:web:a8acba5bf89329a242d2f8",
  measurementId: "G-T05R4KRYCL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
