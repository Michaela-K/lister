import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZdKx5HMjTckYcLISS3SRbQ-EmFJ47ymY",
  authDomain: "fir-course-dca21.firebaseapp.com",
  projectId: "fir-course-dca21",
  storageBucket: "fir-course-dca21.appspot.com",
  messagingSenderId: "797180809192",
  appId: "1:797180809192:web:d99ab3933165058f789e5d",
  measurementId: "G-QNSKV81H47"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);