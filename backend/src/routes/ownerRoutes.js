const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, roleMiddleware(['OWNER']), ownerController.getDashboard);
router.get('/ratings', authMiddleware, roleMiddleware(['OWNER']), ownerController.getRatings);

module.exports = router;
