import joi from 'joi';

export const studentSchema = joi.object({
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
        .required(),

        pssword:joi.string()
        .required()
});