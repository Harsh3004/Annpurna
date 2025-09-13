const express = require('express');
const router = express.Router();
const footprintController = require('../controllers/footprintController');

// Calculate carbon footprint
router.post('/calculate-footprint', footprintController.calculateFootprint);

module.exports = router;