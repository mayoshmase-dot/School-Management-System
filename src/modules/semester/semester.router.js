import { Router } from "express";
import * as controller from "./semester.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { semesterSchema } from "./semester.validation.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(semesterSchema), controller.createSemester);
router.put('/:id', validate(semesterSchema), controller.updateSemester);
router.delete('/:id', controller.deleteSemester);

export default router;