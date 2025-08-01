import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import xlsx from 'xlsx'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import cloudinary from '../utils/cloudinary.js'
import ListItem from '../models/ListItem.js'
import UploadedFile from '../models/UploadedFIle.js'
import Agent from '../models/Agent.js'
import ActivityLog from '../models/ActivityLog.js'

export const uploadList = async (req, res) => {
  let tempPath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const originalName = req.file.originalname;

    // Upload to Cloudinary
    const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw',
      folder: 'distribution_lists',
    });

    // Download back locally to parse
    const response = await axios.get(cloudinaryUpload.secure_url, {
      responseType: 'arraybuffer',
    });

    const tempFilename = `temp-${uuidv4()}${ext}`;
    tempPath = path.join('temp', tempFilename);
    fs.mkdirSync('temp', { recursive: true });
    fs.writeFileSync(tempPath, response.data);

    // Parse file
    let records = [];

    if (ext === '.csv') {
      const csvData = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(tempPath)
          .pipe(csv())
          .on('data', (row) => csvData.push(row))
          .on('end', () => resolve())
          .on('error', reject);
      });
      records = csvData;
    } else if (ext === '.xlsx' || ext === '.xls') {
      const workbook = xlsx.readFile(tempPath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      records = xlsx.utils.sheet_to_json(sheet);
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    const uploadId = uuidv4();
    const createdAt = new Date();

    const agents = await Agent.find({});
    if (agents.length === 0) {
      return res.status(400).json({ error: 'No agents available to assign' });
    }

    const validItems = [];

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const firstName = record.FirstName || record.first_name || record.firstName;
      const phone = record.Phone || record.phone;
      const notes = record.Notes || record.notes;

      if (!firstName || !phone) continue;

      const assignedAgent = agents[i % agents.length];

      validItems.push({
        firstName,
        phone: String(phone),
        notes: notes || '',
        assignedTo: assignedAgent._id,              // 💡 correct schema field
        assignedUploadId: uploadId,                 // ✅ correct mapping
      });
    }

    if (validItems.length === 0) {
      return res.status(400).json({ error: 'No valid data found in file' });
    }

    const savedItems = await ListItem.insertMany(validItems);

    // Link listItems back to agents
    for (const item of savedItems) {
      await Agent.findByIdAndUpdate(item.assignedTo, {
        $push: { assignedLists: item._id },
      });
    }

    // Save the uploaded file metadata
    await UploadedFile.create({
      uploadId,
      fileName: originalName,
      cloudinaryUrl: cloudinaryUpload.secure_url,
      createdAt,
    });
    await ActivityLog.create({
      type: "upload",
      message: `${originalName} uploaded with ${validItems.length} items.`,
    })

    res.status(201).json({
      message: 'Upload & Distribution successful',
      count: validItems.length,
      uploadId,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (tempPath && fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
};

// Grouped distribution lists for frontend
export const getDistributionLists = async (req, res) => {
  try {
    const lists = await UploadedFile.aggregate([
      {
        $lookup: {
          from: 'listitems',
          localField: 'uploadId',
          foreignField: 'uploadId',
          as: 'items',
        },
      },
      {
        $project: {
          uploadId: 1,
          fileName: 1,
          cloudinaryUrl: 1,
          createdAt: 1,
          description: { $first: '$items.notes' },
          agentCount: { $size: '$items' },
          status: {
            $cond: [{ $gt: [{ $size: '$items' }, 0] }, 'active', 'inactive'],
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ])

    res.status(200).json(lists)
  } catch (err) {
    console.error('Error fetching lists:', err)
    res.status(500).json({ error: 'Failed to fetch distribution lists' })
  }
}



export const getListDataById = async (req, res) => {
  try {
    const { uploadId } = req.params;

    const file = await UploadedFile.findOne({ uploadId });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Just fetch rows directly, without incorrect populate
    const rows = await ListItem.find({ assignedUploadId: uploadId });

    res.status(200).json({
      file,
      rows
    });
  } catch (err) {
    console.error('Error fetching list data by uploadId:', err.message);
    res.status(500).json({ error: 'Failed to fetch list data' });
  }
};




export const getAllListsWithAgentCount = async (req, res) => {
  try {
    const uploadedFiles = await UploadedFile.find({}).sort({ createdAt: -1 });

    const enrichedFiles = await Promise.all(
      uploadedFiles.map(async (file) => {
        const items = await ListItem.find({ assignedUploadId: file.uploadId }, 'assignedTo');

        const uniqueAgentIds = new Set(
          items
            .filter((item) => item.assignedTo)
            .map((item) => item.assignedTo.toString())
        );

        return {
          ...file.toObject(),
          agentCount: uniqueAgentIds.size,
        };
      })
    );

    res.json(enrichedFiles);
  } catch (err) {
    console.error('Error getting lists:', err);
    res.status(500).json({ error: 'Failed to fetch distribution lists' });
  }
};

