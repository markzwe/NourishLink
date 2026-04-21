const mongoose = require('mongoose');

const donorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  donorType: {
    type: String,
    enum: ['individual', 'organization', 'business'],
    required: [true, 'Donor type is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
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
  taxExemptId: {
    type: String,
  },
  totalDonationsToDate: {
    type: Number,
    default: 0,
    min: [0, 'Total donations cannot be negative'],
  },
  organizationName: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  preferredDropoffTimes: {
    type: String,
  },
  donationFrequency: {
    type: String,
    enum: ['one_time', 'weekly', 'bi_weekly', 'monthly', 'quarterly', 'annually'],
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('DonorProfile', donorProfileSchema);
