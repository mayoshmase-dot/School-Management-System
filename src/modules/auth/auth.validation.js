import joi from 'joi';

export const registerSchema = joi.object({
    firstName: joi.string().min(2).max(30).pattern(/^[A-Za-z\s]+$/).required()
        .messages({ 'string.pattern.base': 'First name must contain only letters' }),
    lastName: joi.string().min(2).max(30).pattern(/^[A-Za-z\s]+$/).required()
        .messages({ 'string.pattern.base': 'Last name must contain only letters' }),
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
        .messages({ 'string.min': 'Password must be at least 8 characters long' })
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const sendCodeSchema = joi.object({
    email: joi.string().email().required()
});

export const resetPasswordSchema = joi.object({
    email: joi.string().email().required(),
    code: joi.string().required(),
    password: joi.string().min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
    .required()
    .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter and one special character (!@#$%^&*)'
    })
});