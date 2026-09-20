import { Router } from "express";
import * as controller from "./semesterRegistration.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { registrationSchema } from "./semesterRegistration.validation.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post('/', auth, validate(registrationSchema), controller.registerForSemester);
router.get('/student/:id', controller.getStudentSemesters);
router.delete('/', auth, validate(registrationSchema), controller.unregisterFromSemester);

export default router;