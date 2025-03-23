// ✅ Import Firebase Modules & Other Dependencies
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { app } from "./firebase-config.js";
import { generateIrrigationSchedule } from "./schedule.js"; // ✅ Use local schedule.js

// ✅ Initialize Firebase Services
const auth = getAuth(app);
const db = getDatabase(app);

// ✅ Select UI Elements
const usernameElement = document.getElementById("username");
const logoutBtn = document.getElementById("logout");
const motorOnBtn = document.getElementById("motor-on");
const motorOffBtn = document.getElementById("motor-off");
const tempElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const soilMoistureElement = document.getElementById("soil-moisture");
const scheduleTable = document.getElementById("schedule-body");

// ✅ Handle User Authentication
onAuthStateChanged(auth, (user) => {
    if (user) {
        const username = user.displayName || user.email.split("@")[0] || "User";
        usernameElement.textContent = `Welcome, ${username}`;
    } else {
        window.location.href = "index.html"; // Redirect if not logged in
    }
});


// ✅ Logout Function
logoutBtn.addEventListener("click", () => {
    signOut(auth)
        .then(() => window.location.href = "index.html")
        .catch(error => alert("Logout failed: " + error.message));
});

// ✅ Motor ON/OFF Alert (No Firebase)
motorOnBtn.addEventListener("click", () => alert("Motor turned ON!"));
motorOffBtn.addEventListener("click", () => alert("Motor turned OFF!"));

// ✅ Fetch Real-time Sensor Data & Update UI
onValue(ref(db, "sensor"), (snapshot) => {
    if (!snapshot.exists()) {
        console.warn("No sensor data found.");
        return;
    }

    const data = snapshot.val();
    console.log("Fetched Sensor Data:", data); // Debugging

    // ✅ Convert soil moisture (0-4095) to percentage (0-100%)
    const soilMoisturePercentage = Math.round((1 - data.soilMoisture / 4095) * 100);

    // ✅ Update UI Elements
    tempElement.textContent = `${data.temperature} °C`;
    humidityElement.textContent = `${data.humidity} %`;
    soilMoistureElement.textContent = `${soilMoisturePercentage} %`;

    updateCharts({ 
        temperature: data.temperature, 
        soilMoisture: soilMoisturePercentage 
    });

    // ✅ Generate & Display Dynamic Irrigation Schedule
    const schedules = generateIrrigationSchedule(soilMoisturePercentage, data.humidity);
    displayIrrigationSchedule(schedules);
});

// ✅ Initialize Charts
const tempCtx = document.getElementById("tempChart").getContext("2d");
const soilCtx = document.getElementById("soilMoistureChart").getContext("2d");

const tempChart = new Chart(tempCtx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{ label: "Temperature (°C)", data: [], borderColor: "red", borderWidth: 2 }]
    }
});

const soilChart = new Chart(soilCtx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{ label: "Soil Moisture (%)", data: [], borderColor: "blue", borderWidth: 2 }]
    }
});

// ✅ Update Charts Dynamically
function updateCharts(data) {
    const time = new Date().toLocaleTimeString();

    if (tempChart.data.labels.length > 10) tempChart.data.labels.shift();
    if (soilChart.data.labels.length > 10) soilChart.data.labels.shift();

    tempChart.data.labels.push(time);
    tempChart.data.datasets[0].data.push(data.temperature);
    tempChart.update();

    soilChart.data.labels.push(time);
    soilChart.data.datasets[0].data.push(data.soilMoisture);
    soilChart.update();
}

// ✅ Display Next 5 Irrigation Schedules (Dynamic)
function displayIrrigationSchedule(schedules) {
    scheduleTable.innerHTML = ""; // Clear table

    schedules.forEach((schedule, index) => {
        scheduleTable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${schedule.time}</td>
                <td>${schedule.soil_moisture} %</td>
                <td>${schedule.temperature} °C</td>
            </tr>
        `;
    });
}
