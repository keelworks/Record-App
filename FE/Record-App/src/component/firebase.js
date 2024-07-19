// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsIdwTcI-TJym_TyOHPQ4YnE1IU4vCFMc",
  authDomain: "signin-with-b2ce5.firebaseapp.com",
  projectId: "signin-with-b2ce5",
  storageBucket: "signin-with-b2ce5.appspot.com",
  messagingSenderId: "537973143456",
  appId: "1:537973143456:web:b32b1e2fa10617ab4616c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db=getFirestore(app)

export default app