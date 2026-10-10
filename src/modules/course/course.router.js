import { Router } from "express";
import * as controller from "./course.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { courseSchema, prerequisiteSchema } from "./course.validation.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.get('/:id/prerequisites', controller.getCourseWithPrerequisites);
router.post('/add-prerequisite', auth("manager"), validate(prerequisiteSchema), controller.addPrerequisite);
router.delete('/remove-prerequisite', auth("manager"), validate(prerequisiteSchema), controller.removePrerequisite);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', auth("manager"), validate(courseSchema), controller.createCourse);
router.put('/:id', auth("manager"), validate(courseSchema), controller.updateCourse);
router.delete('/:id', auth("manager"), controller.deleteCourse);

export default router;