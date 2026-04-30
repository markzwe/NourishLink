const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const DonorProfile = require('../models/DonorProfile');

const router = express.Router();
let donationIdCounter = 1;
const donationsStore = [];

// All routes require authentication
router.use(auth);

// @desc    Create donor profile
// @route   POST /api/donors
// @access  Private (Donor)
router.post('/donors', authorize('donor'), async (req, res, next) => {
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
router.get('/donors/:id', async (req, res, next) => {
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
router.patch('/donors/:id', async (req, res, next) => {
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
    const donation = {
      id: String(donationIdCounter++),
      donorId: req.user.id,
      donorName: `${req.user.firstName} ${req.user.lastName}`,
      dropoffDate: req.body.dropoffDate,
      dropoffTime: req.body.dropoffTime,
      status: 'scheduled',
      totalWeight: Number(req.body.totalWeight || 0),
      items: Array.isArray(req.body.items) ? req.body.items : [],
      notes: req.body.notes || '',
      contactPhone: req.body.contactPhone || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    donationsStore.push(donation);

    res.status(201).json({
      success: true,
      message: 'Donation logged successfully',
      data: donation
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
    const myDonations = donationsStore.filter((donation) => donation.donorId === req.user.id);
    res.status(200).json({
      success: true,
      count: myDonations.length,
      data: myDonations
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get incoming donations (staff)
// @route   GET /api/donations/incoming
// @access  Private (Staff)
router.get('/donations/incoming', authorize('staff'), async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: donationsStore.length,
      data: donationsStore
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
    const donation = donationsStore.find((entry) => entry.id === req.params.id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    if (donation.status === 'scheduled') {
      donation.status = 'processing';
    } else if (donation.status === 'processing') {
      donation.status = 'completed';
    }
    donation.updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: 'Donation status updated successfully',
      data: donation
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
    const donation = donationsStore.find((entry) => entry.id === req.params.id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    if (req.user.role === 'donor' && donation.donorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this receipt'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Receipt generated successfully',
      data: {
        donationId: donation.id,
        donorName: donation.donorName,
        totalWeight: donation.totalWeight,
        dropoffDate: donation.dropoffDate,
        status: donation.status
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
