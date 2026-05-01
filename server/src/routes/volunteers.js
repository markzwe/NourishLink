const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const VolunteerProfile = require('../models/VolunteerProfile');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @desc    Create volunteer profile
// @route   POST /api/volunteers
// @access  Private (Volunteer)
router.post('/volunteers', authorize('volunteer'), async (req, res, next) => {
  try {
    // Check if volunteer profile already exists
    const existingProfile = await VolunteerProfile.findOne({ userId: req.user.id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Volunteer profile already exists'
      });
    }

    const volunteerProfile = await VolunteerProfile.create({
      userId: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: volunteerProfile
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get volunteer profile
// @route   GET /api/volunteers/:id
// @access  Private (Volunteer/Staff)
router.get('/volunteers/:id', async (req, res, next) => {
  try {
    const volunteerProfile = await VolunteerProfile.findById(req.params.id)
      .populate('userId', 'firstName lastName email');

    if (!volunteerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer profile not found'
      });
    }

    // Check authorization
    if (req.user.role === 'volunteer' && volunteerProfile.userId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this profile'
      });
    }

    res.status(200).json({
      success: true,
      data: volunteerProfile
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update volunteer profile
// @route   PATCH /api/volunteers/:id
// @access  Private (Volunteer/Staff)
router.patch('/volunteers/:id', async (req, res, next) => {
  try {
    let volunteerProfile = await VolunteerProfile.findById(req.params.id);

    if (!volunteerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer profile not found'
      });
    }

    // Check authorization
    if (req.user.role === 'volunteer' && volunteerProfile.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    volunteerProfile = await VolunteerProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: volunteerProfile
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get available shifts
// @route   GET /api/shifts
// @access  Private (Volunteer/Staff)
router.get('/shifts', authorize('volunteer', 'staff'), async (req, res, next) => {
  try {
    // This would get available shifts from the database
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

// @desc    Sign up for shift
// @route   POST /api/shifts/:id/signup
// @access  Private (Volunteer)
router.post('/shifts/:id/signup', authorize('volunteer'), async (req, res, next) => {
  try {
    // This would create a shift assignment
    // For now, return success as placeholder
    res.status(201).json({
      success: true,
      message: 'Successfully signed up for shift'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Cancel shift
// @route   PATCH /api/shifts/:id/cancel
// @access  Private (Volunteer/Staff)
router.patch('/shifts/:id/cancel', async (req, res, next) => {
  try {
    // This would cancel a shift assignment
    // For now, return success as placeholder
    res.status(200).json({
      success: true,
      message: 'Shift cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Check in to shift
// @route   PATCH /api/shifts/:id/checkin
// @access  Private (Volunteer/Staff)
router.patch('/shifts/:id/checkin', async (req, res, next) => {
  try {
    // This would record a check-in time
    // For now, return success as placeholder
    res.status(200).json({
      success: true,
      message: 'Checked in successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Check out from shift
// @route   PATCH /api/shifts/:id/checkout
// @access  Private (Volunteer/Staff)
router.patch('/shifts/:id/checkout', async (req, res, next) => {
  try {
    // This would record a check-out time and calculate hours
    // For now, return success as placeholder
    res.status(200).json({
      success: true,
      message: 'Checked out successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get volunteer history
// @route   GET /api/volunteers/history/me
// @access  Private (Volunteer)
router.get('/volunteers/history/me', authorize('volunteer'), async (req, res, next) => {
  try {
    // This would get volunteer's shift history
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

module.exports = router;
