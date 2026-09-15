import { Router } from "express";
import * as controller from "./semesterRegistration.controller.js";

const router = Router();

router.post('/', controller.registerForSemester);
router.get('/student/:id', controller.getStudentSemesters);
router.delete('/', controller.unregisterFromSemester);

export default router;