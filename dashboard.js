import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { db, ref, onValue } from "./firebase-config.js";

// ✅ Initialize Firebase Auth
const auth = getAuth();

// ✅ Logout Function (Fixed)
function logout() {
    signOut(auth)
        .then(() => {
            window.location.href = "index.html"; // Redirect to index.html after logout
        })
        .catch((error) => {
            console.error("Logout Error:", error.message);
            alert("Logout failed! Please try again.");
        });
}

// ✅ Fetch Realtime Sensor Data
function fetchData() {
    const sensorRef = ref(db, "sensor");

    onValue(sensorRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();

            // ✅ Ensure data is properly formatted
            const temperature = data.temperature ?? "--";
            const humidity = data.humidity ?? "--";
            const soilMoisture = data.soilMoisture ?? "--";

            // ✅ Update UI
            document.getElementById("temperature").textContent = `${temperature} °C`;
            document.getElementById("humidity").textContent = `${humidity} %`;
            document.getElementById("soil-moisture").textContent = 
                soilMoisture !== "--" ? `${(soilMoisture / 4095 * 100).toFixed(2)} %` : "-- %";
        } else {
            console.warn("No sensor data found.");
        }
    }, (error) => {
        console.error("Firebase Data Fetch Error:", error);
    });
}

// ✅ Call function when page loads
fetchData();

// ✅ Attach Logout Function to Button
document.querySelector("button[onclick='logout()']").addEventListener("click", logout);
