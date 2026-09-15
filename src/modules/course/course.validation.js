import joi from 'joi';

export const courseSchema = joi.object({
    name: joi.string().min(2).max(100).required(),
    description: joi.string().allow('', null),
    credits: joi.number().integer().min(1).required()
});

export const prerequisiteSchema = joi.object({
    courseId: joi.number().integer().required(),
    prerequisiteId: joi.number().integer().required()
});