import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: {
      countryCode: {
        type: String,
        required: true,
        trim: true,
        match: /^\+\d{1,4}$/, 
      },
      number: {
        type: String,
        required: true,
        trim: true,
        match: /^\d{7,15}$/, 
      },
      fullNumber: {
        type: String,
        required: true,
        unique: true, 
      },
    },
    // password: { type: String, required: true }, 
    department:{type:String,  enum:['sales','marketing','support','operations'],default:'operations'},
    status:{type: String, enum:['active','inactive'], default:'active'},

    assignedLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ListItem' }],
  },
  { timestamps: true }
);

agentSchema.pre('save', function (next) {
  if (this.isModified('phone')) {
    this.phone.fullNumber = `${this.phone.countryCode}${this.phone.number}`;
  }
  next();
});

export default mongoose.model('Agent', agentSchema);
