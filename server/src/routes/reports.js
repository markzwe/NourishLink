const express = require('express');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @desc    Get summary report
// @route   GET /api/reports/summary
// @access  Private (Staff)
router.get('/summary', authorize('staff'), async (req, res, next) => {
  try {
    // This would generate a summary report with key metrics
    // For now, return placeholder data
    const summary = {
      totalClients: 150,
      activeClients: 120,
      totalDonations: 450,
      totalVolunteers: 25,
      activeVolunteers: 20,
      lowStockItems: 8,
      pendingApplications: 12,
    };

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get inventory report
// @route   GET /api/reports/inventory
// @access  Private (Staff)
router.get('/inventory', authorize('staff'), async (req, res, next) => {
  try {
    // This would generate an inventory report
    // For now, return placeholder data
    const inventoryReport = {
      totalItems: 85,
      lowStockItems: 8,
      expiringItems: 12,
      totalValue: 15000,
      categories: [
        { name: 'Canned Goods', count: 25, value: 3000 },
        { name: 'Fresh Produce', count: 20, value: 2000 },
        { name: 'Dry Goods', count: 15, value: 4000 },
        { name: 'Dairy', count: 10, value: 2500 },
        { name: 'Meat', count: 8, value: 3500 },
        { name: 'Bakery', count: 7, value: 1000 },
      ],
    };

    res.status(200).json({
      success: true,
      data: inventoryReport
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get donations report
// @route   GET /api/reports/donations
// @access  Private (Staff)
router.get('/donations', authorize('staff'), async (req, res, next) => {
  try {
    // This would generate a donations report
    // For now, return placeholder data
    const donationsReport = {
      totalDonations: 450,
      totalWeight: 12500,
      totalValue: 25000,
      topDonors: [
        { name: 'Local Grocery Store', donations: 45, weight: 3500 },
        { name: 'Food Bank', donations: 32, weight: 2800 },
        { name: 'Community Farm', donations: 28, weight: 2200 },
      ],
      monthlyTrend: [
        { month: 'Jan', donations: 35, weight: 980 },
        { month: 'Feb', donations: 42, weight: 1150 },
        { month: 'Mar', donations: 38, weight: 1050 },
      ],
    };

    res.status(200).json({
      success: true,
      data: donationsReport
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get volunteers report
// @route   GET /api/reports/volunteers
// @access  Private (Staff)
router.get('/volunteers', authorize('staff'), async (req, res, next) => {
  try {
    // This would generate a volunteers report
    // For now, return placeholder data
    const volunteersReport = {
      totalVolunteers: 25,
      activeVolunteers: 20,
      totalHours: 1250,
      averageHoursPerVolunteer: 50,
      topVolunteers: [
        { name: 'John Smith', hours: 120, shifts: 30 },
        { name: 'Jane Doe', hours: 95, shifts: 24 },
        { name: 'Bob Johnson', hours: 88, shifts: 22 },
      ],
      skillDistribution: [
        { skill: 'Food Distribution', count: 15 },
        { skill: 'Inventory Management', count: 8 },
        { skill: 'Donation Processing', count: 12 },
        { skill: 'Client Services', count: 10 },
      ],
    };

    res.status(200).json({
      success: true,
      data: volunteersReport
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get clients report
// @route   GET /api/reports/clients
// @access  Private (Staff)
router.get('/clients', authorize('staff'), async (req, res, next) => {
  try {
    // This would generate a clients report
    // For now, return placeholder data
    const clientsReport = {
      totalClients: 150,
      activeClients: 120,
      pendingApplications: 12,
      averageHouseholdSize: 3.2,
      monthlyVisits: 240,
      demographics: {
        households: [
          { size: '1-2', count: 45 },
          { size: '3-4', count: 65 },
          { size: '5+', count: 40 },
        ],
        visitFrequency: [
          { frequency: 'Weekly', count: 80 },
          { frequency: 'Bi-weekly', count: 60 },
          { frequency: 'Monthly', count: 50 },
        ],
      },
    };

    res.status(200).json({
      success: true,
      data: clientsReport
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
