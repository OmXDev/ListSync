import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['admin'], default: 'admin' }
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
