import joi from 'joi';

export const registrationSchema = joi.object({
    studentId: joi.number().integer().required(),
    semesterId: joi.number().integer().required()
});