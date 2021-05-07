const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticate-controller');

// Authenticate
router.post('/', authController.authenticate);

module.exports = router;