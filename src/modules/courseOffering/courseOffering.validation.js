import joi from 'joi';

export const courseOfferingSchema = joi.object({
    year: joi.number().integer().min(2020).max(2100).required(),
    status: joi.string().valid('open', 'closed', 'cancelled'),
    maxCapacity: joi.number().integer().min(1).required(),
    courseId: joi.number().integer().required(),
    semesterId: joi.number().integer().required(),
    teacherId: joi.number().integer().required()
});