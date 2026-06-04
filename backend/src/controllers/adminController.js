const adminService = require('../services/adminService');
const bcrypt = require('bcrypt');

exports.getDashboard = async (req, res, next) => {
    try {
        const stats = await adminService.getDashboardStats();
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password, address, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await adminService.createUser({ name, email, password: hashedPassword, address, role });
        res.status(201).json({ message: 'User created successfully', userId });
    } catch (error) {
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await adminService.getUsers(req.query);
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await adminService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.createStore = async (req, res, next) => {
    try {
        const storeId = await adminService.createStore(req.body);
        res.status(201).json({ message: 'Store created successfully', storeId });
    } catch (error) {
        next(error);
    }
};

exports.getStores = async (req, res, next) => {
    try {
        const stores = await adminService.getStores(req.query);
        res.json(stores);
    } catch (error) {
        next(error);
    }
};
