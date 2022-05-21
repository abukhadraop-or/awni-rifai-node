const express = require('express');
const { adminLogin } = require('../controllers/login');

const router = express.Router();

/**
 * Handle post to /login route.
 */
router.post('', adminLogin);
router.post('/login', adminLogin);

module.exports = router;
