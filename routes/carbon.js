import express from "express";
import axios from "axios";
import CarbonEntry from "../models/CarbonEntry.js";
import User from "../models/user.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// POST /api/carbon/calculate
router.post("/calculate", authMiddleware, async (req, res) => {
  try {
    console.log(`[carbon:calculate] user=${req.user?.id || req.userData?._id || 'unknown'} body=`, req.body);
    const { activityType, details } = req.body;

    const activityMap = {
      car: "passenger_vehicle-vehicle_type_car-fuel_source_na-distance_na-engine_size_na",
      bike: "passenger_vehicle-vehicle_type_motorbike-fuel_source_na-distance_na-engine_size_na",
      flight: "passenger_flight-route_type_domestic-aircraft_type_na-distance_na-class_na",
      bus: "passenger_vehicle-vehicle_type_bus-fuel_source_na-distance_na-engine_size_na",
      train: "passenger_train-route_type_na-fuel_source_na-distance_na",
    };

    // Allow 'manual' as a special activityType (client supplies co2)
    if (activityType !== 'manual' && !activityMap[activityType]) {
      return res.status(400).json({ error: "Invalid activityType" });
    }

    let co2 = 0;

    // Support manual entries where the client supplies a calculated co2 value
    if (activityType === 'manual' && details && typeof details.co2 === 'number') {
      co2 = details.co2;
    } else {
      try {
        // Call Climatiq API
        const response = await axios.post(
          process.env.CLIMATIQ_API_URL || "https://api.climatiq.io/estimate",
          {
            emission_factor: { id: activityMap[activityType] },
            parameters: {
              distance: details.distance || 1,
              distance_unit: "km",
              passengers: details.passengers || 1,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.CLIMATIQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        co2 = response.data.co2e || 0;
      } catch (e) {
        // If Climatiq returns 'no_emission_factors_found' or similar, fallback to a local heuristic
        console.warn('Climatiq estimate failed, falling back to local heuristic:', e.response?.data || e.message);
        // Very small heuristic: assume 0.2 kg CO2 per km for cars if distance provided
        if (details && typeof details.distance === 'number') {
          co2 = Number(details.distance) * 0.2;
        } else {
          co2 = 0;
        }
      }
    }

    // Save entry in CarbonEntry
    const entry = await CarbonEntry.create({
      userId: req.user.id,
      activityType,
      details,
      co2,
      date: new Date(),
    });

    // Award points
    await User.findByIdAndUpdate(req.user.id, { $inc: { points: 10 } });

    res.json({ entry, co2, pointsAwarded: 10 });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/carbon/stats
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id || req.userData?._id;
    console.log(`[carbon:stats] user=${userId}`);

    // Use UTC start-of-day to avoid timezone mismatches when grouping by ISO date
    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    // Daily stats (entries from start of today UTC)
    const dailyEntries = await CarbonEntry.find({
      userId,
      date: { $gte: today },
    });

    // Weekly stats (last 7 days including today)
    const weekAgo = new Date(today);
    weekAgo.setUTCDate(today.getUTCDate() - 6);

    const weeklyEntries = await CarbonEntry.find({
      userId,
      date: { $gte: weekAgo },
    });

    // Prepare graph data
    const stats = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekAgo);
      d.setUTCDate(weekAgo.getUTCDate() + i);
      const dateStr = d.toISOString().slice(0, 10); // ISO date in UTC
      const dayEntries = weeklyEntries.filter(
        (e) => e.date.toISOString().slice(0, 10) === dateStr
      );
      // Ensure co2 is numeric
      const co2 = dayEntries.reduce((sum, e) => sum + (Number(e.co2) || 0), 0);
      stats.push({ date: dateStr, co2: Number(co2) });
    }
    console.log('[carbon:stats] weekly=', stats);
    res.json({ daily: dailyEntries, weekly: stats });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
