import { Router } from "express";
import * as controller from "./enrolment.controller.js";

const router = Router();

router.post('/', controller.enrollStudent);
router.put('/:id/grade', controller.giveGrade);
router.get('/student/:id', controller.getStudentEnrolments);

export default router;