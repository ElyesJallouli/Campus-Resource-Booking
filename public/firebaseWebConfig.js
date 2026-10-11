//This is the creating of the firebase web auth system desinged to sign in user/send emails/sign out, etc
//This is meant to be public

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGE",
  appId: "YOUR_ID",
  measurementId: "MEASUREMENT"
};

//Creating the firebase project and the firestore database

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
