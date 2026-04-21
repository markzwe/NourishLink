const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientProfile',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required'],
  },
  timeSlot: {
    start: {
      type: String,
      required: [true, 'Start time is required'],
    },
    end: {
      type: String,
      required: [true, 'End time is required'],
    },
  },
  status: {
    type: String,
    enum: ['scheduled', 'checked_in', 'completed', 'cancelled', 'no_show'],
    default: 'scheduled',
  },
  dietaryNotes: {
    type: String,
  },
  checkedIn: {
    type: Date,
  },
  checkedInBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  completedAt: {
    type: Date,
  },
  cancelledAt: {
    type: Date,
  },
  cancellationReason: {
    type: String,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
appointmentSchema.index({ clientId: 1, appointmentDate: 1 });
appointmentSchema.index({ appointmentDate: 1, status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
