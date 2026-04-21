const mongoose = require('mongoose');

const clientProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  householdSize: {
    type: Number,
    required: [true, 'Household size is required'],
    min: [1, 'Household size must be at least 1'],
  },
  monthlyIncome: {
    type: Number,
    required: [true, 'Monthly income is required'],
    min: [0, 'Monthly income cannot be negative'],
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required'],
    },
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  preferredContactMethod: {
    type: String,
    enum: ['phone', 'email', 'sms'],
    default: 'phone',
  },
  eligibilityStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'expired'],
    default: 'pending',
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  lastRenewalDate: {
    type: Date,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ClientProfile', clientProfileSchema);
