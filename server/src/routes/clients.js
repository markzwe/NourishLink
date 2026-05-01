const express = require('express');
const { body } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const ClientProfile = require('../models/ClientProfile');
const EligibilityDocument = require('../models/EligibilityDocument');
const {
  createClient,
  getClient,
  getMyClientProfile,
  updateClient,
  updateMyClientProfile,
  getPendingClients,
  updateEligibility,
} = require('../controllers/clientController');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Validation middleware
const createClientValidation = [
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  body('householdSize')
    .isInt({ min: 1 })
    .withMessage('Household size must be at least 1'),
  body('monthlyIncome')
    .isFloat({ min: 0 })
    .withMessage('Monthly income must be a positive number'),
  body('address.street')
    .notEmpty()
    .withMessage('Street address is required'),
  body('address.city')
    .notEmpty()
    .withMessage('City is required'),
  body('address.state')
    .notEmpty()
    .withMessage('State is required'),
  body('address.zipCode')
    .notEmpty()
    .withMessage('ZIP code is required'),
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required'),
  body('preferredContactMethod')
    .isIn(['phone', 'email', 'sms'])
    .withMessage('Preferred contact method must be phone, email, or sms'),
];

// Routes
router.post('/', authorize('client'), createClientValidation, createClient);
router.get('/pending', authorize('staff'), getPendingClients);
router.get('/me', authorize('client'), getMyClientProfile);
router.patch('/me', authorize('client'), updateMyClientProfile);

// Document management routes for current client
router.get('/me/documents', authorize('client'), async (req, res, next) => {
  try {
    const clientProfile = await ClientProfile.findOne({ userId: req.user.id });
    if (!clientProfile) {
      return res.status(404).json({
        success: false,
        message: 'Client profile not found'
      });
    }

    const documents = await EligibilityDocument.find({ clientId: clientProfile._id })
      .sort({ uploadedAt: -1 });

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/me/documents',
  authorize('client'),
  upload.single('document'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const { documentType } = req.body;
      const clientProfile = await ClientProfile.findOne({ userId: req.user.id });
      if (!clientProfile) {
        return res.status(404).json({
          success: false,
          message: 'Client profile not found'
        });
      }

      const document = await EligibilityDocument.create({
        clientId: clientProfile._id,
        documentType,
        fileName: req.file.originalname,
        fileUrl: `/uploads/${req.file.filename}`,
      });

      res.status(201).json({
        success: true,
        data: document
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/me/documents/:documentId', authorize('client'), async (req, res, next) => {
  try {
    const clientProfile = await ClientProfile.findOne({ userId: req.user.id });
    if (!clientProfile) {
      return res.status(404).json({
        success: false,
        message: 'Client profile not found'
      });
    }

    const document = await EligibilityDocument.findById(req.params.documentId);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    if (document.clientId.toString() !== clientProfile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this document'
      });
    }

    await EligibilityDocument.findByIdAndDelete(req.params.documentId);

    res.status(200).json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', getClient);
router.patch('/:id', updateClient);
router.patch('/:id/eligibility', authorize('staff'), updateEligibility);

// Document upload route for client or staff
router.post('/:id/documents',
  authorize('client', 'staff'),
  upload.single('document'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const { documentType } = req.body;
      const clientId = req.params.id;

      const document = await EligibilityDocument.create({
        clientId,
        documentType,
        fileName: req.file.originalname,
        fileUrl: `/uploads/${req.file.filename}`,
      });

      res.status(201).json({
        success: true,
        data: document
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
