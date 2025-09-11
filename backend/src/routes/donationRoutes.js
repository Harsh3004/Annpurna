const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createDonation } = require('../controllers/donationController');

router.post('/', auth, createDonation);

module.exports = router;
