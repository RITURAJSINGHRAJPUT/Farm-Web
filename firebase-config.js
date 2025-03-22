import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCY4ptcdLyR3lG47pwlmM0fP5at8GqQKpk",
    authDomain: "precisionagri-3a0e3.firebaseapp.com",
    projectId: "precisionagri-3a0e3",
    storageBucket: "precisionagri-3a0e3.appspot.com",  // FIXED: appspot.com
    messagingSenderId: "554063187634",
    appId: "1:554063187634:web:beefa5ebc476841a68c3ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { app };
