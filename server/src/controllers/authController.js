const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user (simplified - name and role only)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, role } = req.body;

    // Split name into first and last name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || 'User';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create a temporary user object (no database lookup needed)
    const tempUser = {
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email: `${firstName.toLowerCase().replace(/\s+/g, '.')}@temp.com`,
      role,
      isActive: true,
    };

    // Generate token
    const token = generateToken(tempUser._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: tempUser._id,
        firstName: tempUser.firstName,
        lastName: tempUser.lastName,
        email: tempUser.email,
        role: tempUser.role,
        isActive: tempUser.isActive,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user (simplified - from token only)
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    // For simplified auth, we'll return basic user info from the token
    // In a real implementation, you might want to store user sessions
    const user = {
      id: req.user.id,
      firstName: 'User', // Default fallback
      lastName: '',
      email: 'user@temp.com',
      role: 'client', // Default fallback
      isActive: true,
    };

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
