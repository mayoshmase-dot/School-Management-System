import joi from 'joi';

export const registerSchema = joi.object({
    firstName: joi.string().min(2).max(30).required(),
    lastName: joi.string().min(2).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
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
    password: joi.string().min(6).required()
});