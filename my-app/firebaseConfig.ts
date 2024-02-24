// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB6cMQdCcF-3e4JkHIDHgMzWul-V_zLmU",
  authDomain: "housemates-groceries.firebaseapp.com",
  projectId: "housemates-groceries",
  storageBucket: "housemates-groceries.appspot.com",
  messagingSenderId: "566820107547",
  appId: "1:566820107547:web:155042784ee0bf52bc4fbe",
  measurementId: "G-T00HVFYJP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);