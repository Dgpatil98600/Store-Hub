const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, storeController.getStores);

module.exports = router;
