// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcDKP-1pryjEQFgMSSbcZK6ZI3QsIezFk",
  authDomain: "d2-tracker.firebaseapp.com",
  projectId: "d2-tracker",
  storageBucket: "d2-tracker.appspot.com",
  messagingSenderId: "921822416104",
  appId: "1:921822416104:web:fc92a373b728c7706b4d5d",
  measurementId: "G-FKD3MFX81N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export { app };
