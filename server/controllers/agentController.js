import ActivityLog from '../models/ActivityLog.js';
import Agent from '../models/Agent.js';
import '../models/ListItem.js';
import bcrypt from 'bcrypt';

export const createAgent = async (req, res) => {
  const { name, email, phone,  department, status } = req.body;
  try {
    // const hashed = await bcrypt.hash(password, 10);
    const agent = await Agent.create({
       name,
      email, 
      phone, 
      // password: hashed,
      department,
      status 
    });
    res.status(201).json(agent);
    await ActivityLog.create({
  type: "agent",
  message: `New agent ${agent.name} added.`,
})

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().populate('assignedLists');
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
