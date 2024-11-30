// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC3ZQ06TRU4ALthkrV9zXPPomLGCeitGI",
  authDomain: "odd-space-stories.firebaseapp.com",
  projectId: "odd-space-stories",
  storageBucket: "odd-space-stories.firebasestorage.app",
  messagingSenderId: "188593441660",
  appId: "1:188593441660:web:39817c6828914b1b68f2f9",
  measurementId: "G-QB4CTTBMTF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { analytics, googleProvider, app };
