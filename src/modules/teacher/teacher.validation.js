import joi from 'joi';

export const teacherSchema = joi.object({
    firstName: joi.string()
        .min(2)
        .max(30)
        .required(),

    lastName: joi.string()
        .min(2)
        .max(30)
        .required(),

    email: joi.string()
        .email()
        .required()
});