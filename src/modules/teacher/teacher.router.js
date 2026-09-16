import { Router } from "express";
import * as controller from "./teacher.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { teacherSchema } from "./teacher.validation.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(teacherSchema), controller.createTeacher);
router.put('/:id', validate(teacherSchema), controller.updateTeacher);
router.delete('/:id', controller.deleteTeacher);

export default router;