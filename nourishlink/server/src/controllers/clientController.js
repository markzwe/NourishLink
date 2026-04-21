const { body, validationResult } = require('express-validator');
const ClientProfile = require('../models/ClientProfile');
const EligibilityDocument = require('../models/EligibilityDocument');
const User = require('../models/User');

// @desc    Create client profile
// @route   POST /api/clients
// @access  Private (Client)
const createClient = async (req, res, next) => {
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

    const {
      dateOfBirth,
      householdSize,
      monthlyIncome,
      address,
      phone,
      preferredContactMethod,
    } = req.body;

    // Check if client profile already exists
    const existingProfile = await ClientProfile.findOne({ userId: req.user.id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Client profile already exists'
      });
    }

    // Create client profile
    const clientProfile = await ClientProfile.create({
      userId: req.user.id,
      dateOfBirth,
      householdSize,
      monthlyIncome,
      address,
      phone,
      preferredContactMethod,
    });

    res.status(201).json({
      success: true,
      data: clientProfile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get client profile
// @route   GET /api/clients/:id
// @access  Private (Client/Staff)
const getClient = async (req, res, next) => {
  try {
    const clientProfile = await ClientProfile.findById(req.params.id)
      .populate('userId', 'firstName lastName email');

    if (!clientProfile) {
      return res.status(404).json({
        success: false,
        message: 'Client profile not found'
      });
    }

    // Check authorization
    if (req.user.role === 'client' && clientProfile.userId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this profile'
      });
    }

    res.status(200).json({
      success: true,
      data: clientProfile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update client profile
// @route   PATCH /api/clients/:id
// @access  Private (Client/Staff)
const updateClient = async (req, res, next) => {
  try {
    let clientProfile = await ClientProfile.findById(req.params.id);

    if (!clientProfile) {
      return res.status(404).json({
        success: false,
        message: 'Client profile not found'
      });
    }

    // Check authorization
    if (req.user.role === 'client' && clientProfile.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    clientProfile = await ClientProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: clientProfile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get pending client applications
// @route   GET /api/clients/pending
// @access  Private (Staff)
const getPendingClients = async (req, res, next) => {
  try {
    const clients = await ClientProfile.find({ eligibilityStatus: 'pending' })
      .populate('userId', 'firstName lastName email')
      .sort({ applicationDate: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update client eligibility status
// @route   PATCH /api/clients/:id/eligibility
// @access  Private (Staff)
const updateEligibility = async (req, res, next) => {
  try {
    const { eligibilityStatus, notes } = req.body;

    const clientProfile = await ClientProfile.findByIdAndUpdate(
      req.params.id,
      {
        eligibilityStatus,
        lastRenewalDate: eligibilityStatus === 'approved' ? new Date() : undefined,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!clientProfile) {
      return res.status(404).json({
        success: false,
        message: 'Client profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: clientProfile
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getClient,
  updateClient,
  getPendingClients,
  updateEligibility,
};
