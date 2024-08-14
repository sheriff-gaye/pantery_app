// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJQE9VXjeaDAIX34kO381Dx5R5TTiilRA",
    authDomain: "pantry-97329.firebaseapp.com",
    projectId: "pantry-97329",
    storageBucket: "pantry-97329.appspot.com",
    messagingSenderId: "76836433613",
    appId: "1:76836433613:web:43609b07f35a68986a4384",
    measurementId: "G-BBNC9VB0NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
    const analytics = getAnalytics(app);
}
export const auth = getAuth();