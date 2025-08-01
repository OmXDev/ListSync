// routes/uploadRoutes.js
import express from 'express';
import { getAllListsWithAgentCount, getDistributionLists, getListDataById, uploadList } from '../controllers/listController.js';
import upload from '../middlewares/cloudinaryUpload.js';
import ListItem from '../models/ListItem.js';
// import { verifyToken } from '../middlewares/authMiddleware.js';
// 
const router = express.Router();

router.post('/upload', upload.single('file'), uploadList);
// router.get("/", getDistributionLists);
router.get('/:uploadId', getListDataById)
router.get('/', getAllListsWithAgentCount);


export default router;
