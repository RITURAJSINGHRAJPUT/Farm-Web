/**
 * ✅ schedule.js - Generates 5 Irrigation Schedules
 */

export function generateIrrigationSchedule(soilMoisture, humidity) {
    let schedules = [];
    let currentTime = new Date();

    let intervals = getIntervals(soilMoisture, humidity); // Get interval times
    let scheduleCount = 5; // ✅ Fixed to 5 schedules

    for (let i = 0; i < scheduleCount; i++) {
        currentTime.setMinutes(currentTime.getMinutes() + intervals[i % intervals.length]); // Add interval time

        schedules.push({
            time: currentTime.toLocaleTimeString(),
            soil_moisture: soilMoisture,
            temperature: Math.round(Math.random() * 3 + 25) // Small variation
        });
    }

    console.log("Generated Irrigation Schedule:", schedules); // ✅ Debugging
    return schedules;
}

function getIntervals(soilMoisture, humidity) {
    let baseInterval = 30; // Default in minutes

    if (soilMoisture < 20) baseInterval = 15; 
    else if (soilMoisture < 40) baseInterval = 25;
    else if (soilMoisture < 60) baseInterval = 35;
    else if (soilMoisture < 80) baseInterval = 45;
    else baseInterval = 60;

    if (humidity > 70) baseInterval += 10; 
    else if (humidity < 30) baseInterval -= 10;

    return [baseInterval, baseInterval + 5]; // Two interval variations
}
