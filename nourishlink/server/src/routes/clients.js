const express = require('express');
const { body } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  createClient,
  getClient,
  updateClient,
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
router.get('/:id', getClient);
router.patch('/:id', updateClient);
router.get('/pending', authorize('staff'), getPendingClients);
router.patch('/:id/eligibility', authorize('staff'), updateEligibility);

// Document upload route
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

      // Create document record
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
