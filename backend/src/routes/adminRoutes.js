const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { createUserSchema, createStoreSchema } = require('../utils/validation');

router.get('/dashboard', authMiddleware, roleMiddleware(['ADMIN']), adminController.getDashboard);
router.post('/users', authMiddleware, roleMiddleware(['ADMIN']), validate(createUserSchema), adminController.createUser);
router.get('/users', authMiddleware, roleMiddleware(['ADMIN']), adminController.getUsers);
router.get('/users/:id', authMiddleware, roleMiddleware(['ADMIN']), adminController.getUserById);
router.post('/stores', authMiddleware, roleMiddleware(['ADMIN']), validate(createStoreSchema), adminController.createStore);
router.get('/stores', authMiddleware, roleMiddleware(['ADMIN']), adminController.getStores);

module.exports = router;
