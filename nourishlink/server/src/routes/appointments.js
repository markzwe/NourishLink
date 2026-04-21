const express = require('express');
const { body } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const Appointment = require('../models/Appointment');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private (Client/Staff)
router.post('/', authorize('client', 'staff'), async (req, res, next) => {
  try {
    const { clientId, appointmentDate, timeSlot, dietaryNotes } = req.body;

    // If client is creating appointment, use their own ID
    const finalClientId = req.user.role === 'client' ? req.user.id : clientId;

    const appointment = await Appointment.create({
      clientId: finalClientId,
      appointmentDate,
      timeSlot,
      dietaryNotes,
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get my appointments (for logged-in client)
// @route   GET /api/appointments/my
// @access  Private (Client)
router.get('/my', authorize('client'), async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ clientId: req.user.id })
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Cancel appointment
// @route   PATCH /api/appointments/:id/cancel
// @access  Private (Client/Staff)
router.patch('/:id/cancel', authorize('client', 'staff'), async (req, res, next) => {
  try {
    const { cancellationReason } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    if (req.user.role === 'client' && appointment.clientId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this appointment'
      });
    }

    appointment.status = 'cancelled';
    appointment.cancelledAt = new Date();
    appointment.cancellationReason = cancellationReason;

    await appointment.save();

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update appointment capacity (staff only)
// @route   PATCH /api/appointments/capacity/:date
// @access  Private (Staff)
router.patch('/capacity/:date', authorize('staff'), async (req, res, next) => {
  try {
    const { capacity } = req.body;
    const date = req.params.date;

    // This would typically update a daily capacity setting
    // For now, return success as a placeholder
    res.status(200).json({
      success: true,
      message: `Capacity updated for ${date}`,
      capacity
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
