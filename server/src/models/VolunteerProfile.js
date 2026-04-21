const mongoose = require('mongoose');

const volunteerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
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
  emergencyContactName: {
    type: String,
    required: [true, 'Emergency contact name is required'],
  },
  emergencyContactPhone: {
    type: String,
    required: [true, 'Emergency contact phone is required'],
  },
  availability: {
    weekdays: {
      morning: { type: Boolean, default: false },
      afternoon: { type: Boolean, default: false },
      evening: { type: Boolean, default: false },
    },
    weekends: {
      morning: { type: Boolean, default: false },
      afternoon: { type: Boolean, default: false },
      evening: { type: Boolean, default: false },
    },
  },
  skills: {
    type: [String],
    enum: ['food_distribution', 'inventory_management', 'donation_processing', 'client_services', 'administrative', 'driving', 'heavy_lifting', 'bilingual'],
  },
  totalHoursContributed: {
    type: Number,
    default: 0,
    min: [0, 'Total hours cannot be negative'],
  },
  preferredShiftLength: {
    type: String,
    enum: ['2_hours', '4_hours', '6_hours', '8_hours'],
    default: '4_hours',
  },
  backgroundCheckDate: {
    type: Date,
  },
  backgroundCheckStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'expired'],
    default: 'pending',
  },
  orientationCompleted: {
    type: Boolean,
    default: false,
  },
  orientationDate: {
    type: Date,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('VolunteerProfile', volunteerProfileSchema);
