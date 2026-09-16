import { Router } from "express";
import * as controller from "./course.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { courseSchema, prerequisiteSchema } from "./course.validation.js";

const router = Router();

router.get('/:id/prerequisites', controller.getCourseWithPrerequisites);
router.post('/add-prerequisite', validate(prerequisiteSchema), controller.addPrerequisite);
router.delete('/remove-prerequisite', validate(prerequisiteSchema), controller.removePrerequisite);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(courseSchema), controller.createCourse);
router.put('/:id', validate(courseSchema), controller.updateCourse);
router.delete('/:id', controller.deleteCourse);

export default router;