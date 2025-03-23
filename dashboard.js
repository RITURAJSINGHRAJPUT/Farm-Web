import { auth, db, ref, onValue } from "./firebase-config.js";

// ✅ Function to Fetch Realtime Data
function fetchData() {
    const sensorRef = ref(db, "sensor");

    onValue(sensorRef, (snapshot) => {
        try {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log("Fetched Data:", data); // Debugging line

                // ✅ Ensure data is properly formatted
                const temperature = data.temperature ?? "--";
                const humidity = data.humidity ?? "--";
                const soilMoisture = data.soilMoisture ?? "--";

                // ✅ Update UI
                document.getElementById("temperature").innerText = `${temperature} °C`;
                document.getElementById("humidity").innerText = `${humidity} %`;
                document.getElementById("soil-moisture").innerText = `${(soilMoisture / 4095 * 100).toFixed(2)} %`;
            } else {
                console.warn("No data found in Firebase.");
            }
        } catch (error) {
            console.error("Error Parsing JSON:", error);
        }
    }, (error) => {
        console.error("Firebase Data Fetch Error:", error);
    });
}

// ✅ Call function when page loads
fetchData();
