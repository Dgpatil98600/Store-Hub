const ratingService = require('../services/ratingService');

exports.createOrUpdateRating = async (req, res, next) => {
    try {
        const { storeId, rating } = req.body;
        const userId = req.user.id;
        await ratingService.createOrUpdateRating({ userId, storeId, rating });
        res.status(201).json({ message: 'Rating submitted successfully' });
    } catch (error) {
        next(error);
    }
};

exports.updateRating = async (req, res, next) => {
    try {
        const { storeId } = req.params;
        const { rating } = req.body;
        const userId = req.user.id;
        await ratingService.updateRating({ userId, storeId, rating });
        res.json({ message: 'Rating updated successfully' });
    } catch (error) {
        next(error);
    }
};
