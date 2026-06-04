const pool = require('../config/database');

const getDashboard = async (ownerId) => {
    const [stores] = await pool.promise().query(`
        SELECT s.id, s.name, s.email, s.address,
               COALESCE(AVG(r.rating), 0) as average_rating,
               COUNT(r.id) as total_ratings
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
        WHERE s.owner_id = ?
        GROUP BY s.id
    `, [ownerId]);

    const totalRatings = stores.reduce((sum, store) => sum + Number(store.total_ratings), 0);

    return { stores, totalRatings };
};

const getRatings = async (ownerId) => {
    const [ratings] = await pool.promise().query(`
        SELECT u.name as user_name, u.email, r.rating, s.name as store_name, r.created_at
        FROM ratings r
        JOIN users u ON r.user_id = u.id
        JOIN stores s ON r.store_id = s.id
        WHERE s.owner_id = ?
        ORDER BY r.created_at DESC
    `, [ownerId]);
    return ratings;
};

module.exports = {
    getDashboard,
    getRatings
};
