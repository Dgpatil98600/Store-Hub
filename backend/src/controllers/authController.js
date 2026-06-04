const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, address } = req.body;
        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const userId = await authService.createUser({ name, email, password, address });

        const user = await authService.findUserByEmail(email);
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({
            message: 'User registered successfully',
            userId,
            token,
            user: { id: user.id, name: user.name, email: user.email, address: user.address, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const user = await authService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (role && user.role !== role) {
            return res.status(401).json({ message: `No ${role.toLowerCase()} account found with this email` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            token,
            role: user.role,
            user: { id: user.id, name: user.name, email: user.email, address: user.address, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};
