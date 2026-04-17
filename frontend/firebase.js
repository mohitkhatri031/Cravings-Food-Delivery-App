// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "cravings-food-delivery-app.firebaseapp.com",
  projectId: "cravings-food-delivery-app",
  storageBucket: "cravings-food-delivery-app.firebasestorage.app",
  messagingSenderId: "326067438694",
  appId: "1:326067438694:web:c6b181006ec53dcc8719a7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}



