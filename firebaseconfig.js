// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAnxtPpQrDyxOKcV_FEQOmziPlLHAzqsf4",
    authDomain: "khanasabkliye.firebaseapp.com",
    projectId: "khanasabkliye",
    storageBucket: "khanasabkliye.appspot.com",
    messagingSenderId: "744374297062",
    appId: "1:744374297062:web:0ebc276a046bf974a0b627"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export { app, createUserWithEmailAndPassword, auth, signInWithEmailAndPassword, db, doc, setDoc, onAuthStateChanged, getDoc, updateDoc, signOut };
