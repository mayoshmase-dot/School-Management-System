import joi from 'joi';

export const courseSchema = joi.object({
    name: joi.string().min(2).max(100).required(),
    description: joi.string().allow('', null),
    credits: joi.number().integer().min(1).required()
});