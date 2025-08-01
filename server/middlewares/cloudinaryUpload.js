// middlewares/cloudinaryUpload.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // To use .env variables

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define allowed file types
const allowedTypes = ['.csv', '.xlsx', '.xls'];

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    resource_type: 'raw', // For non-image files
    format: async (req, file) => {
      const ext = file.originalname.split('.').pop();
      if (!allowedTypes.includes(`.${ext.toLowerCase()}`)) {
        throw new Error('Only CSV, XLSX, or XLS files are allowed');
      }
      return ext;
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
  },
});

const upload = multer({ storage });

export default upload;
