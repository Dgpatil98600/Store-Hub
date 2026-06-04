const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { createRatingSchema, updateRatingSchema } = require('../utils/validation');

router.post('/', authMiddleware, validate(createRatingSchema), ratingController.createOrUpdateRating);
router.put('/:storeId', authMiddleware, validate(updateRatingSchema), ratingController.updateRating);

module.exports = router;
