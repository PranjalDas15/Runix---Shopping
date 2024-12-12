
import { getApp, getApps, initializeApp } from "firebase/app";
import  'firebase/auth'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrWBMJ5FNj58Y83PYhs-RIJ8TQ-Ie1yCo",
  authDomain: "runix-auth-app.firebaseapp.com",
  projectId: "runix-auth-app",
  storageBucket: "runix-auth-app.firebasestorage.app",
  messagingSenderId: "581365769510",
  appId: "1:581365769510:web:05a2cbfd296236fbbb8de7",
  measurementId: "G-BS41YCEM9Z"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export {app, auth};