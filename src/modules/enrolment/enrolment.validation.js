import joi from 'joi';

export const enrolmentSchema = joi.object({
    studentId: joi.number().integer().required(),
    offeringId: joi.number().integer().required()
});

export const gradeSchema = joi.object({
    gradeValue: joi.number().min(0).max(100).required()
});