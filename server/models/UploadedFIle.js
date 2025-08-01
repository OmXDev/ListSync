import mongoose from 'mongoose'

const UploadedFileSchema = new mongoose.Schema({
  uploadId: { type: String, required: true, unique: true },
  fileName: String,
  cloudinaryUrl: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('UploadedFile', UploadedFileSchema)
