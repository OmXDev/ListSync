import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import agentRoutes from './routes/agentRoutes.js'
import listRoutes from './routes/listRoutes.js';
import activityRoutes from './routes/activityRoutes.js'

const app = express();

app.use(express.json());

dotenv.config();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  
];


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  next();
});
app.options(/^\/.*$/, cors(corsOptions), (req, res) => {
  res.sendStatus(204);
});

app.use('/api/auth',authRoutes);
app.use('/api/agents',agentRoutes)
app.use('/api/lists',listRoutes)
app.use('/api/activities',activityRoutes)

connectDB();
const PORT = process.env.PORT||5000

app.listen(PORT, ()=>{
    console.log('Sever is running')
})