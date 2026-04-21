const mongoose = require('mongoose');

const inventoryCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
  },
  minStockAlertLevel: {
    type: Number,
    required: [true, 'Minimum stock alert level is required'],
    min: [0, 'Minimum stock cannot be negative'],
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  storageZoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StorageZone',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('InventoryCategory', inventoryCategorySchema);
