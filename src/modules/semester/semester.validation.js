import joi from 'joi';

export const semesterSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    startDate: joi.date().required(),
    endDate: joi.date().greater(joi.ref('startDate')).required(),
    status: joi.string().valid('planned', 'active', 'ended'),
    managerId: joi.number().integer().required()
});