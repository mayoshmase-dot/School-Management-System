import { Router } from "express";
import * as controller from "./enrolment.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { enrolmentSchema, gradeSchema } from "./enrolment.validation.js";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post('/', auth, validate(enrolmentSchema), controller.enrollStudent);
router.put('/:id/grade', validate(gradeSchema), controller.giveGrade);
router.get('/student/:id', controller.getStudentEnrolments);

export default router;