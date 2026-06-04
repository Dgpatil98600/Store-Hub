const pool = require('../config/database');

const getDashboardStats = async () => {
    const [userRows] = await pool.promise().query('SELECT COUNT(*) as totalUsers FROM users');
    const [storeRows] = await pool.promise().query('SELECT COUNT(*) as totalStores FROM stores');
    const [ratingRows] = await pool.promise().query('SELECT COUNT(*) as totalRatings FROM ratings');
    return {
        totalUsers: userRows[0].totalUsers,
        totalStores: storeRows[0].totalStores,
        totalRatings: ratingRows[0].totalRatings
    };
};

const createUser = async (user) => {
    const { name, email, password, address, role } = user;
    const [result] = await pool.promise().query(
        'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, address, role]
    );
    return result.insertId;
};

const getUsers = async (filters) => {
    let query = 'SELECT id, name, email, address, role, created_at FROM users';
    const conditions = [];
    const params = [];

    if (filters.name) {
        conditions.push('name LIKE ?');
        params.push(`%${filters.name}%`);
    }
    if (filters.email) {
        conditions.push('email LIKE ?');
        params.push(`%${filters.email}%`);
    }
    if (filters.address) {
        conditions.push('address LIKE ?');
        params.push(`%${filters.address}%`);
    }
    if (filters.role) {
        conditions.push('role = ?');
        params.push(filters.role);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    const allowedSortFields = ['name', 'email'];
    const sortField = allowedSortFields.includes(filters.sortBy) ? filters.sortBy : 'name';
    const sortOrder = filters.sortOrder === 'desc' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;

    const [rows] = await pool.promise().query(query, params);
    return rows;
};

const getUserById = async (id) => {
    const [rows] = await pool.promise().query('SELECT id, name, email, address, role, created_at FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return null;

    const user = rows[0];

    if (user.role === 'OWNER') {
        const [storeRows] = await pool.promise().query(`
            SELECT s.id, s.name, COALESCE(AVG(r.rating), 0) as average_rating, COUNT(r.id) as total_ratings
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            WHERE s.owner_id = ?
            GROUP BY s.id
        `, [id]);
        user.stores = storeRows;

        const [avgRow] = await pool.promise().query(`
            SELECT COALESCE(AVG(r.rating), 0) as overall_average_rating
            FROM ratings r
            JOIN stores s ON r.store_id = s.id
            WHERE s.owner_id = ?
        `, [id]);
        user.overallAverageRating = avgRow[0].overall_average_rating;
    }

    return user;
};

const createStore = async (store) => {
    const { name, email, address, owner_id } = store;
    const [result] = await pool.promise().query(
        'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
        [name, email, address, owner_id]
    );
    return result.insertId;
};

const getStores = async (filters) => {
    let baseQuery = `
        SELECT s.id, s.name, s.email, s.address, COALESCE(AVG(r.rating), 0) as average_rating, COUNT(r.id) as total_ratings
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
    `;
    const conditions = [];
    const params = [];

    if (filters.name) {
        conditions.push('s.name LIKE ?');
        params.push(`%${filters.name}%`);
    }
    if (filters.email) {
        conditions.push('s.email LIKE ?');
        params.push(`%${filters.email}%`);
    }
    if (filters.address) {
        conditions.push('s.address LIKE ?');
        params.push(`%${filters.address}%`);
    }

    if (conditions.length > 0) {
        baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    baseQuery += ' GROUP BY s.id';

    const allowedSortFields = ['name', 'email'];
    if (allowedSortFields.includes(filters.sortBy)) {
        const sortOrder = filters.sortOrder === 'desc' ? 'DESC' : 'ASC';
        baseQuery += ` ORDER BY s.${filters.sortBy} ${sortOrder}`;
    } else {
        baseQuery += ' ORDER BY s.name ASC';
    }

    const [rows] = await pool.promise().query(baseQuery, params);
    return rows;
};

module.exports = {
    getDashboardStats,
    createUser,
    getUsers,
    getUserById,
    createStore,
    getStores
};
