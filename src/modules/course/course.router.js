import { Router } from "express";
import * as controller from "./course.controller.js";
const router = Router()

router.get('/',controller.getAll)
router.get('/:id',controller.getById)
router.post('/',controller.createCourse)
router.put('/:id',controller.updateCourse)
router.delete('/:id',controller.deleteCourse)

export default router