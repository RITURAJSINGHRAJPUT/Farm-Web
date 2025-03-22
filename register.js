import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { app } from "./firebase-config.js"; // Correct import

const auth = getAuth(app);

export function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User Registered:", userCredential.user);
            alert("Registration successful!");
            window.location.href = "index.html"; // Redirect to login
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert(error.message);
        });
}
