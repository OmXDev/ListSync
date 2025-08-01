// seedAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new Admin({
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
