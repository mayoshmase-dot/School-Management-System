import { Router } from "express";
import * as controller from "./student.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { studentSchema } from "./student.validation.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/', auth, validate(studentSchema), controller.updateStudent);
router.delete('/', auth, controller.deleteStudent);

export default router;