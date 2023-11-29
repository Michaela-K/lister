// Import the functions you need from the SDKs you need
// import firebaseApp from "firebase/app";
// import firebase from "firebase"
// import 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZdKx5HMjTckYcLISS3SRbQ-EmFJ47ymY",
  authDomain: "fir-course-dca21.firebaseapp.com",
  projectId: "fir-course-dca21",
  storageBucket: "fir-course-dca21.appspot.com",
  messagingSenderId: "797180809192",
  appId: "1:797180809192:web:d99ab3933165058f789e5d",
  measurementId: "G-QNSKV81H47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
// export default firebase;