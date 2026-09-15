import { Router } from "express";
import * as controller from "./course.controller.js";
const router = Router();

router.get('/:id/prerequisites', controller.getCourseWithPrerequisites);
router.post('/add-prerequisite', controller.addPrerequisite);
router.delete('/remove-prerequisite', controller.removePrerequisite);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.createCourse);
router.put('/:id', controller.updateCourse);
router.delete('/:id', controller.deleteCourse);

export default router;