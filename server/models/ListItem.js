import mongoose from 'mongoose';

const listItemSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  assignedUploadId: String
});

export default mongoose.model('ListItem', listItemSchema);
