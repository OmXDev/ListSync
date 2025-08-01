import express from 'express';
import { createAgent, getAgents } from '../controllers/agentController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import ListItem from '../models/ListItem.js';

const router = express.Router();

router.post('/', createAgent);
router.get('/',  getAgents);
// GET /api/agents/:agentId/lists
router.get('/:agentId/lists', async (req, res) => {
  try {
    const items = await ListItem.find({ assignedTo: req.params.agentId })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assigned items' })
  }
})


export default router;
