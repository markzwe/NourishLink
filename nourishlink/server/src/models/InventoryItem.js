const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InventoryCategory',
    required: [true, 'Category is required'],
  },
  storageZoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StorageZone',
    required: [true, 'Storage zone is required'],
  },
  currentQty: {
    type: Number,
    required: [true, 'Current quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  unitOfMeasure: {
    type: String,
    required: [true, 'Unit of measure is required'],
    enum: ['lbs', 'kg', 'pieces', 'boxes', 'gallons', 'liters', 'dozen'],
  },
  batchNumber: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
  dateLastAudited: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
inventoryItemSchema.index({ categoryId: 1 });
inventoryItemSchema.index({ storageZoneId: 1 });
inventoryItemSchema.index({ expiryDate: 1 });
inventoryItemSchema.index({ currentQty: 1 });

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
