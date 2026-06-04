const Joi = require('joi');

const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

const registerSchema = Joi.object({
    name: Joi.string().min(20).max(60).required()
        .messages({
            'string.min': 'Name must be at least 20 characters',
            'string.max': 'Name must be at most 60 characters',
            'any.required': 'Name is required'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string().pattern(passwordPattern).required()
        .messages({
            'string.pattern.base': 'Password must be 8-16 characters with at least one uppercase letter and one special character',
            'any.required': 'Password is required'
        }),
    address: Joi.string().max(400).allow('', null)
        .messages({
            'string.max': 'Address must be at most 400 characters'
        })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string().required()
        .messages({
            'any.required': 'Password is required'
        }),
    role: Joi.string().valid('ADMIN', 'USER', 'OWNER').optional()
        .messages({
            'any.only': 'Role must be ADMIN, USER, or OWNER'
        })
});

const createUserSchema = Joi.object({
    name: Joi.string().min(20).max(60).required()
        .messages({
            'string.min': 'Name must be at least 20 characters',
            'string.max': 'Name must be at most 60 characters',
            'any.required': 'Name is required'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string().pattern(passwordPattern).required()
        .messages({
            'string.pattern.base': 'Password must be 8-16 characters with at least one uppercase letter and one special character',
            'any.required': 'Password is required'
        }),
    address: Joi.string().max(400).allow('', null)
        .messages({
            'string.max': 'Address must be at most 400 characters'
        }),
    role: Joi.string().valid('ADMIN', 'USER', 'OWNER').required()
        .messages({
            'any.only': 'Role must be ADMIN, USER, or OWNER',
            'any.required': 'Role is required'
        })
});

const createStoreSchema = Joi.object({
    name: Joi.string().min(1).max(100).required()
        .messages({
            'string.max': 'Store name must be at most 100 characters',
            'any.required': 'Store name is required'
        }),
    email: Joi.string().email().allow('', null)
        .messages({
            'string.email': 'Please provide a valid email address'
        }),
    address: Joi.string().max(400).allow('', null)
        .messages({
            'string.max': 'Address must be at most 400 characters'
        }),
    owner_id: Joi.number().integer().required()
        .messages({
            'number.base': 'Owner ID must be a number',
            'any.required': 'Owner ID is required'
        })
});

const createRatingSchema = Joi.object({
    storeId: Joi.number().integer().required()
        .messages({
            'number.base': 'Store ID must be a number',
            'any.required': 'Store ID is required'
        }),
    rating: Joi.number().integer().min(1).max(5).required()
        .messages({
            'number.min': 'Rating must be between 1 and 5',
            'number.max': 'Rating must be between 1 and 5',
            'any.required': 'Rating is required'
        })
});

const updateRatingSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required()
        .messages({
            'number.min': 'Rating must be between 1 and 5',
            'number.max': 'Rating must be between 1 and 5',
            'any.required': 'Rating is required'
        })
});

const updatePasswordSchema = Joi.object({
    currentPassword: Joi.string().required()
        .messages({
            'any.required': 'Current password is required'
        }),
    newPassword: Joi.string().pattern(passwordPattern).required()
        .messages({
            'string.pattern.base': 'New password must be 8-16 characters with at least one uppercase letter and one special character',
            'any.required': 'New password is required'
        })
});

module.exports = {
    registerSchema,
    loginSchema,
    createUserSchema,
    createStoreSchema,
    createRatingSchema,
    updateRatingSchema,
    updatePasswordSchema
};
