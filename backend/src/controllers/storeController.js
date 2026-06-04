const storeService = require('../services/storeService');

exports.getStores = async (req, res, next) => {
    try {
        const stores = await storeService.getStores(req.query, req.user.id);
        res.json(stores);
    } catch (error) {
        next(error);
    }
};
