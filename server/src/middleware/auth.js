// Simplified auth - no JWT required
const auth = async (req, res, next) => {
  // Just pass through without authentication
  req.user = { id: '1', role: 'staff' }; // Default user for demo
  next();
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied. Insufficient permissions.' 
      });
    }
    next();
  };
};

module.exports = { auth, authorize };
