const mongoose = require('mongoose');

const eligibilityDocumentSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientProfile',
    required: true,
  },
  documentType: {
    type: String,
    required: [true, 'Document type is required'],
    enum: ['proof_of_income', 'id_document', 'address_proof', 'other'],
  },
  fileName: {
    type: String,
    required: [true, 'File name is required'],
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'],
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  verifiedAt: {
    type: Date,
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rejectionReason: {
    type: String,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('EligibilityDocument', eligibilityDocumentSchema);
