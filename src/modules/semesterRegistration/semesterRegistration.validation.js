import joi from 'joi';

export const registrationSchema = joi.object({
    semesterId: joi.number().integer().required()
});