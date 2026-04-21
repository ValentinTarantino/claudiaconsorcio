import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChCCJG3FDT9CWMmcsXB874ksoYp10D48I",
  authDomain: "claudia-consorcio.firebaseapp.com",
  projectId: "claudia-consorcio",
  storageBucket: "claudia-consorcio.firebasestorage.app",
  messagingSenderId: "29095151004",
  appId: "1:29095151004:web:cbc8f9465729624f2cf459",
  measurementId: "G-LVQCYHVQP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
