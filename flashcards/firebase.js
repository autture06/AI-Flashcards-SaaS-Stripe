// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbVgtuFU7pLl928ERLj9NHQdOcUMk2lCM",
  authDomain: "flashcards-cc70f.firebaseapp.com",
  projectId: "flashcards-cc70f",
  storageBucket: "flashcards-cc70f.appspot.com",
  messagingSenderId: "528732632644",
  appId: "1:528732632644:web:1f06430d693feeb955ee11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);