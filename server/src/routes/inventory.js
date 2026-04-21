const express = require('express');
const { body } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const InventoryCategory = require('../models/InventoryCategory');
const InventoryItem = require('../models/InventoryItem');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @desc    Create inventory category
// @route   POST /api/inventory/categories
// @access  Private (Staff)
router.post('/categories', authorize('staff'), async (req, res, next) => {
  try {
    const category = await InventoryCategory.create(req.body);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all inventory categories
// @route   GET /api/inventory/categories
// @access  Private (Staff)
router.get('/categories', authorize('staff'), async (req, res, next) => {
  try {
    const categories = await InventoryCategory.find({ isActive: true });
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create inventory item
// @route   POST /api/inventory/items
// @access  Private (Staff)
router.post('/items', authorize('staff'), async (req, res, next) => {
  try {
    const item = await InventoryItem.create(req.body);
    res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all inventory items
// @route   GET /api/inventory/items
// @access  Private (Staff)
router.get('/items', authorize('staff'), async (req, res, next) => {
  try {
    const items = await InventoryItem.find({ isActive: true })
      .populate('categoryId', 'name')
      .populate('storageZoneId', 'storageBayId temperatureRequirement');
    
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update inventory item
// @route   PATCH /api/inventory/items/:id
// @access  Private (Staff)
router.patch('/items/:id', authorize('staff'), async (req, res, next) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get low stock items
// @route   GET /api/inventory/low-stock
// @access  Private (Staff)
router.get('/low-stock', authorize('staff'), async (req, res, next) => {
  try {
    const lowStockItems = await InventoryItem.aggregate([
      {
        $lookup: {
          from: 'inventorycategories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $match: {
          $expr: {
            $lte: ['$currentQty', '$category.minStockAlertLevel']
          },
          isActive: true
        }
      },
      {
        $populate: {
          path: 'categoryId',
          select: 'name'
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: lowStockItems.length,
      data: lowStockItems
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get expiring items
// @route   GET /api/inventory/expiring
// @access  Private (Staff)
router.get('/expiring', authorize('staff'), async (req, res, next) => {
  try {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const expiringItems = await InventoryItem.find({
      expiryDate: { $lte: thirtyDaysFromNow },
      isActive: true
    })
      .populate('categoryId', 'name')
      .sort({ expiryDate: 1 });

    res.status(200).json({
      success: true,
      count: expiringItems.length,
      data: expiringItems
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
