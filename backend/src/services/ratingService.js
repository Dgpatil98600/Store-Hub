const pool = require('../config/database');

const createOrUpdateRating = async ({ userId, storeId, rating }) => {
    const [existingRating] = await pool.promise().query('SELECT * FROM ratings WHERE user_id = ? AND store_id = ?', [userId, storeId]);
    if (existingRating.length > 0) {
        await pool.promise().query('UPDATE ratings SET rating = ? WHERE id = ?', [rating, existingRating[0].id]);
    } else {
        await pool.promise().query('INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)', [userId, storeId, rating]);
    }
};

const updateRating = async ({ userId, storeId, rating }) => {
    await pool.promise().query('UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?', [rating, userId, storeId]);
};

module.exports = {
    createOrUpdateRating,
    updateRating
};
