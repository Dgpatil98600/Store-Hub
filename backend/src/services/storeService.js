const pool = require('../config/database');

const getStores = async (filters, userId) => {
    let query = `
        SELECT s.id, s.name, s.address, 
               COALESCE(AVG(r.rating), 0) as average_rating,
               ur.rating as user_rating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
        LEFT JOIN ratings ur ON s.id = ur.store_id AND ur.user_id = ?
    `;
    const conditions = [];
    const params = [userId];

    if (filters.name) {
        conditions.push('s.name LIKE ?');
        params.push(`%${filters.name}%`);
    }
    if (filters.address) {
        conditions.push('s.address LIKE ?');
        params.push(`%${filters.address}%`);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' GROUP BY s.id, ur.rating';
    query += ' ORDER BY s.name ASC';

    const [rows] = await pool.promise().query(query, params);
    return rows;
};

module.exports = {
    getStores
};
