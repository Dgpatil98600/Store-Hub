const userService = require('../services/userService');
const bcrypt = require('bcrypt');

exports.updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userService.updatePassword(userId, hashedPassword);

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        next(error);
    }
};
