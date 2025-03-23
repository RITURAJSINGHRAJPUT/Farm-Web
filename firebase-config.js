import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, onValue , set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCY4ptcdLyR3lG47pwlmM0fP5at8GqQKpk",
    authDomain: "precisionagri-3a0e3.firebaseapp.com",
    projectId: "precisionagri-3a0e3",
    storageBucket: "precisionagri-3a0e3.appspot.com",
    messagingSenderId: "554063187634",
    appId: "1:554063187634:web:beefa5ebc476841a68c3ab",
    databaseURL: "https://precisionagri-3a0e3-default-rtdb.firebaseio.com/" // ✅ Ensure databaseURL is correct
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);  // ✅ Initialize Realtime Database
// const signOut = getsignout 

// ✅ Export Required Modules
export { app, auth, db, ref, onValue , signOut , set };
