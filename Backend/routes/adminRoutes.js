const express = require('express');
const router = express.Router();
const { getUserEngagement } = require('../controllers/analyticsController');

// Existing admin routes can be added here if any
// For now, adding only the requested user analytics route
// Do NOT change existing working routes

router.get('/analytics/user/:userId', getUserEngagement);

module.exports = router;

