// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";         // Importar getAuth para autenticación
import { getFirestore } from "firebase/firestore";  // Importar getFirestore para Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7CztHrAbfA8BTPA24Mqp0t9VH6I6uBms",
  authDomain: "cisterna-otb.firebaseapp.com",
  projectId: "cisterna-otb",
  storageBucket: "cisterna-otb.appspot.com",
  messagingSenderId: "457775754305",
  appId: "1:457775754305:web:74f08d9f0806e0ea04eac0"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Authentication y Firestore
const auth = getAuth(app);  // Configurar Firebase Authentication
const db = getFirestore(app);  // Configurar Firestore

export { auth, db };
