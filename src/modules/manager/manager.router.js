import { Router } from "express";
import * as controller from "./manager.controller.js";
const router = Router()

router.get('/',controller.getAll)
router.get('/',controller.getById)
router.post('/',controller.createManager)
router.put('/:id',controller.updateManager)
router.delete('/:id',controller.deleteManager)

export default router