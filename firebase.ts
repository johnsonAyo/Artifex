// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT8gJkjMZXyHnk_sQPdZNIuV-MCo1pbSw",
  authDomain: "filmedia-f581e.firebaseapp.com",
  projectId: "filmedia-f581e",
  storageBucket: "filmedia-f581e.appspot.com",
  messagingSenderId: "731328886326",
  appId: "1:731328886326:web:6108632984fcbbe3114a97",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
