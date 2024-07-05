// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbQlGhBOFU7toIvXjQwIHaq4bP3cUEDCk",
  authDomain: "software-f6dc4.firebaseapp.com",
  databaseURL: "https://software-f6dc4-default-rtdb.firebaseio.com",
  projectId: "software-f6dc4",
  storageBucket: "software-f6dc4.appspot.com",
  messagingSenderId: "806300610307",
  appId: "1:806300610307:web:380b2cc0d1b03c08b18336"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
