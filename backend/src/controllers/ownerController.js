const ownerService = require('../services/ownerService');

exports.getDashboard = async (req, res, next) => {
    try {
        const dashboardData = await ownerService.getDashboard(req.user.id);
        res.json(dashboardData);
    } catch (error) {
        next(error);
    }
};

exports.getRatings = async (req, res, next) => {
    try {
        const ratings = await ownerService.getRatings(req.user.id);
        res.json(ratings);
    } catch (error) {
        next(error);
    }
};
