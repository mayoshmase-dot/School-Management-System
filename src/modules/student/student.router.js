import { Router } from "express";
import * as controller from "./student.controller.js";
const router = Router()

router.get('/',controller.getAll)
router.get('/:id',controller.getById)
router.post('/',controller.createStudent)
router.put('/:id',controller.updateStudent)
router.delete('/:id',controller.deleteStudent)

export default router