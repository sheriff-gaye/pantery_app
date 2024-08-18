import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDk6iPtGEyGAzj-Khqwg2z4Zlq0uz-zxZM",
  authDomain: "pantry-63b66.firebaseapp.com",
  projectId: "pantry-63b66",
  storageBucket: "pantry-63b66.appspot.com",
  messagingSenderId: "701886747986",
  appId: "1:701886747986:web:27967a604623f588f1568b",
  measurementId: "G-001D59JMBV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
 export const db = getFirestore(app);