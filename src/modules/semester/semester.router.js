import { Router } from "express";
import * as controller from "./semester.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { semesterSchema } from "./semester.validation.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', auth("manager"), validate(semesterSchema), controller.createSemester);
router.put('/:id', auth("manager"), validate(semesterSchema), controller.updateSemester);
router.delete('/:id', auth("manager"), controller.deleteSemester);

export default router;