// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7CztHrAbfA8BTPA24Mqp0t9VH6I6uBms",
  authDomain: "cisterna-otb.firebaseapp.com",
  projectId: "cisterna-otb",
  storageBucket: "cisterna-otb.appspot.com",
  messagingSenderId: "457775754305",
  appId: "1:457775754305:web:74f08d9f0806e0ea04eac0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;