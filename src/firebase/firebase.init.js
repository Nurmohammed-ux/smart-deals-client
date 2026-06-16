// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5oWWU6TmDBihDbliwQJlEvm4kU0R11kU",
  authDomain: "smart-deals-1be82.firebaseapp.com",
  projectId: "smart-deals-1be82",
  storageBucket: "smart-deals-1be82.firebasestorage.app",
  messagingSenderId: "42678561372",
  appId: "1:42678561372:web:de81a288727ee1c986d499"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
