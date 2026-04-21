const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const DonorProfile = require('../models/DonorProfile');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @desc    Create donor profile
// @route   POST /api/donors
// @access  Private (Donor)
router.post('/', authorize('donor'), async (req, res, next) => {
  try {
    // Check if donor profile already exists
    const existingProfile = await DonorProfile.findOne({ userId: req.user.id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Donor profile already exists'
      });
    }

    const donorProfile = await DonorProfile.create({
      userId: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: donorProfile
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get donor profile
// @route   GET /api/donors/:id
// @access  Private (Donor/Staff)
router.get('/:id', async (req, res, next) => {
  try {
    const donorProfile = await DonorProfile.findById(req.params.id)
      .populate('userId', 'firstName lastName email');

    if (!donorProfile) {
      return res.status(404).json({
        success: false,
        message: 'Donor profile not found'
      });
    }

    // Check authorization
    if (req.user.role === 'donor' && donorProfile.userId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this profile'
      });
    }

    res.status(200).json({
      success: true,
      data: donorProfile
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update donor profile
// @route   PATCH /api/donors/:id
// @access  Private (Donor/Staff)
router.patch('/:id', async (req, res, next) => {
  try {
    let donorProfile = await DonorProfile.findById(req.params.id);

    if (!donorProfile) {
      return res.status(404).json({
        success: false,
        message: 'Donor profile not found'
      });
    }

    // Check authorization
    if (req.user.role === 'donor' && donorProfile.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    donorProfile = await DonorProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: donorProfile
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Log donation
// @route   POST /api/donations
// @access  Private (Donor/Staff)
router.post('/donations', authorize('donor', 'staff'), async (req, res, next) => {
  try {
    // This would create a donation record
    // For now, return success as a placeholder
    res.status(201).json({
      success: true,
      message: 'Donation logged successfully',
      data: req.body
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get my donations (for logged-in donor)
// @route   GET /api/donations/my
// @access  Private (Donor)
router.get('/donations/my', authorize('donor'), async (req, res, next) => {
  try {
    // This would get donations for the logged-in donor
    // For now, return empty array as placeholder
    res.status(200).json({
      success: true,
      count: 0,
      data: []
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Process donation (staff only)
// @route   PATCH /api/donations/:id/process
// @access  Private (Staff)
router.patch('/donations/:id/process', authorize('staff'), async (req, res, next) => {
  try {
    // This would process a donation
    // For now, return success as placeholder
    res.status(200).json({
      success: true,
      message: 'Donation processed successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get donation receipt
// @route   GET /api/donations/:id/receipt
// @access  Private (Donor/Staff)
router.get('/donations/:id/receipt', async (req, res, next) => {
  try {
    // This would generate/download a receipt
    // For now, return success as placeholder
    res.status(200).json({
      success: true,
      message: 'Receipt generated successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
