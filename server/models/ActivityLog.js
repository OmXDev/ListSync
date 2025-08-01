
import mongoose from "mongoose"

const activityLogSchema = new mongoose.Schema({
  type: { type: String, enum: ['agent', 'upload', 'list'], required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("ActivityLog", activityLogSchema)
