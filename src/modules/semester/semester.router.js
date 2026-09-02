import { Router } from "express";
import * as controller from "./semester.controller.js";

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.createSemester);
router.put('/:id', controller.updateSemester);
router.delete('/:id', controller.deleteSemester);

export default router;