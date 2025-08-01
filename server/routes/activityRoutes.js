import express from 'express';
import ActivityLog from '../models/ActivityLog.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const activities = await ActivityLog.find().sort({ createdAt: -1 }).limit(10)
    res.json(activities)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recent activities" })
  }
})


export default router;