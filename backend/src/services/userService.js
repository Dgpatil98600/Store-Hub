const pool = require('../config/database');

const getUserById = async (id) => {
    const [rows] = await pool.promise().query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

const updatePassword = async (id, password) => {
    await pool.promise().query('UPDATE users SET password = ? WHERE id = ?', [password, id]);
};

module.exports = {
    getUserById,
    updatePassword
};
