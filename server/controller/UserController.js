import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from 'nodemailer';

// -------------------- EMAIL HELPER FUNCTION --------------------
const sendEmail = async ({ to, subject, html }) => {
  if (!to) throw new Error('No recipient specified for email');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = { 
    from: process.env.EMAIL, 
    to, 
    subject, 
    html 
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return reject(error);
      }
      console.log('Email sent:', info && info.response ? info.response : info);
      resolve(info);
    });
  });
};

// -------------------- USER REGISTRATION --------------------
export const registerUser = async (req, res) => {
  try {

    console.log(req.body);

    const { name, email, contact, password } = req.body;

    if (!name || !email || !contact || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = new User({
      name,
      email,
      contact,
      password
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user
    });

  } catch (err) {

    console.log("Registration Error");
    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
};

// -------------------- FORGOT PASSWORD --------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate random 6-digit temporary password
    const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated temp password:", tempPassword);

    // Assign temporary password (will be hashed by pre-save hook)
    user.password = tempPassword;
    await user.save();

    // Send temporary password via email
    const html = `<p>Hello ${user.name},</p>
                  <p>A password reset was requested for your account. Use the temporary password below to log in and then change your password immediately.</p>
                  <p><strong>Temporary password:</strong> ${tempPassword}</p>
                  <p>This temporary password is valid for a limited time. If you did not request this, please contact support immediately.</p>
                  <p>Best regards,<br>Your Company Name</p>`;

    try {
      await sendEmail({ 
        to: user.email, 
        subject: 'Password Reset - Temporary Password', 
        html 
      });
    } catch (emailErr) {
      console.error('forgotPassword email error:', emailErr);
      return res.status(500).json({ message: 'Temporary password created but failed to send email' });
    }

    return res.status(200).json({ message: 'Temporary password sent to your email ✅' });
  } catch (error) {
    console.error('forgotPassword error:', error);
    return res.status(500).json({ message: 'Failed to reset password ❌', error: error.message });
  }
};

// -------------------- USER LOGIN --------------------
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid Email"
            });

        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// -------------------- CHANGE PASSWORD --------------------
export const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }

    let user = null;

    // Find user by email or JWT token
    if (email) {
      user = await User.findOne({ email });
    } else {
      const auth = req.headers?.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Email not provided and no authorization token found' });
      }
      const token = auth.split(' ')[1];
      try {
        const decoded = jwt.verify(token, 'secretKey123');
        user = await User.findById(decoded.id);
      } catch (e) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect ❌' });

    // Set new password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();
    
    return res.status(200).json({ message: 'Password changed successfully ✅' });
  } catch (error) {
    console.error('changePassword error:', error);
    return res.status(500).json({ message: 'Failed to change password ❌', error: error.message });
  }
};

// -------------------- GET ALL USERS --------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      message: "Users fetched successfully ✅",
      users: users
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users ❌", error: error.message });
  }
};

// -------------------- GET USER BY ID --------------------
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "User fetched successfully ✅",
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user ❌", error: error.message });
  }
};

// -------------------- UPDATE USER PROFILE --------------------
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // Remove password from update data if present
    if (updateData.password) {
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "User profile updated successfully ✅",
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user profile ❌", error: error.message });
  }
};

// -------------------- DELETE USER --------------------
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "User deleted successfully ✅"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user ❌", error: error.message });
  }
};