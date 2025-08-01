import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid Email' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid Password' });

    const token = jwt.sign({ id: user._id, email: user.email },
      process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Logged in successfully',
      data: {
        token
      },
      success: true
    });


  } catch (err) {
    res.status(500).json({
      error: err.message,
      msg: 'Server Error',
      success: false
    });
  }
};


export const logout = async (req, res) => {
  try {
    // If using cookies:
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Logout failed",
      error: err.message,
      success: false,
    });
  }
};

