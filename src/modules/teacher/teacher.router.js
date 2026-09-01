import { Router } from "express";
import * as controller from "./teacher.controller.js";
const router = Router()

router.get('/',controller.getAll)
router.get('/:id',controller.getById)
router.post('/',controller.createTeacher)
router.put('/:id',controller.updateTeacher)
router.delete('/:id',controller.deleteTeacher)

export default router