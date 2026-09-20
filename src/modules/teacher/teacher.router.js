import { Router } from "express";
import * as controller from "./teacher.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { teacherSchema  , teacherLoginSchema} from "./teacher.validation.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', auth("manager"),validate(teacherSchema), controller.createTeacher);
router.post('/login', validate(teacherLoginSchema), controller.loginTeacher);
router.put('/:id', auth("manager"), validate(teacherSchema), controller.updateTeacher);
router.delete('/:id', auth("manager"), controller.deleteTeacher);

export default router;