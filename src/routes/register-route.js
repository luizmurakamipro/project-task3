const express = require('express');
const router = express.Router();
const regController = require('../controllers/register-controller');

// Register
router.post('/', regController.register);

module.exports = router;