const pool = require('../config/database');
const bcrypt = require('bcrypt');

const findUserByEmail = async (email) => {
    const [rows] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const createUser = async ({ name, email, password, address }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.promise().query(
        'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, address, 'USER']
    );
    return result.insertId;
};

module.exports = {
    findUserByEmail,
    createUser
};
