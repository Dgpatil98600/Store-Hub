const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { updatePasswordSchema } = require('../utils/validation');

router.put('/password', authMiddleware, validate(updatePasswordSchema), userController.updatePassword);

module.exports = router;
